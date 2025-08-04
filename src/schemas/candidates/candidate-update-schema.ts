import { z } from "zod";

export const candidateUpdateSchema = z.object({
    name: z.string().min(3, "Candidate name must be at least 3 characters"),
    electionId: z.string().min(1, "Election ID must be a positive integer"),
    candidateId: z.string().min(1, "Candidate ID must be a positive integer"),
    image: z.string(),
    active: z.boolean()
});

export type CandidateCreateForm = z.infer<typeof candidateUpdateSchema>;