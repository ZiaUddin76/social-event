import Image from "next/image"
import Link from "next/link"

const Hero = () => {
    return (
        <section className="relative isolate -mt-2 flex min-h-[650px] items-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/gp.jpg"
                    alt="People working for the community"
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

                    <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-rose-200 animate-fade-up">
                        Discover · Connect · Experience
                    </p>

                    <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl animate-fade-up [animation-delay:120ms]">
                        Help Community
                        <br />
                        <span className="bg-gradient-to-r from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
                            Change Lives.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg animate-fade-up [animation-delay:240ms]">
                        Find exciting events around you, connect with amazing people,
                        and make every moment unforgettable.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:360ms]">

                        <Link
                            href="/upcoming-events"
                            className="btn-shine rounded-md bg-[#bd2929] px-7 py-3 font-semibold text-white shadow-lg shadow-[#bd2929]/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-700 active:translate-y-0 active:scale-[0.98]"
                        >
                            Explore Events →
                        </Link>

                        <Link
                            href="/create-event"
                            className="rounded-md border border-white px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#800000]"
                        >
                            Create an Event
                        </Link>

                    </div>


                    {/* Hero Statistics */}
                    <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-up [animation-delay:480ms]">
                        <div className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-center text-xs text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                            <span className="font-bold">1,500+</span> Active Volunteers
                        </div>

                        <div className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-center text-xs text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                            <span className="font-bold">200+</span> Events Completed
                        </div>

                        <div className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-center text-xs text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                            <span className="font-bold">25,000+</span> Lives Impacted
                        </div>

                        <div className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-center text-xs text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                            <span className="font-bold">100%</span> Community Driven
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Hero