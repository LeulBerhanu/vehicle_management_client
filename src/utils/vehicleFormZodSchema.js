import { z } from "zod";

export const statuses = [
  "Available",
  "Unavailable",
  "In Service",
  "Out of Service",
];

export const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  status: z.enum(statuses, {
    errorMap: () => ({ message: "Select status." }),
  }),
});
