import Link from "next/link"
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { Mail, Heart } from "lucide-react"


const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white">

            <div className="mx-auto max-w-6xl px-4 py-16">

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-2xl font-bold">
                            Event<span className="text-[#bd2929]">Hub</span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
                            Bringing people together through meaningful events,
                            community service, and positive social change.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#bd2929] hover:shadow-lg hover:shadow-[#bd2929]/40"
                            >
                                <FaFacebookF className="size-4" />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#bd2929] hover:shadow-lg hover:shadow-[#bd2929]/40"
                            >
                                <FaInstagram className="size-4" />
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#bd2929] hover:shadow-lg hover:shadow-[#bd2929]/40"
                            >
                                <FaXTwitter className="size-4" />
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Explore
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
                            <Link href="/" className="transition hover:text-white">
                                Home
                            </Link>

                            <Link
                                href="/upcoming-events"
                                className="transition hover:text-white"
                            >
                                Upcoming Events
                            </Link>

                            <Link
                                href="/create-event"
                                className="transition hover:text-white"
                            >
                                Create Event
                            </Link>
                        </div>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Community
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
                            <Link
                                href="/manage-events"
                                className="transition hover:text-white"
                            >
                                Manage Events
                            </Link>

                            <Link
                                href="/joined-events"
                                className="transition hover:text-white"
                            >
                                Joined Events
                            </Link>

                            <Link
                                href="/upcoming-events"
                                className="transition hover:text-white"
                            >
                                Find Opportunities
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Stay Connected
                        </h3>

                        <p className="mt-5 text-sm leading-relaxed text-gray-400">
                            Join our community and discover opportunities to make
                            a real difference.
                        </p>

                        <a
                            href="mailto:hello@eventhub.com"
                            className="mt-5 flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                        >
                            <Mail className="size-4 text-[#bd2929]" />
                            hello@eventhub.com
                        </a>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © 2026 EventHub. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1">
                        Made with
                        <Heart className="size-4 fill-[#bd2929] text-[#bd2929]" />
                        for stronger communities
                    </p>

                </div>

            </div>
        </footer>
    )
}

export default Footer