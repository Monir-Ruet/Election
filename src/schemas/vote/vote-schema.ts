import { z } from 'zod'

export const voteSchema = z.object({
    nid: z.string().regex(/^(\d{10}|\d{13})$/, "NID must be 10 or 13 digits"),
    electionId: z.string().min(1, "Election ID must be a positive integer"),
    candidateId: z.string().min(1, "Candidate ID must be a positive integer"),
});

export type VoteForm = z.infer<typeof voteSchema>;