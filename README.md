
# Atlasium Founding50

Atlasium Founding50 is a modern waitlist and onboarding platform built with Next.js 14, Notion as a CMS, Upstash Redis for rate limiting, and Resend for transactional emails. The UI leverages shadcn/ui, Magic UI, and Tailwind CSS for a beautiful and responsive experience.

## Features

- **Next.js 14** for fast, scalable web apps
- **Notion** as a CMS for managing waitlist users
- **Upstash Redis** for rate limiting signups
- **Resend** for transactional emails
- **shadcn/ui** and **Tailwind CSS** for UI components

## Getting Started

1. **Clone the repository**
2. **Install dependencies** (using [Bun](https://bun.sh/)):
	```bash
	bun install
	```
3. **Set up environment variables** in a `.env.local` file:
	- `NOTION_SECRET`: Notion integration secret
	- `NOTION_DB`: Notion database ID
	- `RESEND_API_KEY`: Resend API key
	- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
	- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token
4. **Run the development server**:
	```bash
	bun dev
	```

## Scripts
- `bun dev` — Start the development server
- `bun build` — Build for production
- `bun start` — Start the production server
- `bun email` — Run the email server

## Project Structure
- `app/` — Next.js app directory
- `components/` — Reusable UI components
- `lib/` — Utility functions and animation variants
- `emails/` — Email templates
- `public/` — Static assets

## License
MIT
