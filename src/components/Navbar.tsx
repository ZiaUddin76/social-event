import Link from "next/link"
import {
    CalendarDaysIcon,
    PlusCircleIcon,
    CalendarCheckIcon,
    UsersIcon,
    MenuIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
    return (
        <header className="w-full border-b bg-[#bd2929] text-white">
            <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold shrink-0">
                    Event<span>Hub</span>
                </Link>

                {/* Desktop & Tablet - Center Navigation */}
                <Link
                    href="/upcoming-events"
                    className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 text-sm font-medium transition-colors hover:text-rose-200 sm:flex"
                >
                    <CalendarDaysIcon className="size-4" />
                    <span>Upcoming Events</span>
                </Link>

                {/* Desktop & Tablet - Login & Profile */}
                <div className="ml-auto hidden items-center gap-3 sm:flex">

                    {/* Login */}
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-rose-700 shadow transition-colors hover:bg-gray-100"
                    >
                        Login
                    </Link>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-white/10"
                                    title="John Doe"
                                >
                                    <Avatar>
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="John Doe"
                                        />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            }
                        />

                        <DropdownMenuContent align="end" className="w-52">

                            <div className="px-2 py-2">
                                <p className="text-sm font-semibold">John Doe</p>
                                <p className="text-xs text-muted-foreground">
                                    Manage your events
                                </p>
                            </div>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    render={
                                        <Link href="/create-event">
                                            <PlusCircleIcon />
                                            Create Event
                                        </Link>
                                    }
                                >
                                    Create Event
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    render={
                                        <Link href="/manage-events">
                                            <CalendarCheckIcon />
                                            Manage Events
                                        </Link>
                                    }
                                >
                                    Manage Events
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    render={
                                        <Link href="/joined-events">
                                            <UsersIcon />
                                            Joined Events
                                        </Link>
                                    }
                                >
                                    Joined Events
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile Navigation */}
                <div className="sm:hidden">
                    <Sheet>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-white/10 hover:text-white"
                                    aria-label="Open navigation menu"
                                >
                                    <MenuIcon className="size-6" />
                                </Button>
                            }
                        />

                        <SheetContent side="right" className="w-[280px] sm:w-[350px]">

                            <SheetHeader>
                                <SheetTitle className="text-left text-xl font-bold">
                                    EventHub
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-5 px-4">

                                {/* Upcoming Events */}
                                <Link
                                    href="/upcoming-events"
                                    className="flex items-center gap-3 text-sm font-medium hover:text-rose-700"
                                >
                                    <CalendarDaysIcon className="size-5" />
                                    Upcoming Events
                                </Link>

                                <div className="border-t" />

                                {/* Login */}
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center rounded-md bg-[#800000] px-4 py-2 text-sm font-medium text-white hover:bg-rose-900"
                                >
                                    Login
                                </Link>

                                {/* Profile */}
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="John Doe"
                                        />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="text-sm font-semibold">John Doe</p>
                                        <p className="text-xs text-muted-foreground">
                                            Manage your events
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t" />

                                {/* Profile Links */}
                                <Link
                                    href="/create-event"
                                    className="flex items-center gap-3 text-sm hover:text-rose-700"
                                >
                                    <PlusCircleIcon className="size-5" />
                                    Create Event
                                </Link>

                                <Link
                                    href="/manage-events"
                                    className="flex items-center gap-3 text-sm hover:text-rose-700"
                                >
                                    <CalendarCheckIcon className="size-5" />
                                    Manage Events
                                </Link>

                                <Link
                                    href="/joined-events"
                                    className="flex items-center gap-3 text-sm hover:text-rose-700"
                                >
                                    <UsersIcon className="size-5" />
                                    Joined Events
                                </Link>

                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </nav>
        </header>
    )
}

export default Navbar