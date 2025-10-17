import type { Metadata } from "next";

export const constructMetadata = ({
  title = "Atlasium | AI Onboarding Platform to Preserve Expertise & Ramp Engineers Faster",
  description = "Atlasium transforms onboarding with evolving AI walkthroughs of your codebase, infrastructure, and workflows. Every new hire ramps faster, expertise stays preserved, and your team keeps moving forward without losing knowledge.",
  image = "/og-image.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL("https://atlasium.org"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};
