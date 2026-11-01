import AuthSuccessToast from '@/components/AuthSuccessToast';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import React from 'react';

const page = () => {
    return (
        <main className="m-0 p-0">

            <AuthSuccessToast />

            <Hero />

            <Features />

            <Gallery />

            <Newsletter />

        </main>
    );
};

export default page;