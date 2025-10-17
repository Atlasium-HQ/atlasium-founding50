
import Image from 'next/image';

export const Slide4 = () => {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center text-center">
            <div className="absolute inset-0 z-0">
                {/* Background nodes - simple representation */}
                <div className="absolute top-[20%] left-[20%] h-4 w-4 rounded-full bg-blue-500/20"></div>
                <div className="absolute top-[30%] left-[70%] h-3 w-3 rounded-full bg-blue-500/20"></div>
                <div className="absolute top-[60%] left-[40%] h-5 w-5 rounded-full bg-blue-500/20"></div>
                <div className="absolute top-[75%] left-[80%] h-4 w-4 rounded-full bg-blue-500/20"></div>
                <div className="absolute top-[50%] left-[10%] h-3 w-3 rounded-full bg-blue-500/20"></div>
            </div>
            <div className="z-10">
                <Image src="/atlasium-modern-transparent-logo.png" alt="Atlasium Logo" width={200} height={100} className="mb-8"/>
                <h1 className="mb-8 text-5xl font-bold">Every company deserves a permanent memory.</h1>
                <div className="text-xl text-muted-foreground">
                    <p>Atlasium becomes the long-term memory of every organization - an intelligent teammate who never leaves.</p>
                    <p>We’re starting with engineering teams, where onboarding is most painful, and expanding to all departments over time.</p>
                </div>
            </div>
            <div className="absolute bottom-10 text-center text-sm text-muted-foreground">
                <p>Atlasium - Living memory for your code, infra, and workflows.</p>
                <p>atlasium.org</p>
            </div>
        </div>
    );
};
