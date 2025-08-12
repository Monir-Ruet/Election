import { Spinner } from '@/components/ui/shadcn-io/spinner';

export default function Loading() {
    return (
        <div className="flex h-screen justify-center items-center">
            <Spinner variant={"bars"} size={30} />
        </div>
    )
}