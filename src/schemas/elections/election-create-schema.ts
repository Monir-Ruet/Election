import { number, z } from "zod";

export const electionCreateSchema = z.object({
    id: number().int().optional(),
    name: z.string().min(3, "Election name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    startTime: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: "Invalid start date" }
    ),
    endTime: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: "Invalid end date" }
    ),
}).superRefine(({ startTime, endTime }, ctx) => {
    if (new Date(endTime) <= new Date(startTime)) {
        ctx.addIssue({
            code: "custom",
            path: ["endTime"],
            message: "End date must be after start date",
        });
    }
})

export type ElectionCreateForm = z.infer<typeof electionCreateSchema>;