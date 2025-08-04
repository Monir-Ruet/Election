import { z } from "zod";

export const electionCreateSchema = z.object({
    name: z.string().min(3, "Election name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    startDate: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: "Invalid start date" }
    ),
    endDate: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: "Invalid end date" }
    ),
    active: z.boolean()
}).superRefine(({ startDate, endDate }, ctx) => {
    if (new Date(endDate) <= new Date(startDate)) {
        ctx.addIssue({
            code: "custom",
            path: ["hello"],
            message: "End date must be after start date",
        });
    }
});;

export type ElectionCreateForm = z.infer<typeof electionCreateSchema>;