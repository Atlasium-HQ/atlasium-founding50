import type { Metadata } from "next";

export const constructMetadata = ({
  title = "Atlasium - Living memory for your code, infra, and workflows.",
  description = "Engineering teams waste weeks rediscovering tribal knowledge. Atlasium turns your company’s code, infrastructure, and workflows into living walkthroughs that evolve with every update.",
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
