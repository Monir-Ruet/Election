import { LoginForm } from "@/app/login/_components/login-form";

export default function Page() {
    return (
        <div className="flex items-center justify-center bg-gray-25 pb-28 pt-8 lg:pt-20 [@media(min-width:32.125em)]:px-10">
            <figure className="relative z-10 w-full bg-gray-50 p-4 [@media(min-width:32.125rem)]:max-w-[27.125rem]">
                <span className="absolute inset-0 [background-image:repeating-linear-gradient(-45deg,theme(colors.gray.100/.25),theme(colors.gray.100/.25)_6px,transparent_6px,transparent_12px)] [mask-image:linear-gradient(to_top,black,transparent_80%)]"></span>

                {/* Top border */}
                <div
                    className="absolute opacity-10 inset-x-0 h-px -top-px"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 1'%3E%3Crect width='4' height='1' fill='%23212126'/%3E%3C/svg%3E\")",
                        maskImage:
                            "linear-gradient(to right, transparent, white 3.25rem, white calc(100% - 3.25rem), transparent)",
                        marginLeft: "-3.25rem",
                        marginRight: "-3.25rem"
                    }}
                ></div>

                {/* Right border */}
                <div
                    className="absolute opacity-10 inset-y-0 w-px -right-px"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 8'%3E%3Crect width='1' height='4' fill='%23212126'/%3E%3C/svg%3E\")",
                        maskImage:
                            "linear-gradient(transparent, white 3.25rem, white calc(100% - 3.25rem), transparent)",
                        marginTop: "-3.25rem",
                        marginBottom: "-3.25rem"
                    }}
                ></div>

                {/* Bottom border */}
                <div
                    className="absolute opacity-10 inset-x-0 h-px -bottom-px"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 1'%3E%3Crect width='4' height='1' fill='%23212126'/%3E%3C/svg%3E\")",
                        maskImage:
                            "linear-gradient(to right, transparent, white 3.25rem, white calc(100% - 3.25rem), transparent)",
                        marginLeft: "-3.25rem",
                        marginRight: "-3.25rem"
                    }}
                ></div>

                {/* Left border */}
                <div
                    className="absolute opacity-10 inset-y-0 w-px -left-px"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 8'%3E%3Crect width='1' height='4' fill='%23212126'/%3E%3C/svg%3E\")",
                        maskImage:
                            "linear-gradient(transparent, white 3.25rem, white calc(100% - 3.25rem), transparent)",
                        marginTop: "-3.25rem",
                        marginBottom: "-3.25rem"
                    }}
                ></div>

                <div className="border-black/6 relative w-full overflow-hidden rounded-xl border bg-gray-50 bg-clip-padding shadow-xl">
                    <div className="rounded-b-lg rounded-t-xl bg-white shadow-[0_0_2px_theme(colors.black/0.08),0_1px_2px_theme(colors.black/0.06),0_0_2px_theme(colors.black/0.08)]">
                        <div className="flex flex-col gap-8 overflow-hidden px-10 py-8">
                            <header className="flex flex-col justify-center gap-2">
                                <p className="text-center text-[1.0625rem]/6 font-semibold text-gray-950">
                                    Sign into Bangladesh Blockchain Election
                                </p>
                                <p className="text-center text-[0.875rem]/5 text-gray-500">
                                    Welcome back! Please sign in to continue
                                </p>
                            </header>

                            {/* Example login form placeholder */}
                            <LoginForm />
                        </div>
                    </div>
                </div>

                <p className="relative pt-4 text-center text-xs/4 font-medium text-gray-400">
                    This is a preview
                </p>
            </figure>
        </div>
    );
}
