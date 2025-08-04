import { z } from "zod";

export const voterRegisterSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    nid: z.string().regex(/^(\d{10}|\d{13})$/, "NID must be 10 or 13 digits"),
    image: z.string()
});

export type VoterRegisterForm = z.infer<typeof voterRegisterSchema>;