import * as z from "zod";

const minLength = 3;
const maxLength = 30;

const commonString = z
  .string()
  .min(minLength, { message: `Minimum ${minLength} characters.` })
  .max(maxLength, { message: `Maximum ${maxLength} characters.` });

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: commonString,
  username: commonString,
  bio: z.string().min(minLength).max(1000),
});
