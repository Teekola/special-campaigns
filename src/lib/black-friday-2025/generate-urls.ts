import { env } from "@/env";

export function generateUrls(orderReference: string) {
   const bonusActivationUrl = `${env.NEXT_PUBLIC_WEBSITE_URL}/aktivoi/${orderReference}/itse`;
   const friendGiftUrl = `${env.NEXT_PUBLIC_WEBSITE_URL}/aktivoi/${orderReference}/lahja`;
   return { bonusActivationUrl, friendGiftUrl };
}
