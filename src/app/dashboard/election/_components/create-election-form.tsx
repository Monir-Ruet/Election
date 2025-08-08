"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ElectionCreateForm, electionCreateSchema } from "@/schemas/elections/election-create-schema"
import axios from "axios";
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { Result } from "@/lib/result"
import { ElectionData } from "../_types/election"

export function ElectionForm({ election }: { election: ElectionData | undefined }) {
  const isCreateForm = !election;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ElectionCreateForm>({
    resolver: zodResolver(electionCreateSchema),
    defaultValues: {
      id: election?.id ?? 0,
      name: election?.name ?? "",
      description: election?.description ?? "",
      startDate: election?.startDate
        ? new Date(election.startDate).toISOString().slice(0, 16)
        : "",
      endDate: election?.endDate
        ? new Date(election.endDate).toISOString().slice(0, 16)
        : "",
    },
  });

  const onSubmit = async (data: ElectionCreateForm) => {
    console.log(data)
    const promise = () => new Promise<Result<unknown>>(async (resolve, reject) => {
      try {
        const election = {
          name: data.name,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
        };
        const response = await axios.post<Result<unknown>>("/api/elections", JSON.stringify(election), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: 'Loading...',
      success: (data) => {
        reset();
        return `${data?.message || "Election created successfully!"}`;
      },
      error: 'Failed to create election. Please try again.',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Election Title <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="e.g., Student Council President 2024"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Describe the purpose and context of this election..."
          rows={4}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>
      <div className="flex items-start gap-2 justify-between">
        <div className="flex flex-col gap-3">
          <Label htmlFor="startDate">Start Date & Time <span className="text-red-500">*</span></Label>
          <Input
            id="startDate"
            type="datetime-local"
            {...register('startDate')}
          />
          {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="endDate">End Date & Time <span className="text-red-500">*</span></Label>
          <Input
            id="endDate"
            type="datetime-local"
            {...register('endDate')}
          />
          {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full">
        {
          !isSubmitting &&
          (isCreateForm ? "Create Election" : "Update Election")
        }
        {
          isSubmitting &&
          (!isCreateForm ? "Creating..." : "Updating...")
        }
      </Button>
    </form>
  )
}
