import Image from "next/image";

export const Slide2 = () => {
  const icons = [
    { src: "/github.svg", alt: "GitHub" },
    { src: "/slack.svg", alt: "Slack" },
    { src: "/notion.svg", alt: "Notion" },
    { src: "/jira.svg", alt: "Jira" },
    { src: "/confluence.svg", alt: "Confluence" },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <h1 className="mb-12 text-5xl font-bold">
        The company brain that trains itself.
      </h1>
      <div className="relative my-24 flex h-96 w-96 items-center justify-center">
        <Image
          src="/atlasium-icon.png"
          alt="Atlasium Spiral"
          width={100}
          height={100}
        />
        {icons.map((icon, i) => {
          const angle = (i / icons.length) * 2 * Math.PI;
          const x = Math.cos(angle) * 150;
          const y = Math.sin(angle) * 150;
          return (
            <div
              key={icon.alt}
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-secondary"
              style={{ transform: `translate(${x}px, ${y}px)` }}>
              <Image src={icon.src} alt={icon.alt} width={24} height={24} />
            </div>
          );
        })}
      </div>
      <div className="text-xl text-muted-foreground">
        <p>
          Atlasium preserves company expertise by building proactive, evolving
          AI walkthroughs of your code, infra, and workflows.
        </p>
        <p>
          Instead of static docs or Q&A bots, it explains what you didn’t know
          to ask.
        </p>
        <p>Knowledge compounds as the company grows.</p>
      </div>
    </div>
  );
};
