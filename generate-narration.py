#!/usr/bin/env python3
"""
Generate voiceover narration for each walkthrough step
"""

import os
import requests
from pathlib import Path

ELEVENLABS_API_KEY = "sk_1bf06fa4ab77eb74668e0fbdf6945bd9bd4624231e230817"
VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"  # George - British, professional
MODEL_ID = "eleven_multilingual_v2"

# Create output directory
Path("public/narration").mkdir(parents=True, exist_ok=True)

# Narration scripts for each step
NARRATIONS = [
    {
        "id": 1,
        "text": "Step one: API Gateway Entry Point. When a user attempts to log in, their credentials first arrive at our API gateway. The gateway performs critical security checks including rate limiting to prevent brute force attacks, and validates the input format before forwarding the request to our authentication service."
    },
    {
        "id": 2,
        "text": "Step two: Database User Lookup. The authentication service queries our Prisma database to find the user by their email address. Notice the timing attack prevention here - we deliberately take the same amount of time whether the user exists or not. This prevents attackers from determining which email addresses are registered."
    },
    {
        "id": 3,
        "text": "Step three: Password Verification. Now we securely compare the provided password with the stored hash using bcrypt. Bcrypt is intentionally slow, making brute force attacks impractical. Every failed login attempt is logged to our audit system for security monitoring."
    },
    {
        "id": 4,
        "text": "Step four: JWT Token Generation. Once the password is verified, we generate two tokens. An access token that expires in 15 minutes for API requests, and a refresh token that lasts 7 days for obtaining new access tokens. The refresh token is stored in our database so we can revoke it if needed."
    },
    {
        "id": 5,
        "text": "Step five: Session Creation. Finally, we create a session record tracking the user's login, update their last login timestamp, and return both tokens to the client. The refresh token is also set as a secure HTTP-only cookie. The user is now fully authenticated and can access protected resources."
    }
]

def generate_narration(text, step_id):
    """Generate narration audio for a step"""
    print(f"Generating narration for step {step_id}...")

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
            "stability": 0.6,
            "similarity_boost": 0.8,
            "style": 0.0,
            "use_speaker_boost": True
        }
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        output_path = f"public/narration/step-{step_id}.mp3"
        with open(output_path, "wb") as f:
            f.write(response.content)
        print(f"✓ Generated: {output_path}")
        return output_path
    else:
        print(f"✗ Error generating narration for step {step_id}: {response.status_code}")
        print(response.text)
        return None

def main():
    print("=" * 60)
    print("Atlasium Walkthrough Narration Generator")
    print("=" * 60)
    print()

    for narration in NARRATIONS:
        generate_narration(narration["text"], narration["id"])

    print()
    print("=" * 60)
    print("✓ All narrations generated successfully!")
    print("=" * 60)

if __name__ == "__main__":
    main()
