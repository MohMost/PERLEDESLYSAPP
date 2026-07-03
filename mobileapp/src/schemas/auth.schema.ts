import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Email invalide.'),
  password: z.string().min(6, '6 caractères minimum.'),
  remember: z.boolean(),
});

export const accessCodeSchema = z.object({
  email: z.string().trim().email('Email invalide.'),
  accessCode: z.string().trim().min(8, 'Code trop court.'),
  remember: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Email invalide.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type AccessCodeFormValues = z.infer<typeof accessCodeSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const authValidation = {
  login(values: LoginFormValues) {
    const result = loginSchema.safeParse(values);
    return result.success ? {} : Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]));
  },
  access(values: AccessCodeFormValues) {
    const result = accessCodeSchema.safeParse(values);
    return result.success ? {} : Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]));
  },
};
