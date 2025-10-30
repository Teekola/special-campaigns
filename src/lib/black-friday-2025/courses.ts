export const courseOptions: Record<string, string> = {
   "Niska Hartian Ensiapupakkaus":
      "https://checkout.kajabi.com/webhooks/offers/99pDdeTnoFbJArso/2149020370/activate",
};

export function getWebhookUrl(courseName: string) {
   const webhookUrl = courseOptions[courseName];

   if (!webhookUrl) {
      throw new Error("Kurssia ei löydy.");
   }

   return webhookUrl;
}
