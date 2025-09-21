import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    
    // Check if email already exists
    const existingEntries = await notion.databases.query({
      database_id: `${process.env.NOTION_DB}`,
      filter: {
        property: "Email",
        email: {
          equals: body?.email,
        },
      },
    });

    if (existingEntries.results.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email already exists" }, 
        { status: 409 }
      );
    }

    const response = await notion.pages.create({
      parent: {
        database_id: `${process.env.NOTION_DB}`,
      },
      properties: {
        Email: {
          type: "email",
          email: body?.email,
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: body?.name,
              },
            },
          ],
        },
        Company: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body?.company || "",
              },
            },
          ],
        },
        Role: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body?.role || "",
              },
            },
          ],
        },
        "Team Size": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body?.teamSize || "",
              },
            },
          ],
        },
        "Onboarding Pain": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body?.pain || "",
              },
            },
          ],
        },
      },
    });

    if (!response) {
      throw new Error("Failed to add email to Notion");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
