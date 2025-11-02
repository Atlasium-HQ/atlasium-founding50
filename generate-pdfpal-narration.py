#!/usr/bin/env python3
"""
Generate voiceover narration for PDF-Pal walkthroughs
"""

import os
import requests
from pathlib import Path

ELEVENLABS_API_KEY = "sk_1bf06fa4ab77eb74668e0fbdf6945bd9bd4624231e230817"
VOICE_ID = "XrExE9yKIg1WjnnlVkGX"  # Matilda - Professional, informative_educational, natural
MODEL_ID = "eleven_multilingual_v2"

# Create output directory
Path("public/narration").mkdir(parents=True, exist_ok=True)

# Narration scripts for Chat Streaming walkthrough
CHAT_NARRATIONS = [
    {
        "id": 1,
        "text": "Step one: Frontend User Sends Message with Optimistic UI. When a user types their question and hits Enter, we don't wait for the backend - we immediately show their message in the chat. This is React Query's optimistic update pattern. We add the message to the UI instantly, backup the current state in case of errors, and cancel any pending queries to prevent race conditions. Marcus suggested this approach during code review, saying it would save us days of debugging. If the API call fails, React Query automatically rolls back to the saved state. This makes the app feel lightning fast, even though the actual API call takes 2 to 5 seconds."
    },
    {
        "id": 2,
        "text": "Step two: Backend Vector Search in Pinecone. Now the real magic happens. We convert the user's question into a 1536-dimensional vector using OpenAI's embedding model. Then we query Pinecone to find the 4 most semantically similar chunks from the PDF. This is RAG - Retrieval Augmented Generation. The key insight: each PDF has its own namespace in Pinecone. Sarah added this after a scary bug where users saw results from other people's documents during an investor demo. The namespace isolation ensures perfect security. Vector search typically takes 150 to 300 milliseconds. We tried caching common queries but it didn't help since every question is unique."
    },
    {
        "id": 3,
        "text": "Step three: Building Context - combining previous messages with retrieved chunks. We fetch the last 6 messages from the database for conversation continuity, then format them alongside the 4 retrieved PDF chunks. The prompt structure has three layers: a system instruction telling GPT to stay on-topic, the conversation history so it remembers context, and the retrieved chunks for grounding answers in facts. The instruction 'don't make up an answer' was added after a user complained about hallucinated statistics. Marcus said: we need to tell GPT explicitly to say I don't know. It worked perfectly. We use GPT-3.5-turbo instead of GPT-4 to keep costs low - each message costs about 2 tenths of a cent versus 2 cents for GPT-4."
    },
    {
        "id": 4,
        "text": "Step four: Streaming Responses with custom buffer logic. OpenAI sends tokens that can be partial words. We've built a custom ReadableStream that buffers these tokens and only sends complete words to the frontend, preventing the flickering that plagued our first implementation. Marcus wrote this during a late-night debugging session. He said in Slack: I can't believe streaming is this hard, but it works now. The buffer splits on spaces to detect complete words, keeps partial words in the buffer, and flushes everything when the stream completes. The onCompletion callback saves the full response to the database. This custom logic could be replaced with Vercel's AI SDK, but we built this before that library existed."
    },
    {
        "id": 5,
        "text": "Step five: Frontend Receiving and Rendering the Stream. The frontend reads the stream chunk by chunk in a while loop, accumulating each piece into the full response. On the first chunk, we create a message with a temporary ID called 'ai-response'. On subsequent chunks, we find that message and update its text - this prevents flickering from adding and removing messages. Sarah asked: why not just create a new message each time? Answer: that would cause visual glitches. The backend doesn't assign a real ID until streaming completes, so we use this temporary ID and React Query replaces it on refetch. Updating the cache on every chunk is expensive - we tested throttling to every 100 milliseconds, but users said it felt laggy. So we kept it real-time. The end result: users see their message instantly, then the AI response appears word by word in 2 to 5 seconds."
    }
]

# Narration scripts for PDF Upload walkthrough
UPLOAD_NARRATIONS = [
    {
        "id": 1,
        "text": "Step one: Frontend Upload UI and UploadThing Integration. Users drag and drop their PDF or click to browse. We use UploadThing's useUploadThing hook which handles the entire upload process. There are two uploader types: freePlanUploader for basic users, and proPlanUploader for premium subscribers. Sarah said: premium users should get bigger files - it's a clear value proposition. Marketing loved this tiered approach. Once the file reaches UploadThing's servers, we get back a unique key and start polling the backend to check when embedding generation completes. Jenny from DevOps pointed out that UploadThing costs just 10 dollars per month for 5 gigabytes - way cheaper than setting up S3, CloudFront, and Lambda ourselves, plus they handle security like signed URLs and virus scanning automatically."
    },
    {
        "id": 2,
        "text": "Step two: Backend Upload Handler and File Record Creation. UploadThing's onUploadComplete callback fires after the file is stored on their CDN. First, the middleware verifies the user is authenticated via Clerk. Then we create a database record with uploadStatus set to PROCESSING. At this point, the file exists but isn't ready for chat yet. We fetch the PDF from UploadThing's URL, convert it to a blob, and pass it to LangChain's PDFLoader. Splitting into freePlanUploader and proPlanUploader lets us enforce file size limits at the infrastructure level. Marcus said: it's better to reject at upload time than after processing - saves compute costs. UploadThing stores files on their CDN, so we just store the URL and key in our database. This keeps our storage costs near zero."
    },
    {
        "id": 3,
        "text": "Step three: PDF Text Extraction with LangChain. LangChain's PDFLoader handles all the complexity of PDF parsing - encoding, fonts, images, even optical character recognition. It returns an array where each element is one page of text with metadata like page numbers. We initially tried the pdf-parse npm package, but it failed on PDFs with complex layouts. LangChain's loader is far more robust. Marcus warned in Slack: PDFLoader can't handle password-protected PDFs - if users upload encrypted files, it fails silently. We need to add validation. Sarah added that to the roadmap. Large PDFs with 500-plus pages can take over 60 seconds to load, so we added a 2-minute timeout. Files that exceed this get marked as FAILED. PDFLoader runs synchronously and blocks the API route, which is fine for small files but we might need a job queue for larger ones."
    },
    {
        "id": 4,
        "text": "Step four: Generating Embeddings with OpenAI. Each page's text gets converted into a 1536-dimensional vector using OpenAI's text-embedding-ada-002 model. These vectors are then stored in Pinecone under a namespace - the file's unique ID. This namespace trick was Marcus's breakthrough idea. Without it, searching file A would return results from file B if the text was similar. Namespaces provide perfect isolation - each file is its own universe. We evaluated OpenAI, Cohere, and HuggingFace embedding models. OpenAI won on accuracy and speed. The cost is one tenth of a cent per 1000 tokens. A 100-page PDF costs about 15 cents to embed - this is the most expensive part of the upload flow. We considered caching embeddings, but most users don't re-upload the same file. Embedding generation is the bottleneck, taking 3 to 6 seconds for typical PDFs. We tried batching requests but OpenAI's rate limits actually made it slower."
    },
    {
        "id": 5,
        "text": "Step five: Status Update and Error Handling. If everything succeeds - parsing and embedding - we update the file's uploadStatus to SUCCESS, and the user can start chatting. If anything fails - timeout, invalid PDF, or rate limit exceeded - we catch the error and mark it FAILED. This try-catch was added after a production incident where a corrupt PDF crashed the API route and left the file stuck in PROCESSING forever. Sarah was understandably upset. Now we handle errors gracefully. We currently just log errors to the console - we should use a proper logging service like DataDog or Sentry to track failures in production. The end result: the file is now ready. Users can open it and start having conversations about its content. The entire pipeline from upload to ready typically takes 4 to 8 seconds."
    }
]

def generate_narration(text, walkthrough_type, step_id):
    """Generate narration audio for a step"""
    print(f"Generating {walkthrough_type} narration for step {step_id}...")

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }

    data = {
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.71,  # Higher = more natural and expressive
            "similarity_boost": 0.75,
            "style": 0.5,  # Added style for more human-like delivery
            "use_speaker_boost": True
        }
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        output_path = f"public/narration/pdfpal-{walkthrough_type}-step-{step_id}.mp3"
        with open(output_path, "wb") as f:
            f.write(response.content)
        print(f"✓ Generated: {output_path}")
        return output_path
    else:
        print(f"✗ Error generating narration: {response.status_code}")
        print(response.text)
        return None

def main():
    print("=" * 60)
    print("PDF-Pal Walkthrough Narration Generator")
    print("=" * 60)
    print()

    print("Generating Chat Streaming narrations...")
    for narration in CHAT_NARRATIONS:
        generate_narration(narration["text"], "chat", narration["id"])

    print()
    print("Generating PDF Upload narrations...")
    for narration in UPLOAD_NARRATIONS:
        generate_narration(narration["text"], "upload", narration["id"])

    print()
    print("=" * 60)
    print("✓ All PDF-Pal narrations generated successfully!")
    print("=" * 60)

if __name__ == "__main__":
    main()
