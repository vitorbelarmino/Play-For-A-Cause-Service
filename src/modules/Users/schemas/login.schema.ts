import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'The "email" field is required.' })
    .email('The "email" field must be a valid email address.'),
  password: z
    .string({ required_error: 'The "password" field is required.' })
    .min(3, 'The "password" field must be at least 3 characters long.'),
});

