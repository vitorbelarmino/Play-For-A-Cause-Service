import { z } from 'zod';

export const userSchema = z.object({
  name: z.string({ required_error: 'The "name" field is required.' }),
  email: z
    .string({ required_error: 'The "email" field is required.' })
    .email('The "email" field must be a valid email address.'),
  password: z
    .string({ required_error: 'The "password" field is required.' })
    .min(3, 'The "password" field must be at least 3 characters long.'),
});
