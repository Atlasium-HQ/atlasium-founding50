#!/usr/bin/env python3
"""
Atlasium Demo Video Generator
Creates a 30-60 second product demo with voiceover and captions
"""

import os
import json
import requests
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import subprocess
from pathlib import Path

# Configuration
ELEVENLABS_API_KEY = "sk_1bf06fa4ab77eb74668e0fbdf6945bd9bd4624231e230817"
VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"  # George - British, professional
MODEL_ID = "eleven_multilingual_v2"

# Video settings
WIDTH = 1920
HEIGHT = 1080
FPS = 30
BACKGROUND_COLOR = (13, 27, 42)  # #0D1B2A from brand colors
SECONDARY_COLOR = (27, 38, 59)   # #1B263B
ACCENT_COLOR = (212, 175, 55)    # #D4AF37 (gold)
TEXT_COLOR = (248, 249, 250)     # #F8F9FA

# Create output directories
Path("demo_assets").mkdir(exist_ok=True)
Path("demo_assets/frames").mkdir(exist_ok=True)

# Script with scene timings
SCENES = [
    {
        "id": 1,
        "duration": 8,
        "title": "The Problem",
        "caption": "Onboarding takes 3-6 months",
        "description": "Frustrated manager scenario",
        "voiceover": "Meet Sarah, an engineering manager at a fast-growing startup. Her team just hired three senior engineers, but onboarding is taking months."
    },
    {
        "id": 2,
        "duration": 8,
        "title": "The Solution",
        "caption": "Connect in seconds",
        "description": "Integration dashboard",
        "voiceover": "With Atlasium, Sarah connects her GitHub, Jira, and Slack in seconds. Our AI instantly transforms her codebase into living walkthroughs."
    },
    {
        "id": 3,
        "duration": 16,
        "title": "Product in Action",
        "caption": "Navigate complex systems on day one",
        "description": "Interactive walkthrough",
        "voiceover": "Now, when new engineers join, they can navigate complex systems on day one. Authentication flows, deployment pipelines, microservice architecture—all explained through interactive guides."
    },
    {
        "id": 4,
        "duration": 13,
        "title": "The Results",
        "caption": "3 months → 2 weeks",
        "description": "Metrics comparison",
        "voiceover": "The result? Onboarding time drops from 3 months to 2 weeks. And when senior engineers leave, their knowledge stays."
    },
    {
        "id": 5,
        "duration": 10,
        "title": "Call to Action",
        "caption": "Apply now - atlasium.org",
        "description": "Founding 50 CTA",
        "voiceover": "Join the Founding 50 and transform how your team learns. Apply at atlasium.org."
    }
]

def generate_voiceover():
    """Generate voiceover audio using ElevenLabs API"""
    print("Generating voiceover with ElevenLabs...")

    # Combine all voiceover text
    full_script = " ".join([scene["voiceover"] for scene in SCENES])

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }

    data = {
        "text": full_script,
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.0,
            "use_speaker_boost": True
        }
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        output_path = "demo_assets/voiceover.mp3"
        with open(output_path, "wb") as f:
            f.write(response.content)
        print(f"✓ Voiceover generated: {output_path}")
        return output_path
    else:
        print(f"✗ Error generating voiceover: {response.status_code}")
        print(response.text)
        return None

def get_font(size):
    """Get font with fallback options"""
    font_options = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSDisplay.ttf",
        "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    ]

    for font_path in font_options:
        try:
            return ImageFont.truetype(font_path, size)
        except:
            continue

    return ImageFont.load_default()

def draw_text_centered(draw, text, y, font, fill=TEXT_COLOR, max_width=None):
    """Draw centered text with optional max width"""
    if max_width:
        # Word wrap
        words = text.split()
        lines = []
        current_line = []

        for word in words:
            test_line = ' '.join(current_line + [word])
            bbox = draw.textbbox((0, 0), test_line, font=font)
            if bbox[2] - bbox[0] <= max_width:
                current_line.append(word)
            else:
                if current_line:
                    lines.append(' '.join(current_line))
                current_line = [word]

        if current_line:
            lines.append(' '.join(current_line))

        # Draw each line
        current_y = y
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font)
            text_width = bbox[2] - bbox[0]
            x = (WIDTH - text_width) // 2
            draw.text((x, current_y), line, font=font, fill=fill)
            current_y += bbox[3] - bbox[1] + 20
    else:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        x = (WIDTH - text_width) // 2
        draw.text((x, y), text, font=font, fill=fill)

def create_scene_1():
    """Scene 1: The Problem - Onboarding timeline"""
    print("Creating Scene 1: The Problem...")
    img = Image.new('RGB', (WIDTH, HEIGHT), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)

    # Title
    title_font = get_font(72)
    draw_text_centered(draw, "The Problem", 150, title_font, ACCENT_COLOR)

    # Calendar visualization
    calendar_y = 400
    month_width = 300
    month_height = 200
    spacing = 60

    for i, month in enumerate(["Month 1", "Month 2", "Month 3"]):
        x = (WIDTH - (3 * month_width + 2 * spacing)) // 2 + i * (month_width + spacing)

        # Month box
        draw.rectangle([x, calendar_y, x + month_width, calendar_y + month_height],
                      fill=SECONDARY_COLOR, outline=ACCENT_COLOR, width=3)

        # Month label
        month_font = get_font(36)
        bbox = draw.textbbox((0, 0), month, font=month_font)
        text_width = bbox[2] - bbox[0]
        draw.text((x + (month_width - text_width) // 2, calendar_y + 30),
                 month, font=month_font, fill=TEXT_COLOR)

        # Onboarding text
        if i == 2:
            onboard_font = get_font(28)
            draw.text((x + 40, calendar_y + 100), "Still\nOnboarding...",
                     font=onboard_font, fill=(255, 100, 100))

    # Caption at bottom
    caption_font = get_font(48)
    draw_text_centered(draw, "Onboarding takes 3-6 months", HEIGHT - 150, caption_font, ACCENT_COLOR)

    return img

def create_scene_2():
    """Scene 2: The Solution - Integration Dashboard"""
    print("Creating Scene 2: The Solution...")
    img = Image.new('RGB', (WIDTH, HEIGHT), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)

    # Title
    title_font = get_font(72)
    draw_text_centered(draw, "Atlasium", 120, title_font, ACCENT_COLOR)

    # Subtitle
    subtitle_font = get_font(42)
    draw_text_centered(draw, "AI-Powered Living Walkthroughs", 220, subtitle_font, TEXT_COLOR)

    # Integration circles
    center_x = WIDTH // 2
    center_y = HEIGHT // 2 + 50
    radius = 100

    integrations = [
        {"name": "GitHub", "angle": 0},
        {"name": "Slack", "angle": 120},
        {"name": "Jira", "angle": 240}
    ]

    import math

    # Central Atlasium hub
    draw.ellipse([center_x - 120, center_y - 120, center_x + 120, center_y + 120],
                fill=ACCENT_COLOR, outline=ACCENT_COLOR, width=5)

    hub_font = get_font(36)
    draw_text_centered(draw, "Atlasium", center_y - 20, hub_font, BACKGROUND_COLOR)

    # Integration nodes
    distance = 350
    for integration in integrations:
        angle_rad = math.radians(integration["angle"])
        x = center_x + int(distance * math.cos(angle_rad))
        y = center_y + int(distance * math.sin(angle_rad))

        # Circle
        draw.ellipse([x - radius, y - radius, x + radius, y + radius],
                    fill=SECONDARY_COLOR, outline=TEXT_COLOR, width=4)

        # Label
        label_font = get_font(32)
        bbox = draw.textbbox((0, 0), integration["name"], font=label_font)
        text_width = bbox[2] - bbox[0]
        draw.text((x - text_width // 2, y - 15), integration["name"],
                 font=label_font, fill=TEXT_COLOR)

        # Connection line
        draw.line([center_x, center_y, x, y], fill=ACCENT_COLOR, width=4)

    # Caption
    caption_font = get_font(48)
    draw_text_centered(draw, "Connect in seconds", HEIGHT - 150, caption_font, ACCENT_COLOR)

    return img

def create_scene_3():
    """Scene 3: Product in Action - Interactive Walkthrough"""
    print("Creating Scene 3: Product in Action...")
    img = Image.new('RGB', (WIDTH, HEIGHT), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)

    # Title
    title_font = get_font(64)
    draw_text_centered(draw, "Living Walkthroughs", 100, title_font, ACCENT_COLOR)

    # Mock IDE/walkthrough interface
    panel_x = 200
    panel_y = 250
    panel_width = WIDTH - 400
    panel_height = 550

    # Main panel
    draw.rectangle([panel_x, panel_y, panel_x + panel_width, panel_y + panel_height],
                  fill=SECONDARY_COLOR, outline=TEXT_COLOR, width=3)

    # Panel header
    draw.rectangle([panel_x, panel_y, panel_x + panel_width, panel_y + 60],
                  fill=ACCENT_COLOR)

    header_font = get_font(32)
    draw.text((panel_x + 30, panel_y + 15), "Authentication Flow Walkthrough",
             font=header_font, fill=BACKGROUND_COLOR)

    # Code-like content
    content_font = get_font(28)
    content_y = panel_y + 100
    content_lines = [
        "1. User Login → API Gateway",
        "2. JWT Token Generation",
        "3. Session Management",
        "4. Authorization Middleware"
    ]

    for i, line in enumerate(content_lines):
        # Bullet point
        draw.ellipse([panel_x + 40, content_y + i * 80, panel_x + 60, content_y + i * 80 + 20],
                    fill=ACCENT_COLOR)

        # Text
        draw.text((panel_x + 80, content_y + i * 80), line,
                 font=content_font, fill=TEXT_COLOR)

        # Progress indicator
        progress_width = 400
        progress_x = panel_x + 600
        draw.rectangle([progress_x, content_y + i * 80 + 5,
                       progress_x + progress_width, content_y + i * 80 + 25],
                      outline=TEXT_COLOR, width=2)
        fill_width = int(progress_width * (i + 1) / 4)
        draw.rectangle([progress_x, content_y + i * 80 + 5,
                       progress_x + fill_width, content_y + i * 80 + 25],
                      fill=ACCENT_COLOR)

    # Caption
    caption_font = get_font(44)
    draw_text_centered(draw, "Navigate complex systems on day one", HEIGHT - 120,
                      caption_font, ACCENT_COLOR)

    return img

def create_scene_4():
    """Scene 4: Results - Metrics Comparison"""
    print("Creating Scene 4: The Results...")
    img = Image.new('RGB', (WIDTH, HEIGHT), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)

    # Title
    title_font = get_font(72)
    draw_text_centered(draw, "The Results", 120, title_font, ACCENT_COLOR)

    # Before/After comparison
    split_x = WIDTH // 2

    # Before side
    before_font = get_font(48)
    draw.text((WIDTH // 4 - 80, 300), "Before", font=before_font, fill=(255, 100, 100))

    before_time_font = get_font(120)
    draw.text((WIDTH // 4 - 180, 400), "3", font=before_time_font, fill=(255, 100, 100))

    before_label_font = get_font(42)
    draw.text((WIDTH // 4 - 100, 550), "months", font=before_label_font, fill=TEXT_COLOR)

    # Divider
    draw.line([split_x, 250, split_x, HEIGHT - 250], fill=ACCENT_COLOR, width=5)

    # Arrow
    arrow_font = get_font(100)
    draw.text((split_x - 50, HEIGHT // 2 - 80), "→", font=arrow_font, fill=ACCENT_COLOR)

    # After side
    after_font = get_font(48)
    draw.text((3 * WIDTH // 4 - 60, 300), "After", font=after_font, fill=(100, 255, 100))

    after_time_font = get_font(120)
    draw.text((3 * WIDTH // 4 - 180, 400), "2", font=after_time_font, fill=(100, 255, 100))

    after_label_font = get_font(42)
    draw.text((3 * WIDTH // 4 - 80, 550), "weeks", font=after_label_font, fill=TEXT_COLOR)

    # Additional metric
    metric_font = get_font(36)
    draw_text_centered(draw, "Knowledge preserved even when engineers leave",
                      HEIGHT - 250, metric_font, TEXT_COLOR)

    # Caption
    caption_font = get_font(52)
    draw_text_centered(draw, "85% faster onboarding", HEIGHT - 130, caption_font, ACCENT_COLOR)

    return img

def create_scene_5():
    """Scene 5: Call to Action"""
    print("Creating Scene 5: CTA...")
    img = Image.new('RGB', (WIDTH, HEIGHT), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)

    # Logo/Title
    logo_font = get_font(120)
    draw_text_centered(draw, "Atlasium", HEIGHT // 2 - 200, logo_font, ACCENT_COLOR)

    # Founding 50
    founding_font = get_font(64)
    draw_text_centered(draw, "Founding 50 Program", HEIGHT // 2 - 50, founding_font, TEXT_COLOR)

    # CTA Box
    box_width = 800
    box_height = 150
    box_x = (WIDTH - box_width) // 2
    box_y = HEIGHT // 2 + 80

    draw.rounded_rectangle([box_x, box_y, box_x + box_width, box_y + box_height],
                          radius=20, fill=ACCENT_COLOR, outline=ACCENT_COLOR, width=5)

    # CTA Text
    cta_font = get_font(56)
    draw_text_centered(draw, "Apply Now", box_y + 45, cta_font, BACKGROUND_COLOR)

    # URL
    url_font = get_font(52)
    draw_text_centered(draw, "atlasium.org", HEIGHT - 180, url_font, TEXT_COLOR)

    # Tagline
    tagline_font = get_font(38)
    draw_text_centered(draw, "Transform how your team learns", HEIGHT - 90,
                      tagline_font, (180, 180, 180))

    return img

def create_all_scenes():
    """Generate all scene images"""
    scenes_functions = [
        create_scene_1,
        create_scene_2,
        create_scene_3,
        create_scene_4,
        create_scene_5
    ]

    scene_paths = []
    for i, func in enumerate(scenes_functions, 1):
        img = func()
        path = f"demo_assets/frames/scene_{i}.png"
        img.save(path)
        scene_paths.append(path)
        print(f"✓ Saved: {path}")

    return scene_paths

def create_video_with_captions():
    """Create video from scenes with captions using ffmpeg"""
    print("\nCreating video with ffmpeg...")

    # Create a concat file for ffmpeg
    concat_content = []
    for i, scene in enumerate(SCENES, 1):
        # Create a video segment for each scene
        segment_path = f"demo_assets/scene_{i}_video.mp4"

        # Convert static image to video with duration
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1",
            "-i", f"demo_assets/frames/scene_{i}.png",
            "-c:v", "libx264",
            "-t", str(scene["duration"]),
            "-pix_fmt", "yuv420p",
            "-vf", "scale=1920:1080",
            segment_path
        ]

        subprocess.run(cmd, check=True, capture_output=True)
        print(f"✓ Created video segment: {segment_path}")
        concat_content.append(f"file 'scene_{i}_video.mp4'")

    # Write concat file
    concat_file = "demo_assets/concat_list.txt"
    with open(concat_file, "w") as f:
        f.write("\n".join(concat_content))

    # Concatenate all segments
    silent_video = "demo_assets/demo_silent.mp4"
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_file,
        "-c", "copy",
        silent_video
    ]

    subprocess.run(cmd, check=True, capture_output=True)
    print(f"✓ Concatenated video: {silent_video}")

    return silent_video

def add_audio_to_video(video_path, audio_path, output_path):
    """Add voiceover audio to video"""
    print(f"\nAdding voiceover to video...")

    cmd = [
        "ffmpeg", "-y",
        "-i", video_path,
        "-i", audio_path,
        "-c:v", "copy",
        "-c:a", "aac",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-shortest",
        output_path
    ]

    subprocess.run(cmd, check=True, capture_output=True)
    print(f"✓ Final video created: {output_path}")

def main():
    """Main execution flow"""
    print("=" * 60)
    print("Atlasium Demo Video Generator")
    print("=" * 60)

    # Step 1: Generate voiceover
    audio_path = generate_voiceover()
    if not audio_path:
        print("Failed to generate voiceover. Exiting.")
        return

    print()

    # Step 2: Create scene images
    print("Generating scene images...")
    scene_paths = create_all_scenes()

    print()

    # Step 3: Create video from scenes
    silent_video = create_video_with_captions()

    # Step 4: Add audio to video
    final_output = "atlasium-demo.mp4"
    add_audio_to_video(silent_video, audio_path, final_output)

    print()
    print("=" * 60)
    print(f"✓ Demo video complete: {final_output}")
    print("=" * 60)

if __name__ == "__main__":
    main()
