import { z } from "zod";

export const candidateCreateSchema = z.object({
    name: z.string().min(3, "Candidate name must be at least 3 characters"),
    electionId: z.string().min(1, "Election ID must be a positive integer"),
    image: z.string().optional(),
    active: z.boolean().optional()
});

export type CandidateCreateForm = z.infer<typeof candidateCreateSchema>;