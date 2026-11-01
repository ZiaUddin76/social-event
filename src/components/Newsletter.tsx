import { MailIcon, ArrowRightIcon, HeartIcon } from "lucide-react"

const Newsletter = () => {
    return (
        <section className="bg-[#f8f6f4] py-20">
            <div className="mx-auto max-w-6xl px-4">

                <div className="relative overflow-hidden rounded-3xl bg-white px-6 py-14 shadow-sm sm:px-12 md:px-20">

                    {/* Decorative background shapes */}
                    <div className="absolute -left-16 -top-16 size-48 rounded-full bg-[#bd2929]/5" />
                    <div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-[#bd2929]/5" />

                    <div className="relative mx-auto max-w-3xl text-center">

                        {/* Small icon */}
                        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#bd2929]/10 text-[#bd2929]">
                            <MailIcon className="size-7" />
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <HeartIcon className="size-4 fill-[#bd2929] text-[#bd2929]" />
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#bd2929]">
                                Stay Connected
                            </p>
                        </div>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Join a Community That
                            <span className="block text-[#bd2929]">
                                Creates Real Change.
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-gray-600">
                            Get updates about meaningful events, volunteer opportunities,
                            and inspiring stories from people making a difference.
                        </p>

                        {/* Form Design */}
                        <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">

                            <div className="relative flex-1">
                                <MailIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#bd2929] focus:ring-2 focus:ring-[#bd2929]/10"
                                />
                            </div>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#bd2929] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9f2222] cursor-pointer"
                            >
                                Join Us
                                <ArrowRightIcon className="size-4" />
                            </button>

                        </div>

                        <p className="mt-5 text-xs text-gray-500">
                            No spam. Just meaningful opportunities and community updates.
                        </p>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Newsletter
