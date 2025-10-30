import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
   server: {
      DATABASE_URL: z.url(),
      API_KEY: z.string().min(1),
      AWS_SES_REGION: z.string().min(1),
      AWS_SES_ACCESS_KEY_ID: z.string().min(1),
      AWS_SES_SECRET_ACCESS_KEY: z.string().min(1),
      AWS_SES_FROM_EMAIL: z.string().min(1),
   },
   client: {
      NEXT_PUBLIC_WEBSITE_URL: z.url(),
   },
   // For Next.js >= 13.4.4, you only need to destructure client variables:
   experimental__runtimeEnv: {
      NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
   },
});
