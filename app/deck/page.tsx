'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Slide1 } from '@/components/deck/slide-1';
import { Slide2 } from '@/components/deck/slide-2';
import { Slide3 } from '@/components/deck/slide-3';
import { Slide4 } from '@/components/deck/slide-4';

const slides = [<Slide1 key="1" />, <Slide2 key="2" />, <Slide3 key="3" />, <Slide4 key="4" />];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
    }),
};


import { Suspense } from 'react';

function Deck() {
    const searchParams = useSearchParams();
    const secret = searchParams.get('secret');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [[page, direction], setPage] = useState([0, 0]);

    useEffect(() => {
        // Hardcoded secret for demonstration. In a real app, use a more secure method.
        if (secret === 'atlasium-deck') {
            setIsAuthorized(true);
        }
    }, [secret]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            paginate(1);
        } else if (e.key === 'ArrowLeft') {
            paginate(-1);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [page]);


    if (!isAuthorized) {
        return (
            <div className="flex h-screen w-full items-center justify-center text-foreground" style={{ backgroundColor: '#0D1B2A' }}>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Unauthorized</h1>
                    <p className="text-muted-foreground">You need a secret key to view this page.</p>
                </div>
            </div>
        );
    }

    const slideIndex = ((page % slides.length) + slides.length) % slides.length;

    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden" style={{ backgroundColor: '#0D1B2A' }}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="absolute flex h-3/4 w-3/4 items-center justify-center p-8"
                >
                    {slides[slideIndex]}
                </motion.div>
            </AnimatePresence>
            <div className="absolute top-4 left-4">
                <Image src="/atlasium-modern-transparent-logo.png" alt="Atlasium Logo" width={150} height={50} />
            </div>
            <div className="absolute bottom-4 right-1/2 translate-x-1/2 flex items-center space-x-4">
                 <span className="text-sm text-muted-foreground">{slideIndex + 1} / {slides.length}</span>
            </div>
            <button
                onClick={() => paginate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2 text-foreground hover:bg-accent"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={() => paginate(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2 text-foreground hover:bg-accent"
            >
                <ChevronRight className="h-6 w-6" />
            </button>
        </div>
    );
}

export default function DeckPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Deck />
        </Suspense>
    )
}