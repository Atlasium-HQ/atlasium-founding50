
import { User, FileText, UserX } from 'lucide-react';

export const Slide1 = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <h1 className="mb-12 text-5xl font-bold">Company knowledge doesn’t scale.</h1>
            <div className="mb-12 flex items-center space-x-8">
                <div className="flex flex-col items-center">
                    <User className="h-12 w-12 text-primary" />
                    <span className="mt-2 text-sm font-semibold">Senior Dev</span>
                </div>
                <div className="h-px w-24 bg-[#D4AF37] opacity-50"></div>
                <div className="flex flex-col items-center">
                    <FileText className="h-12 w-12 text-primary" />
                    <span className="mt-2 text-sm font-semibold">Docs</span>
                </div>
                <div className="h-px w-24 bg-[#D4AF37] opacity-30"></div>
                <div className="flex flex-col items-center">
                    <UserX className="h-12 w-12 text-destructive" />
                    <span className="mt-2 text-sm font-semibold">New Hire</span>
                </div>
            </div>
            <div className="text-xl text-muted-foreground">
                <p>When key people leave, expertise goes with them.</p>
                <p>Teams spend weeks re-explaining architecture and systems.</p>
                <p>Documentation lags behind reality - and onboarding becomes a bottleneck.</p>
            </div>
        </div>
    );
};
