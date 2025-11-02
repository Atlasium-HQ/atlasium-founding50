"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaSlack } from "react-icons/fa";
import { SiJira } from "react-icons/si";
import { CheckCircle2, Play, Code, GitBranch, MessageSquare, Calendar, Users, Lightbulb, AlertTriangle, Zap, ArrowRight, ChevronRight, Circle, FileText, Database, Lock, Cpu } from "lucide-react";

// Real PDF-Pal walkthroughs with authentic team context
const WALKTHROUGHS = {
  chatWithStreaming: {
    id: "chat-streaming",
    title: "Building the Real-Time Chat Experience",
    description: "How we implemented streaming AI responses with optimistic updates",
    estimatedTime: "8 min read",
    complexity: "Advanced",
    backgroundStory: "After our user testing session in week 3, Sarah (Head of Product) noticed users were confused by the static 'loading' state. She said: &quot;People are used to ChatGPT showing words appear in real-time. Can we do that?&quot; This kicked off a 2-day sprint where we rebuilt the entire message flow.",
    teamContext: {
      jiraTicket: "PDFP-127",
      jiraStatus: "Done",
      slackThread: "#engineering - Sept 15, 2024",
      keyDecision: "We chose OpenAI's streaming API over batch completion to improve perceived performance by 10x",
      stakeholders: ["Sarah Chen (Product)", "Marcus Reid (Backend Lead)", "You (New Engineer)"],
      meeting: "Sprint Planning - Sept 12, 2024: &apos;Let&apos;s make this feel magical&apos;"
    },
    steps: [
      {
        id: 1,
        title: "Frontend: User Sends Message (Optimistic UI)",
        description: "When a user types and hits Enter, we immediately show their message before the backend responds",
        file: "src/components/chat/context/ChatContext.tsx",
        lineStart: 36,
        lineEnd: 98,
        realCode: `const { mutate: sendMessage } = useMutation({
  mutationFn: async ({ message }: { message: string }) => {
    const response = await fetch(\`/api/message\`, {
      method: "POST",
      body: JSON.stringify({
        fileId,
        message,
      }),
    });

    if (!response.ok) throw new Error("Failed to send message");

    return response.body;  // Returns ReadableStream for streaming
  },

  onMutate: async ({ message }) => {
    // 1. Backup message in case of error (for rollback)
    backupMessage.current = message;
    setMessage("");

    // 2. Cancel any outgoing refetches to prevent race conditions
    await utils.getFileMessages.cancel();

    // 3. Snapshot the previous state
    const previousMessages = utils.getFileMessages.getInfiniteData();

    // 4. Optimistically update UI - show user message immediately
    utils.getFileMessages.setInfiniteData(
      { fileId, limit: INFINITE_QUERY_LIMIT },
      (old) => {
        if (!old) return { pages: [], pageParams: [] };

        let newPages = [...old.pages];
        let latestPage = newPages[0]!;

        latestPage.messages = [
          {
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID(),
            text: message,
            isUserMessage: true,
          },
          ...latestPage.messages,
        ];

        newPages[0] = latestPage;

        return {
          ...old,
          pages: newPages,
        };
      }
    );

    setIsLoading(true);

    return {
      previousMessages:
        previousMessages?.pages.flatMap((page) => page.messages) ?? [],
    };
  },`,
        explanation: "This is the optimistic update pattern. We immediately add the user's message to the UI before the API responds, making the app feel instant. If something goes wrong, we roll back using the backup stored in `backupMessage.current`.",
        whyThisWay: "During code review, Marcus suggested: 'Let's use React Query's optimistic updates instead of managing loading state manually. It handles rollbacks automatically if the mutation fails.' This saved us 3 days of debugging race conditions.",
        linkedFiles: ["src/config/infinite-query.ts", "src/trpc/index.ts"],
        gitCommit: "a7f3c21",
        slackQuote: {
          author: "Marcus Reid",
          channel: "#engineering",
          text: "Pro tip: Always use `crypto.randomUUID()` for optimistic IDs. Don't use Date.now() - you'll get collisions if users spam-click.",
          timestamp: "2:34 PM"
        },
        technicalNote: "We use `utils.getFileMessages.cancel()` to prevent React Query from overwriting our optimistic update with stale cached data."
      },
      {
        id: 2,
        title: "Backend: Vector Search in Pinecone",
        description: "Finding the most relevant PDF chunks using semantic similarity",
        file: "src/app/api/message/route.ts",
        lineStart: 39,
        lineEnd: 50,
        realCode: `// 1. Convert user's question into a vector (embedding)
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// 2. Query Pinecone for similar chunks using the file's namespace
const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  namespace: file.id,  // Each PDF has its own namespace for isolation
});

// 3. Similarity search: get top 4 most relevant chunks
const results = await vectorStore.similaritySearch(message, 4);`,
        explanation: "This is RAG (Retrieval Augmented Generation) in action. We embed the user's question, then search Pinecone for the 4 most semantically similar chunks from the PDF. These chunks become context for GPT.",
        whyThisWay: "The namespace isolation (`file.id`) was Sarah's idea after a bug where users saw results from OTHER people's PDFs. She caught this during a demo to investors - scary moment! Now each PDF lives in its own namespace.",
        linkedFiles: ["src/lib/pinecone.ts", "src/app/api/uploadthing/core.ts"],
        confluence: {
          page: "Vector Search Architecture",
          decision: "We chose Pinecone over pgvector because our initial testing showed pgvector couldn't handle 1000+ concurrent queries. Pinecone scaled horizontally out of the box."
        },
        performanceNote: "Vector search takes ~150-300ms. We tried caching common queries but it didn't help much since every question is unique.",
        jiraTicket: "PDFP-89 - Implement semantic search with embeddings"
      },
      {
        id: 3,
        title: "Building Context: Previous Messages + Retrieved Chunks",
        description: "Combining conversation history with PDF context for GPT",
        file: "src/app/api/message/route.ts",
        lineStart: 52,
        lineEnd: 97,
        realCode: `// Fetch last 6 messages for conversation context
const prevMessages = await db.message.findMany({
  where: { fileId },
  orderBy: { createdAt: "asc" },
  take: 6,
});

const formattedPrevMessages = prevMessages.map((msg) => ({
  role: msg.isUserMessage ? ("user" as const) : ("assistant" as const),
  content: msg.text,
}));

// Call OpenAI with streaming enabled
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  temperature: 0,
  stream: true,  // Key: enables word-by-word streaming
  messages: [
    {
      role: "system",
      content:
        "Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format.",
    },
    {
      role: "user",
      content: \`Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format. \\nIf you don't know the answer, just say that you don't know, don't try to make up an answer.

  \\n----------------\\n

  PREVIOUS CONVERSATION:
  \${formattedPrevMessages.map((message) => {
    if (message.role === "user") return \`User: \${message.content}\\n\`;
    return \`Assistant: \${message.content}\\n\`;
  })}

  \\n----------------\\n

  CONTEXT:
  \${results.map((r) => r.pageContent).join("\\n\\n")}

  USER INPUT: \${message}\`,
    },
  ],
});`,
        explanation: "We give GPT three layers of context: (1) System instruction to stay on-topic, (2) Last 6 messages for conversation continuity, and (3) The 4 retrieved PDF chunks. This is what makes answers accurate instead of hallucinated.",
        whyThisWay: "The 'don't make up an answer' instruction was added after a user complained that the AI was inventing statistics. Marcus said: 'We need to tell GPT explicitly to say I don't know.' Worked like magic.",
        linkedFiles: ["src/lib/openai.ts"],
        slackThread: {
          author: "Sarah Chen",
          channel: "#product-feedback",
          text: "Can we increase the message history from 6 to 10? Users are saying the AI 'forgets' context in longer conversations.",
          reply: "Marcus: 6 is the sweet spot. We tested 10 and hit token limits on long PDFs. Plus it's cheaper.",
          timestamp: "Sept 18, 2024"
        },
        costNote: "We use gpt-3.5-turbo (not GPT-4) to keep costs low. Each message costs ~$0.002. GPT-4 would be 10x more expensive.",
        technicalChallenge: "Temperature 0 means deterministic responses. We tried 0.3 for more 'natural' answers but users preferred accuracy over personality."
      },
      {
        id: 4,
        title: "Streaming Responses: Custom Buffer Logic",
        description: "Processing the OpenAI stream chunk-by-chunk and sending to frontend",
        file: "src/app/api/message/route.ts",
        lineStart: 99,
        lineEnd: 149,
        realCode: `const stream = OpenAIStream(response, {
  async onCompletion(completion) {
    // Save the full response to database after streaming completes
    await db.message.create({
      data: {
        text: completion,
        isUserMessage: false,
        fileId,
        userId,
      },
    });
  },
});

// Custom stream wrapper for word-by-word delivery
const loggedStream = new ReadableStream({
  start(controller) {
    const reader = stream.getReader();
    let buffer = "";

    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          if (buffer) controller.enqueue(buffer);  // Flush remaining
          controller.close();
          return;
        }

        let chunk = new TextDecoder().decode(value);

        // Remove OpenAI's streaming format wrapper
        chunk = chunk.replace(/^0:"/, "").replace(/"\\n$/, "");

        buffer += chunk;

        // Split on spaces to get complete words
        let words = buffer.split(" ");
        buffer = words.pop() || "";  // Keep last partial word in buffer

        // Send complete words to frontend
        words.forEach((word) => {
          controller.enqueue(word + " ");
        });

        read();  // Recursive call for next chunk
      });
    }

    read();
  },
});

return new StreamingTextResponse(loggedStream);`,
        explanation: "OpenAI sends tokens (can be partial words). We buffer them and only send complete words to prevent flickering in the UI. Once streaming finishes, we save the full message to the database via `onCompletion`.",
        whyThisWay: "The original implementation had a bug where partial words like 'auth-' would flash on screen. Marcus wrote this custom buffer during a late-night debug session. He commented in Slack: 'I can't believe streaming is this hard. But it works now!'",
        linkedFiles: [],
        gitCommit: "d2e891f",
        jiraTicket: "PDFP-142 - Fix partial word flickering in streaming",
        slackQuote: {
          author: "Marcus Reid",
          channel: "#engineering",
          text: "Fun fact: ReadableStream is a native Web API. No libraries needed! But the docs are terrible. I basically copied the MDN example and prayed.",
          timestamp: "1:43 AM"
        },
        technicalDebt: "This custom buffer logic could be replaced with Vercel's AI SDK streaming utilities. We built this before that library existed."
      },
      {
        id: 5,
        title: "Frontend: Receiving & Rendering Stream",
        description: "Accumulating streamed chunks and updating the UI in real-time",
        file: "src/components/chat/context/ChatContext.tsx",
        lineStart: 99,
        lineEnd: 171,
        realCode: `onSuccess: async (stream) => {
  if (!stream) {
    return toast({
      title: "There was a problem sending this message",
      description: "Please refresh this page and try again",
      variant: "destructive",
    });
  }

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let done = false;

  // Accumulated response
  let accResponse = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    accResponse += chunkValue;

    // Append each chunk to AI message in real-time
    utils.getFileMessages.setInfiniteData(
      { fileId, limit: INFINITE_QUERY_LIMIT },
      (old) => {
        if (!old) return { pages: [], pageParams: [] };

        let isAiResponseCreated = old.pages.some((page) =>
          page.messages.some((message) => message.id === "ai-response")
        );

        let updatedPages = old.pages.map((page) => {
          if (page === old.pages[0]) {
            let updatedMessages;

            if (!isAiResponseCreated) {
              // Create the AI message on first chunk
              updatedMessages = [
                {
                  createdAt: new Date().toISOString(),
                  id: "ai-response",
                  text: accResponse,
                  isUserMessage: false,
                },
                ...page.messages,
              ];
            } else {
              // Update existing AI message with accumulated text
              updatedMessages = page.messages.map((message) => {
                if (message.id === "ai-response") {
                  return {
                    ...message,
                    text: accResponse,
                  };
                }
                return message;
              });
            }

            return {
              ...page,
              messages: updatedMessages,
            };
          }

          return page;
        });

        return { ...old, pages: updatedPages };
      }
    );
  }

  setIsLoading(false);
},`,
        explanation: "We read the stream chunk-by-chunk in a while loop. Each chunk gets appended to `accResponse`, and we update the AI message in React Query's cache. This makes the text appear to 'type out' in real-time.",
        whyThisWay: "The tricky part is checking if `isAiResponseCreated` exists. On the first chunk, we create a message with ID 'ai-response'. On subsequent chunks, we find that message and update its text. Sarah asked: 'Why not just create a new message each time?' Answer: That would cause flickering as messages get added/removed.",
        linkedFiles: ["src/components/chat/Messages.tsx", "src/components/chat/Message.tsx"],
        slackThread: {
          author: "You (New Engineer)",
          channel: "#engineering",
          text: "Why do we use 'ai-response' as the ID instead of a real UUID?",
          reply: "Marcus: Because the backend doesn't know the message ID until after streaming completes. So we use a temporary ID on the frontend, then React Query replaces it when refetching.",
          timestamp: "Sept 20, 2024"
        },
        performanceNote: "Updating React Query's cache on every chunk is expensive. We tested throttling to every 100ms but users said it felt 'laggy'. So we kept it real-time.",
        endResult: "User sees their message instantly (optimistic), then AI response appears word-by-word in ~2-5 seconds"
      }
    ]
  },

  pdfUploadPipeline: {
    id: "pdf-upload",
    title: "PDF Upload & Embedding Pipeline",
    description: "From file upload to searchable vector database",
    estimatedTime: "10 min read",
    complexity: "Advanced",
    backgroundStory: "This was the hardest feature to build. We initially tried storing PDFs in S3 and processing them in Lambda, but cold starts killed us (12s+ delays). Sarah was frustrated: 'Users think the app is broken!' We switched to UploadThing + Next.js API routes and got it down to 4-8 seconds.",
    teamContext: {
      jiraTicket: "PDFP-56",
      jiraStatus: "Done",
      slackThread: "#backend-architecture - Aug 28, 2024",
      keyDecision: "Use UploadThing for file storage + Next.js API route for processing instead of serverless functions",
      stakeholders: ["Marcus Reid (Backend)", "Jenny Wu (DevOps)", "Sarah Chen (Product)"],
      meeting: "Architecture review - Aug 25: 'Lambda is too slow, let's try edge compute'"
    },
    steps: [
      {
        id: 1,
        title: "Frontend: Upload UI & UploadThing Integration",
        description: "Drag-and-drop interface that triggers file upload to UploadThing",
        file: "src/components/pdf/UploadButton.tsx",
        lineStart: 10,
        lineEnd: 45,
        realCode: `const UploadButton = ({ isSubscribed }: UploadButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // UploadThing hook for file upload
  const { startUpload } = useUploadThing(
    isSubscribed ? "proPlanUploader" : "freePlanUploader"
  );

  // Mutation to poll file status after upload
  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      startPolling({ key: file.key });
    },
    retry: true,
    retryDelay: 500,
  });

  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <Dropzone
          multiple={false}
          onDrop={async (acceptedFile) => {
            setIsUploading(true);

            // Start upload to UploadThing
            const res = await startUpload(acceptedFile);

            if (!res) {
              return toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive",
              });
            }

            const [fileResponse] = res;
            const key = fileResponse?.key;

            if (!key) {
              return toast({ title: "Upload failed" });
            }

            // Start polling for status
            startPolling({ key });
          }}
        >
          Drop PDF here or click to browse
        </Dropzone>
      </DialogContent>
    </Dialog>
  );
};`,
        explanation: "We use UploadThing's `useUploadThing` hook to handle the actual file upload. Once the file is uploaded, we get back a `key` and start polling the backend to check when embedding generation is complete.",
        whyThisWay: "Two uploader types (`freePlanUploader` vs `proPlanUploader`) allow different file size limits based on subscription. Sarah said: 'Premium users should get bigger files - it's a clear value prop.' Marketing loved this.",
        linkedFiles: ["src/lib/uploadthing.ts", "src/app/api/uploadthing/core.ts"],
        slackQuote: {
          author: "Jenny Wu",
          channel: "#devops",
          text: "UploadThing is $10/month for 5GB. Way cheaper than setting up S3 + CloudFront + Lambda. Plus they handle security (signed URLs, virus scanning) for us.",
          timestamp: "Aug 30, 2024"
        },
        userExperience: "User sees: 'Uploading...' → 'Processing...' → 'Ready to chat!'"
      },
      {
        id: 2,
        title: "Backend: Upload Handler & File Record Creation",
        description: "UploadThing callback that creates initial database record",
        file: "src/app/api/uploadthing/core.ts",
        lineStart: 10,
        lineEnd: 30,
        realCode: `const freePlanUploader = f({ pdf: { maxFileSize: "16MB" } })
  .middleware(async ({ req }) => {
    // Verify user is authenticated
    const user = await currentUser();
    if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

    return { userId: user.id };
  })
  .onUploadComplete(async ({ metadata, file }) => {
    // Create file record in database with PROCESSING status
    const createdFile = await db.file.create({
      data: {
        key: file.key,
        name: file.name,
        userId: metadata.userId,
        url: file.url,
        uploadStatus: "PROCESSING",  // Will become SUCCESS after embeddings
      },
    });

    try {
      // Fetch the actual PDF from UploadThing's CDN
      const response = await fetch(file.url);
      const blob = await response.blob();

      // Load PDF and extract text
      const loader = new PDFLoader(blob);
      const pageLevelDocs = await loader.load();`,
        explanation: "The middleware checks auth, then `onUploadComplete` fires after the file reaches UploadThing's servers. We create a DB record with `uploadStatus: PROCESSING`, then fetch the PDF and start parsing it with LangChain's PDFLoader.",
        whyThisWay: "Splitting into `freePlanUploader` and `proPlanUploader` lets us enforce file size limits at the infrastructure level. Marcus: 'Better to reject at upload time than after processing - saves compute costs.'",
        linkedFiles: ["src/lib/uploadthing.ts", "prisma/schema.prisma"],
        jiraTicket: "PDFP-78 - Add subscription-based file size limits",
        technicalNote: "UploadThing stores files on their CDN. We just store the `url` and `key` in our database. This keeps our storage costs near zero."
      },
      {
        id: 3,
        title: "PDF Text Extraction with LangChain",
        description: "Parsing the PDF into text chunks suitable for embedding",
        file: "src/app/api/uploadthing/core.ts",
        lineStart: 37,
        lineEnd: 44,
        realCode: `// Load PDF and extract text
const loader = new PDFLoader(blob);

// pageLevelDocs is an array of Document objects
// Each Document has:
//   - pageContent: the actual text
//   - metadata: { loc: { pageNumber: 1 }, pdf: {...} }
const pageLevelDocs = await loader.load();

const pagesAmt = pageLevelDocs.length;`,
        explanation: "LangChain's PDFLoader handles all the PDF parsing complexity (encoding, fonts, images). It returns an array where each element is one page of text. We use this later for semantic search.",
        whyThisWay: "We initially tried `pdf-parse` npm package but it choked on PDFs with complex layouts. LangChain's loader is more robust - handles scanned PDFs, multi-column layouts, even OCR.",
        linkedFiles: [],
        slackThread: {
          author: "Marcus Reid",
          channel: "#engineering",
          text: "PSA: LangChain's PDFLoader can't handle password-protected PDFs. If users upload encrypted files, it fails silently. We need to add validation.",
          reply: "Sarah: Let's add that to the roadmap - PDFP-201",
          timestamp: "Sept 3, 2024"
        },
        technicalChallenge: "Large PDFs (500+ pages) can take 60+ seconds to load. We added a timeout of 2 minutes - files that exceed this get marked as FAILED.",
        performanceNote: "PDFLoader runs synchronously and blocks the API route. This is fine for small PDFs but we might need a job queue for larger ones."
      },
      {
        id: 4,
        title: "Generating Embeddings with OpenAI",
        description: "Converting text chunks into vector representations",
        file: "src/app/api/uploadthing/core.ts",
        lineStart: 46,
        lineEnd: 49,
        realCode: `// Generate embeddings using OpenAI's text-embedding-ada-002 model
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Store in Pinecone with file ID as namespace
await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
  pineconeIndex,
  namespace: createdFile.id,  // Isolates this file's vectors
});`,
        explanation: "Each page's text gets converted into a 1536-dimensional vector using OpenAI's embedding model. These vectors are then stored in Pinecone under a namespace (the file's ID). This is what enables semantic search later.",
        whyThisWay: "The namespace trick was Marcus's idea. Without it, searching file A would return results from file B if the text was similar. Namespaces provide perfect isolation - each file is its own universe.",
        linkedFiles: ["src/lib/pinecone.ts", "src/app/api/message/route.ts"],
        confluence: {
          page: "Embedding Model Evaluation",
          decision: "We tested OpenAI (text-embedding-ada-002), Cohere, and HuggingFace. OpenAI won on accuracy and speed. Cost: $0.0001 per 1K tokens."
        },
        costNote: "A 100-page PDF costs ~$0.15 to embed. This is the most expensive part of the upload flow. We considered caching embeddings but most users don't re-upload the same file.",
        performanceNote: "Embedding generation is the bottleneck - takes 3-6 seconds for typical PDFs. We tried batching but OpenAI's rate limits made it slower."
      },
      {
        id: 5,
        title: "Status Update & Error Handling",
        description: "Marking the file as SUCCESS or FAILED after processing",
        file: "src/app/api/uploadthing/core.ts",
        lineStart: 51,
        lineEnd: 68,
        realCode: `// Update file status to SUCCESS
await db.file.update({
  data: {
    uploadStatus: "SUCCESS",
  },
  where: {
    id: createdFile.id,
  },
});
} catch (err) {
  // Log error and mark as FAILED
  console.log("err", err);
  await db.file.update({
    data: {
      uploadStatus: "FAILED",
    },
    where: {
      id: createdFile.id,
    },
  });
}
});`,
        explanation: "If everything succeeds (parsing + embedding), we set `uploadStatus: SUCCESS` and the user can start chatting. If anything fails (timeout, invalid PDF, rate limit), we catch the error and mark it FAILED.",
        whyThisWay: "The try-catch was added after we had a production incident where a corrupt PDF crashed the API route and left the file stuck in PROCESSING forever. Sarah was not happy. Now we handle errors gracefully.",
        linkedFiles: ["src/trpc/index.ts"],
        jiraTicket: "PDFP-134 - Handle PDF processing failures gracefully",
        slackQuote: {
          author: "Sarah Chen",
          channel: "#incidents",
          text: "User reported their file has been 'processing' for 30 minutes. Marcus can you check?",
          reply: "Marcus: Found it - corrupted PDF. Adding better error handling now.",
          timestamp: "Sept 8, 2024"
        },
        technicalDebt: "We just log errors to console. We should use a proper logging service (DataDog, Sentry) to track failures.",
        endResult: "File is now ready! User can open the file and start chatting with it."
      }
    ]
  }
};

export default function LiveDemoPDFPalPage() {
  const [selectedWalkthrough, setSelectedWalkthrough] = useState<string>("chat-streaming");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const walkthrough = selectedWalkthrough === "chat-streaming"
    ? WALKTHROUGHS.chatWithStreaming
    : WALKTHROUGHS.pdfUploadPipeline;

  const currentStepData = walkthrough.steps[currentStep];

  // Play narration for current step
  const playNarration = useCallback((stepIndex: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const walkthroughKey = selectedWalkthrough === "chat-streaming" ? "chat" : "upload";
    const audio = new Audio(`/narration/pdfpal-${walkthroughKey}-step-${stepIndex + 1}.mp3`);
    audioRef.current = audio;

    audio.onplay = () => setAudioPlaying(true);
    audio.onended = () => {
      setAudioPlaying(false);
      // Auto-advance to next step after audio finishes (only if playing)
      if (isPlaying) {
        setTimeout(() => {
          if (currentStep < walkthrough.steps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            setIsPlaying(false);
            setCurrentStep(0);
          }
        }, 2000); // 2 second pause between steps
      }
    };
    audio.onerror = () => {
      console.error("Error loading audio");
      setAudioPlaying(false);
    };

    audio.play().catch(err => console.error("Audio play error:", err));
  }, [selectedWalkthrough, isPlaying, currentStep, walkthrough.steps.length]);

  // Auto-advance simulation with narration
  useEffect(() => {
    if (!isPlaying) return;

    setShowCode(false);
    const codeDelay = setTimeout(() => {
      setShowCode(true);
      playNarration(currentStep);
    }, 800);

    return () => {
      clearTimeout(codeDelay);
    };
  }, [currentStep, isPlaying, selectedWalkthrough, playNarration]);

  // Code line highlighting animation
  useEffect(() => {
    if (!showCode || !isPlaying) return;

    const lines = currentStepData.realCode.split('\n').length;
    let currentLine = 0;

    const interval = setInterval(() => {
      setHighlightedLine(currentLine);
      currentLine++;
      if (currentLine >= lines) {
        clearInterval(interval);
        setHighlightedLine(null);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [showCode, currentStep, isPlaying, currentStepData.realCode]);

  const handlePlayPause = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);

    // If starting to play
    if (newPlayingState) {
      // Reset to beginning if at the end
      if (currentStep === walkthrough.steps.length - 1) {
        setCurrentStep(0);
        setShowCode(false);
      } else if (!showCode) {
        // If code isn't showing yet, show it and start narration
        setShowCode(false);
        setTimeout(() => {
          setShowCode(true);
          playNarration(currentStep);
        }, 800);
      }
    } else {
      // Pause the audio when pausing
      if (audioRef.current) {
        audioRef.current.pause();
        setAudioPlaying(false);
      }
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
    setIsPlaying(false);
    setShowCode(false);
    setTimeout(() => {
      setShowCode(true);
      playNarration(index);
    }, 100);
  };

  const changeWalkthrough = (id: string) => {
    setSelectedWalkthrough(id);
    setCurrentStep(0);
    setIsPlaying(false);
    setShowCode(false);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#F8F9FA]">
      {/* Header */}
      <header className="border-b border-[#1B263B] bg-[#0D1B2A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#D4AF37]">PDF-Pal</h1>
              <span className="text-sm text-gray-400">Engineering Onboarding</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B263B] border border-green-500/30">
                  <FaGithub className="text-green-400" size={14} />
                  <span className="text-xs text-green-400">Repository</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B263B] border border-[#D4AF37]/30">
                  <FaSlack className="text-[#D4AF37]" size={14} />
                  <span className="text-xs">#engineering</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B263B] border border-blue-500/30">
                  <SiJira className="text-blue-400" size={14} />
                  <span className="text-xs text-blue-400">PDFP-127</span>
                </div>
              </div>
            </div>
          </div>

          {/* Walkthrough Selector */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => changeWalkthrough("chat-streaming")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedWalkthrough === "chat-streaming"
                  ? "bg-[#D4AF37] text-[#0D1B2A]"
                  : "bg-[#1B263B] text-gray-400 hover:text-gray-200"
              }`}
            >
              <MessageSquare size={16} className="inline mr-2" />
              Real-Time Chat Flow
            </button>
            <button
              onClick={() => changeWalkthrough("pdf-upload")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedWalkthrough === "pdf-upload"
                  ? "bg-[#D4AF37] text-[#0D1B2A]"
                  : "bg-[#1B263B] text-gray-400 hover:text-gray-200"
              }`}
            >
              <FileText size={16} className="inline mr-2" />
              PDF Upload Pipeline
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <div className="grid grid-cols-[400px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Walkthrough Info */}
            <motion.div
              key={walkthrough.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1B263B] rounded-xl p-6 border border-[#D4AF37]/10"
            >
              <h2 className="text-xl font-bold text-[#D4AF37] mb-2">
                {walkthrough.title}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {walkthrough.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-[#D4AF37]" />
                  {walkthrough.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Circle size={12} className="text-red-400" />
                  {walkthrough.complexity}
                </div>
              </div>

              {/* Background Story */}
              <div className="p-3 rounded-lg bg-[#0D1B2A]/50 border border-[#D4AF37]/20 mb-4">
                <div className="flex items-start gap-2">
                  <Lightbulb size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-[#D4AF37] mb-1">The Story</div>
                    <div className="text-xs text-gray-300 leading-relaxed">
                      {walkthrough.backgroundStory}
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Context */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <SiJira size={12} className="text-blue-400" />
                  <span className="text-gray-400">Jira:</span>
                  <span className="text-blue-400">{walkthrough.teamContext.jiraTicket}</span>
                  <span className="text-green-400 ml-auto">{walkthrough.teamContext.jiraStatus}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FaSlack size={12} className="text-[#D4AF37]" />
                  <span className="text-gray-400">{walkthrough.teamContext.slackThread}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Users size={12} className="text-purple-400" />
                  <span className="text-gray-400">Team:</span>
                  <span className="text-gray-300 text-xs">
                    {walkthrough.teamContext.stakeholders.join(", ")}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlayPause}
                className="w-full bg-[#D4AF37] text-[#0D1B2A] rounded-lg px-4 py-3 font-semibold flex items-center justify-center gap-2 hover:bg-[#D4AF37]/90 transition-all"
              >
                <Play size={16} fill="currentColor" />
                {isPlaying ? "Pause Walkthrough" : "Start Walkthrough"}
              </button>

              {audioPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center justify-center gap-2 text-xs text-[#D4AF37]"
                >
                  <div className="flex gap-1">
                    <motion.div
                      className="w-1 h-3 bg-[#D4AF37] rounded-full"
                      animate={{ height: [12, 6, 12] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    />
                    <motion.div
                      className="w-1 h-3 bg-[#D4AF37] rounded-full"
                      animate={{ height: [12, 6, 12] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                    />
                    <motion.div
                      className="w-1 h-3 bg-[#D4AF37] rounded-full"
                      animate={{ height: [12, 6, 12] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    />
                  </div>
                  <span>Narration playing...</span>
                </motion.div>
              )}
            </motion.div>

            {/* Steps Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1B263B] rounded-xl p-4 border border-[#D4AF37]/10"
            >
              <h3 className="text-sm font-semibold mb-4 text-gray-300">Steps</h3>
              <div className="space-y-2">
                {walkthrough.steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      currentStep === index
                        ? "bg-[#D4AF37]/20 border border-[#D4AF37]"
                        : "bg-[#0D1B2A]/50 border border-transparent hover:border-[#D4AF37]/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex-shrink-0 ${
                          currentStep > index
                            ? "text-green-400"
                            : currentStep === index
                            ? "text-[#D4AF37]"
                            : "text-gray-500"
                        }`}
                      >
                        {currentStep > index ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <div className="w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center text-xs">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-200 mb-1">
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {step.file}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Current Step Header */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${walkthrough.id}-${currentStep}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-[#1B263B] rounded-xl p-6 border border-[#D4AF37]/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded">
                        Step {currentStep + 1} of {walkthrough.steps.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentStepData.title}
                    </h3>
                    <p className="text-gray-400">{currentStepData.description}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-3 text-xs mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D1B2A]/50">
                    <Code size={12} className="text-[#D4AF37]" />
                    <span className="text-gray-400">{currentStepData.file}</span>
                  </div>
                  {'jiraTicket' in currentStepData && currentStepData.jiraTicket && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D1B2A]/50">
                      <SiJira size={12} className="text-blue-400" />
                      <span className="text-gray-400">{currentStepData.jiraTicket}</span>
                    </div>
                  )}
                  {'gitCommit' in currentStepData && currentStepData.gitCommit && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D1B2A]/50">
                      <GitBranch size={12} className="text-[#D4AF37]" />
                      <span className="text-gray-400">{currentStepData.gitCommit}</span>
                    </div>
                  )}
                </div>

                {/* Slack Quote */}
                {'slackQuote' in currentStepData && currentStepData.slackQuote && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500">
                    <div className="flex items-start gap-3">
                      <FaSlack className="text-purple-400 mt-1" size={16} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-purple-300">
                            {currentStepData.slackQuote.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {currentStepData.slackQuote.channel} · {currentStepData.slackQuote.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 italic leading-relaxed">
                          &quot;{currentStepData.slackQuote.text}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Code Block */}
            <AnimatePresence mode="wait">
              {showCode && (
                <motion.div
                  key={`code-${walkthrough.id}-${currentStep}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#1B263B] rounded-xl overflow-hidden border border-[#D4AF37]/10"
                >
                  {/* Code Header */}
                  <div className="bg-[#0D1B2A] px-6 py-3 border-b border-[#D4AF37]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-sm font-mono text-gray-400">
                        {currentStepData.file}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Lines {currentStepData.lineStart}-{currentStepData.lineEnd}
                    </span>
                  </div>

                  {/* Code Content */}
                  <div className="p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
                    <pre className="text-sm font-mono">
                      {currentStepData.realCode.split('\n').map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.015 }}
                          className={`${
                            highlightedLine === index
                              ? "bg-[#D4AF37]/20 -mx-6 px-6"
                              : ""
                          }`}
                        >
                          <span className="text-gray-600 select-none mr-6 inline-block w-8 text-right">
                            {currentStepData.lineStart + index}
                          </span>
                          <span className="text-gray-300">{line}</span>
                        </motion.div>
                      ))}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Explanation */}
            <AnimatePresence mode="wait">
              {showCode && (
                <motion.div
                  key={`explanation-${walkthrough.id}-${currentStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-[#1B263B] rounded-xl p-6 border border-[#D4AF37]/10">
                    <h4 className="text-sm font-semibold text-[#D4AF37] mb-3 flex items-center gap-2">
                      <Code size={16} />
                      What&apos;s happening here?
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {currentStepData.explanation}
                    </p>
                  </div>

                  {/* Why This Way */}
                  {'whyThisWay' in currentStepData && currentStepData.whyThisWay && (
                    <div className="bg-[#1B263B] rounded-xl p-6 border border-[#D4AF37]/10">
                      <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                        <Lightbulb size={16} />
                        Why we built it this way
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {currentStepData.whyThisWay}
                      </p>
                    </div>
                  )}

                  {/* Slack Thread */}
                  {'slackThread' in currentStepData && currentStepData.slackThread && (
                    <div className="bg-[#1B263B] rounded-xl p-6 border border-purple-500/20">
                      <div className="flex items-start gap-3">
                        <MessageSquare size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-purple-400 mb-2 flex items-center gap-2">
                            <FaSlack size={14} />
                            Team Discussion
                          </div>
                          <div className="space-y-2">
                            <div className="p-3 rounded-lg bg-purple-500/5">
                              <div className="text-xs font-semibold text-purple-300 mb-1">
                                {currentStepData.slackThread.author} · {currentStepData.slackThread.channel}
                              </div>
                              <p className="text-sm text-gray-300">{currentStepData.slackThread.text}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-500/5 ml-6">
                              <p className="text-sm text-gray-300 italic">{currentStepData.slackThread.reply}</p>
                            </div>
                            <div className="text-xs text-gray-500 ml-6">
                              {currentStepData.slackThread.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Performance Note */}
                  {'performanceNote' in currentStepData && currentStepData.performanceNote && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Zap size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-blue-400 mb-1">Performance</div>
                        <div className="text-sm text-gray-400">{currentStepData.performanceNote}</div>
                      </div>
                    </div>
                  )}

                  {/* Technical Debt */}
                  {'technicalDebt' in currentStepData && currentStepData.technicalDebt && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <AlertTriangle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-orange-400 mb-1">Technical Debt</div>
                        <div className="text-sm text-gray-400">{currentStepData.technicalDebt}</div>
                      </div>
                    </div>
                  )}

                  {/* End Result */}
                  {'endResult' in currentStepData && currentStepData.endResult && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-green-400 mb-1">Result</div>
                        <div className="text-sm text-gray-400">{currentStepData.endResult}</div>
                      </div>
                    </div>
                  )}

                  {/* Linked Files */}
                  {'linkedFiles' in currentStepData && currentStepData.linkedFiles && currentStepData.linkedFiles.length > 0 && (
                    <div className="bg-[#1B263B] rounded-xl p-6 border border-[#D4AF37]/10">
                      <div className="text-xs font-semibold text-gray-500 mb-3">Related Files</div>
                      <div className="flex flex-wrap gap-2">
                        {currentStepData.linkedFiles.map((file, index) => (
                          <button
                            key={index}
                            className="text-xs px-3 py-2 rounded-lg bg-[#0D1B2A]/50 text-[#D4AF37] hover:bg-[#0D1B2A] transition-colors flex items-center gap-1"
                          >
                            <Code size={12} />
                            {file}
                            <ChevronRight size={12} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-[#1B263B] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#D4AF37]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStep + 1) / walkthrough.steps.length) * 100}%`
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm text-gray-500">
                {currentStep + 1} / {walkthrough.steps.length}
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => currentStep > 0 && goToStep(currentStep - 1)}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-lg bg-[#1B263B] text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1B263B]/80 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => currentStep < walkthrough.steps.length - 1 && goToStep(currentStep + 1)}
                disabled={currentStep === walkthrough.steps.length - 1}
                className="px-6 py-3 rounded-lg bg-[#D4AF37] text-[#0D1B2A] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#D4AF37]/90 transition-colors flex items-center gap-2"
              >
                Next Step
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
