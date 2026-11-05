
import AuthSuccessToast from '@/components/AuthSuccessToast';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import RecentEvents from '@/components/RecentEvents';
import { Suspense } from 'react';
import React from 'react';

const page = () => {
    return (
        <main className="m-0 p-0">

            <AuthSuccessToast />

            <Hero />

            <Features />

            <Suspense
                fallback={
                    <div className="py-20 text-center text-gray-500">
                        Loading upcoming events...
                    </div>
                }
            >
                <RecentEvents />
            </Suspense>

            <Gallery />

            <Newsletter />

        </main>
    );
};

export default page;
