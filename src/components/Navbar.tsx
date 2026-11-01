
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
    CalendarDaysIcon,
    PlusCircleIcon,
    CalendarCheckIcon,
    UsersIcon,
    MenuIcon,
    LogOutIcon,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"

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
    const router = useRouter()

    const { data: session, isPending } = authClient.useSession()

    const user = session?.user

    const handleLogout = async () => {
        const { error } = await authClient.signOut()

        if (error) {
            toast.error("Unable to log out. Please try again.")
            return
        }

        toast.success("Logged out successfully!")

        router.push("/login")
        router.refresh()
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-[#bd2929] text-white">
            <nav>
                <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

                    {/* Logo */}
                    <Link href="/" className="shrink-0 text-xl font-bold">
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

                        {/* Login - Logged Out */}
                        {!isPending && !user && (
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-rose-700 shadow transition-colors hover:bg-gray-100"
                            >
                                Login
                            </Link>
                        )}

                        {/* Profile & Logout - Logged In */}
                        {!isPending && user && (
                            <div className="flex items-center gap-2">

                                {/* Profile Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full hover:bg-white/10"
                                                title={user.name || "My Profile"}
                                            >
                                                <Avatar>
                                                    <AvatarImage
                                                        src={user.image || ""}
                                                        alt={user.name || "User"}
                                                    />
                                                    <AvatarFallback>
                                                        {(user.name || user.email || "U")
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        }
                                    />

                                    <DropdownMenuContent align="end" className="w-52">

                                        {/* User Information */}
                                        <div className="px-2 py-2">
                                            <p className="text-sm font-semibold">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>

                                        <DropdownMenuSeparator />

                                        {/* Profile Links */}
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem
                                                render={<Link href="/create-event" />}
                                            >
                                                <PlusCircleIcon />
                                                Create Event
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                render={<Link href="/manage-events" />}
                                            >
                                                <CalendarCheckIcon />
                                                Manage Events
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                render={<Link href="/joined-events" />}
                                            >
                                                <UsersIcon />
                                                Joined Events
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>

                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Separate Logout Button */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleLogout}
                                    title="Logout"
                                    aria-label="Logout"
                                    className="text-white hover:bg-white/10 hover:text-white"
                                >
                                    <LogOutIcon className="size-5" />
                                </Button>

                            </div>
                        )}
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

                            <SheetContent
                                side="right"
                                className="w-[300px] overflow-y-auto"
                            >

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

                                    {/* Login - Logged Out */}
                                    {!isPending && !user && (
                                        <Link
                                            href="/login"
                                            className="flex items-center justify-center rounded-md bg-[#800000] px-4 py-2 text-sm font-medium text-white hover:bg-rose-900"
                                        >
                                            Login
                                        </Link>
                                    )}

                                    {/* Profile - Logged In */}
                                    {!isPending && user && (
                                        <>
                                            {/* User Information */}
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={user.image || ""}
                                                        alt={user.name || "User"}
                                                    />
                                                    <AvatarFallback>
                                                        {(user.name || user.email || "U")
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {user.email}
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

                                            <div className="border-t" />

                                            {/* Separate Logout */}
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 text-sm text-red-600 hover:text-red-800"
                                            >
                                                <LogOutIcon className="size-5" />
                                                Logout
                                            </button>
                                        </>
                                    )}

                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Navbar
