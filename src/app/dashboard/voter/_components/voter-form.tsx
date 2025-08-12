"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { toast } from "sonner"
import { Result } from "@/lib/result"
import { IVoter } from "@/app/dashboard/voter/_types/Voter"
import { VoterForm, voterSchema } from "@/schemas/voters/voter-schema"
import { Loader2 } from "lucide-react"

export default function AddVoterForm({ voter }: { voter: IVoter | undefined }) {
    const isCreateForm = !voter;
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<VoterForm>({
        resolver: zodResolver(voterSchema),
        defaultValues: {
            nid: voter?.nid,
            name: voter?.name
        },
    });

    const onSubmit = async (data: VoterForm) => {
        console.log(data)
        const promise = () => new Promise<Result<unknown>>(async (resolve, reject) => {
            try {
                const voter = {
                    nid: data.nid,
                    name: data.name,
                };
                const response = await axios.post<Result<unknown>>("/api/voter", JSON.stringify(voter), {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                return resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(promise, {
            loading: 'Loading',
            success: (data) => {
                reset();
                return `${data?.message || "Voter added successfully!"}`;
            },
            error: 'Failed to add voter. Please try again.',
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3">
                <Label htmlFor="nid">Nid <span className="text-red-500">*</span></Label>
                <Input
                    id="nid"
                    {...register('nid')}
                    placeholder="10 / 13 Digit Number"
                />
                {errors.nid && <p className="text-sm text-red-500">{errors.nid.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="name">Voter Name <span className="text-red-500">*</span></Label>
                <Input
                    id="name"
                    {...register('name')}
                    placeholder="e.g., Monir Hossain"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <Button type="submit" className="w-full">
                {
                    !isSubmitting &&
                    (isCreateForm ? "Add Voter" : "Update Voter")
                }
                {
                    isSubmitting &&
                    <Loader2 />
                }
            </Button>
        </form>
    )
}
