import { z } from "zod";

export const voterSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    nid: z.string().regex(/^(\d{10}|\d{13})$/, "NID must be 10 or 13 digits"),
    image: z.string().optional()
});

export type VoterForm = z.infer<typeof voterSchema>;