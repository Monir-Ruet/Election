import LoginForm from "@/components/login/login-form"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import Image from "next/image"

export default function Login() {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-[40%] mx-auto flex flex-col items-center justify-center min-h-10/12 gap-5 shadow-2xl">
                    <Image src="/logos/election_commision_logo.png" alt="Logo" width={100} height={100} />
                    <LoginForm />
                    <Button size="sm" disabled>
                        <Loader2Icon className="animate-spin" />
                        Please wait
                    </Button>
                </div>
            </div>
        </div>
    )
}