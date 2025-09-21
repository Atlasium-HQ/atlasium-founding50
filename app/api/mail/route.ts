import { render } from "@react-email/render";

import AtlasiumFoundingEmail from "../../../emails";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  // 2 requests per minute from the same IP address in a sliding window of 1 minute duration which means that the window slides forward every second and the rate limit is reset every minute for each IP address.
  limiter: Ratelimit.slidingWindow(2, "1 m"),
});

export async function POST(request: NextRequest, response: NextResponse) {
  const ip = request.ip ?? "127.0.0.1";

  const result = await ratelimit.limit(ip);

  if (!result.success) {
    return Response.json(
      {
        error: "Too many requests!!",
      },
      {
        status: 429,
      },
    );
  }

  const { email, firstname, company, role, teamSize, pain } = await request.json();

  // Extract first name from the full name
  const firstNameOnly = firstname.trim().split(' ')[0];

  const { data, error } = await resend.emails.send({
    from: "Atlasium Team <team@atlasium.org>",
    to: [email],
    subject: "Thanks for applying to the Atlasium Founding 50 🚀",
    reply_to: "team@atlasium.org",
    html: await render(AtlasiumFoundingEmail({ 
      userFirstname: firstNameOnly,
      company,
      role,
      teamSize,
      pain
    })),
  });

  // const { data, error } = { data: true, error: null }

  if (error) {
    return NextResponse.json(error);
  }

  if (!data) {
    return NextResponse.json({ message: "Failed to send email" });
  }

  return NextResponse.json({ message: "Email sent successfully" });
}
