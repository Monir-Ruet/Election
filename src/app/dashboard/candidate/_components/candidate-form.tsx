"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { IElection } from "@/app/dashboard/election/_types/election"
import { CandidateCreateForm, candidateCreateSchema } from "@/schemas/candidates/candidate-create-schema"
import { Loader2 } from "lucide-react"
import api from "@/lib/axios"
import { Result } from "@/lib/result"
import { ICandidate } from "../types/candidate"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function CandidateForm({
  election,
  candidate
}: {
  election: IElection,
  candidate?: ICandidate | undefined
}) {
  const [preview, setPreview] = useState<string | null>(null)
  const [active, setActive] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<CandidateCreateForm>({
    resolver: zodResolver(candidateCreateSchema),
    defaultValues: {
      electionId: `${election.id}`,
      name: candidate?.name ?? "",
      image: ""
    },
  });

  const onSubmit = async (data: CandidateCreateForm) => {
    try {
      const candidateInfo = {
        electionId: data.electionId,
        name: data.name,
        active: active
      };

      const response = await api.post<Result<unknown>>("/api/candidates", candidateInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) throw new Error();
      reset();
      setPreview(null);
      toast.success("Candidate added successfully");
    } catch (error) {
      toast.error("Failed to add candidate. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setValue("image", file as any);
      setPreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-3">
        <Label htmlFor="image">
          Candidate Image <span className="text-red-500">*</span>
        </Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Candidate Preview"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}
      </div>

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

      <RadioGroup defaultValue="active" className="flex flex-row" onValueChange={(value) => setActive(value === "active")}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="active" id="active" />
          <Label htmlFor="active">Active</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="inactive" id="inactive" />
          <Label htmlFor="inactive">Inactive</Label>
        </div>
      </RadioGroup>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Add Candidate"}
      </Button>
    </form>
  );
}
