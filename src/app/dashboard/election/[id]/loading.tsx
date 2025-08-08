import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <Loader2 size={70} />
        </div>
    )
}