"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { IElection } from "@/app/dashboard/election/_types/election"
import { CandidateCreateForm, candidateCreateSchema } from "@/schemas/candidates/candidate-create-schema"
import { Loader2 } from "lucide-react"

export function CandidateForm({ election }: { election: IElection }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CandidateCreateForm>({
    resolver: zodResolver(candidateCreateSchema),
    defaultValues: {
      electionId: `${election.id}`,
    },
  });

  const onSubmit = async (data: CandidateCreateForm) => {
    const promise = async () => {
      const electionPayload = { name: data.name };
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Example API call:
      // await axios.post<Result<unknown>>("/api/elections", JSON.stringify(electionPayload), {
      //   headers: { "Content-Type": "application/json" },
      // });

      return { message: "Candidate added successfully!" };
    };
    try {
      await promise();
      toast.success("Candidate added successfully!")
      reset();
    }
    catch {
      toast.error("Failed to add candidate. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">
          Candidate Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="e.g., Monir Hossain"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Add Candidate"}
      </Button>
    </form>
  );
}
