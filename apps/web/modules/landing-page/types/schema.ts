import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/modules/landing-page/utils';
import { z } from 'zod';

const languageSchema = z.object({
  name: z.string(),
  value: z.string().optional(),
});

export const landingFormSchema = z
  .object({
    avatar: z
      .any()
      .refine((files) => {
        return files?.name;
      }, 'Image is required.')
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.'
      ),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      }),
    description: z.coerce.string(),
    language: languageSchema.nullable().optional(),
  })
  .superRefine(({}, ctx) => {
    return null;
  });

export type LandingFormSchema = z.infer<typeof landingFormSchema>;
