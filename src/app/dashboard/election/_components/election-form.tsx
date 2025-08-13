"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ElectionFormSchema, electionSchema } from "@/schemas/elections/election-schema"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { IElection } from "../_types/election"
import { CreateElection, UpdateElection } from "@/services/election-service"
import { Loader2 } from "lucide-react"

export function ElectionForm({ election }: { election: IElection | undefined }) {
  const isCreateForm = !election;
  const id = election?.id
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ElectionFormSchema>({
    resolver: zodResolver(electionSchema),
    defaultValues: {
      id: id ?? 0,
      name: election?.name ?? "",
      description: election?.description ?? "",
      startTime: election?.startTime
        ? new Date(election.startTime).toDateString()
        : "",
      endTime: election?.endTime
        ? new Date(election.endTime).toDateString()
        : "",
    },
  });

  const onSubmit = async (data: ElectionFormSchema) => {
    const electionData = {
      name: data.name,
      description: data.description,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      id: data.id ?? 0
    }
    let isSuccess = false;
    if (isCreateForm) {
      isSuccess = await CreateElection(electionData);
    } else {
      isSuccess = await UpdateElection(electionData);
    }

    if (isSuccess) {

      if (isCreateForm)
        toast.success("Election created successfully");
      else
        toast.success("Election updated successfully")
      reset();
    } else {
      if (isCreateForm)
        toast.error("Failed to create election");
      else
        toast.error("Failed to update election")
    }
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
          <Label htmlFor="startTime">Start Date & Time <span className="text-red-500">*</span></Label>
          <Input
            id="startTime"
            type="datetime-local"
            {...register('startTime')}
          />
          {errors.startTime && <p className="text-sm text-red-500">{errors.startTime.message}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="endTime">End Date & Time <span className="text-red-500">*</span></Label>
          <Input
            id="endTime"
            type="datetime-local"
            {...register('endTime')}
          />
          {errors.endTime && <p className="text-sm text-red-500">{errors.endTime.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full">
        {
          !isSubmitting &&
          (isCreateForm ? "Create Election" : "Update Election")
        }
        {
          isSubmitting &&
          <Loader2 className="animate-spin" />
        }
      </Button>
    </form>
  )
}
