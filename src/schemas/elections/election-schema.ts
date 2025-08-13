import { number, z } from "zod";

export const electionSchema = z.object({
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
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start <= now) {
        ctx.addIssue({
            code: "custom",
            path: ["startTime"],
            message: "Start date must be in the future",
        });
    }
    if (end <= start) {
        ctx.addIssue({
            code: "custom",
            path: ["endTime"],
            message: "End date must be after start date",
        });
    }
});

export type ElectionFormSchema = z.infer<typeof electionSchema>;
