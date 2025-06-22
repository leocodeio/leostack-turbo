import { signupPayloadSchema } from "~/server/services/auth/auth-client";
import { signinPayloadSchema } from "~/server/services/auth/auth-client";
import { z } from "zod";

export type User = {
  id: string;
  email: string;
  role: string;
};

export type SignupPayload = z.infer<typeof signupPayloadSchema>;
export type SigninPayload = z.infer<typeof signinPayloadSchema>;
