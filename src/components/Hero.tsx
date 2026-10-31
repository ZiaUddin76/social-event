import Image from "next/image"
import Link from "next/link"

const Hero = () => {
    return (
        <section className="relative isolate -mt-2 flex min-h-[650px] items-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/p1.jpg"
                    alt="People enjoying a live concert"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/55" />
            </div>

            {/* Hero Content */}
            <div className="mx-auto w-full max-w-6xl px-4 py-20">
                <div className="max-w-2xl text-white">

                    <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">
                        Discover · Connect · Experience
                    </p>

                    <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                        Help Community
                        <br />
                        Change Lives.
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
                        Find exciting events around you, connect with amazing people,
                        and make every moment unforgettable.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-9 flex flex-wrap items-center gap-4">

                        <Link
                            href="/upcoming-events"
                            className="rounded-md bg-[#bd2929] px-7 py-3 font-semibold text-white transition-colors hover:bg-rose-900"
                        >
                            Explore Events →
                        </Link>

                        <Link
                            href="/create-event"
                            className="rounded-md border border-white px-7 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#800000]"
                        >
                            Create an Event
                        </Link>

                    </div>

                </div>
            </div>

        </section>
    )
}

export default Hero