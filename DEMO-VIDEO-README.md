# Atlasium Demo Video

## Generated Files

### Main Output
- **`atlasium-demo.mp4`** - Final 45-second demo video with voiceover (1920x1080, 16:9)

### Assets (in `demo_assets/`)
- `voiceover.mp3` - ElevenLabs generated voiceover audio
- `frames/scene_*.png` - Individual scene images (5 scenes)
- `scene_*_video.mp4` - Individual scene video segments
- `demo_silent.mp4` - Video without audio

---

## Video Content

### Scene Breakdown (45 seconds total)

1. **The Problem** (0-8s)
   - Shows the onboarding timeline challenge (3-6 months)
   - Caption: "Onboarding takes 3-6 months"

2. **The Solution** (8-16s)
   - Atlasium integration dashboard connecting GitHub, Jira, Slack
   - Caption: "Connect in seconds"

3. **Product in Action** (16-32s)
   - Interactive walkthrough interface demonstrating living walkthroughs
   - Caption: "Navigate complex systems on day one"

4. **The Results** (32-45s)
   - Before/After metrics: 3 months → 2 weeks (85% faster)
   - Caption: "3 months → 2 weeks"

5. **Call to Action** (45-55s)
   - Founding 50 program invitation
   - Caption: "Apply now - atlasium.org"

---

## Usage Options

### 1. Add to Website Landing Page

Move the video to the public folder:
```bash
cp atlasium-demo.mp4 public/
```

Then embed in your page:
```jsx
<video
  width="1920"
  height="1080"
  controls
  autoPlay
  muted
  loop
  className="max-w-full h-auto"
>
  <source src="/atlasium-demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

### 2. Upload to Video Hosting

For better performance, upload to:
- **YouTube** (public or unlisted)
- **Vimeo**
- **Cloudflare Stream**
- **AWS S3 + CloudFront**

Then embed using their iframe/player:
```jsx
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  width="1920"
  height="1080"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  allowFullScreen
/>
```

### 3. Social Media

**Twitter/X:**
- Upload directly (max 2:20, so 45s is perfect)
- Recommended: 1280x720 (resize if needed)

**LinkedIn:**
- Upload directly
- Add captions in LinkedIn's caption tool

**Instagram/Facebook:**
- Convert to 1:1 (square) or 9:16 (vertical) if needed
- Use a tool like ffmpeg to resize

### 4. Email Campaigns

- Upload to hosting service
- Use thumbnail image with "play" button linked to video
- Or use animated GIF preview

---

## Regeneration

To regenerate the video with changes:

1. Edit the script in `demo-script.md`
2. Modify scene content in `generate-demo-video.py`
3. Run:
```bash
source venv/bin/activate
python3 generate-demo-video.py
```

---

## Video Specifications

- **Resolution:** 1920x1080 (Full HD)
- **Aspect Ratio:** 16:9 (horizontal)
- **Frame Rate:** 30 fps
- **Duration:** 45 seconds
- **Audio:** MP3, 44.1kHz
- **Voice:** George (ElevenLabs) - British, professional, narrative
- **Brand Colors:**
  - Background: #0D1B2A (dark navy)
  - Secondary: #1B263B
  - Accent: #D4AF37 (gold)
  - Text: #F8F9FA (off-white)

---

## Next Steps

1. **Review the video** - Open `atlasium-demo.mp4` and watch it
2. **Optimize for web** - Consider compressing further if needed:
   ```bash
   ffmpeg -i atlasium-demo.mp4 -vcodec libx264 -crf 23 -preset medium atlasium-demo-compressed.mp4
   ```
3. **Create thumbnail** - Extract a frame for preview:
   ```bash
   ffmpeg -i atlasium-demo.mp4 -ss 00:00:16 -vframes 1 demo-thumbnail.jpg
   ```
4. **Add to landing page** - Embed in the hero section or product showcase
5. **Share on social media** - Post on Twitter, LinkedIn with targeted messaging

---

## Customization

To customize further:
- **Change voice:** Update `VOICE_ID` in `generate-demo-video.py`
- **Adjust duration:** Modify `duration` values in `SCENES` array
- **Update content:** Edit scene creation functions
- **Change colors:** Update color constants at top of script
- **Add transitions:** Enhance ffmpeg commands with filters

---

## Support

For questions or issues with video generation:
1. Check that ElevenLabs API key is valid
2. Ensure ffmpeg is installed: `which ffmpeg`
3. Verify Python packages: `pip list | grep -E "(Pillow|requests)"`
4. Review error logs if generation fails
