
import { ArrowRight } from 'lucide-react';

export const Slide3 = () => {
    const timeline = ['Internet', 'SaaS', 'AI Agents', 'Organizational Memory'];

    return (
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <h1 className="mb-12 text-5xl font-bold">Teams are adopting AI - but they’re missing continuity.</h1>
            <div className="mb-12 flex items-center space-x-4">
                {timeline.map((item, i) => (
                    <div key={item} className="flex items-center">
                        <div className={`rounded-lg px-4 py-2 ${i === timeline.length - 1 ? 'bg-blue-500/20 text-blue-300' : 'bg-secondary'}`}>
                            <span className="font-semibold">{item}</span>
                        </div>
                        {i < timeline.length - 1 && <ArrowRight className="mx-4 h-6 w-6 text-muted-foreground" />}
                    </div>
                ))}
            </div>
            <div className="text-xl text-muted-foreground">
                <p>The AI shift has begun, but most tools only answer questions - they don’t remember.</p>
                <p>As remote work, turnover, and distributed teams rise, companies need systems that retain and teach institutional knowledge automatically.</p>
            </div>
        </div>
    );
};
