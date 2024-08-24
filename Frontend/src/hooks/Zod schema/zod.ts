import { z } from 'zod';

export const signupSchema = z
  .object({
    fullname: z.string().min(1, 'Full name is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPass: z.string().min(1, 'Confirm password is required'),
    gender: z.enum(['male', 'female', 'other']),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'Passwords do not match',
    path: ['confirmPass'],
  });
