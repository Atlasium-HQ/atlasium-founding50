import Image from "next/image";

export default function OGImage() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[#0D1B2A]">
      <div className="relative flex flex-col items-center justify-center p-8">
        <Image
          src="/atlasium-modern-transparent-logo.png"
          alt="Atlasium Logo"
          width={200}
          height={100}
          className="mb-8"
        />
        <h1 className="mb-4 text-center text-5xl font-bold text-white">
          Living memory for your code, infra, and workflows.
        </h1>
        <p className="max-w-4xl text-center text-xl text-gray-300">
          Engineering teams waste weeks rediscovering tribal knowledge whenever someone joins or leaves. Atlasium turns a company’s code, infrastructure, and workflows into living walkthroughs that evolve with every update. We help engineers onboard faster, keep context alive, and make documentation intelligent and always up to date.
        </p>
      </div>
    </div>
  );
}
