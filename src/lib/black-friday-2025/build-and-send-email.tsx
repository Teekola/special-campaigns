import BlackFridayInstructionsEmail from "@/emails/BlackFridayInstructionsEmail";
import { sendEmail } from "@/lib/aws-ses";

import {
   BLACK_FRIDAY_EMAIL_SUBJECT,
   COMPANY_NAME,
} from "@/lib/black-friday-2025/config";
import { ApiError } from "@/lib/error";
import { dateTimeFormatter } from "@/lib/formatters";
import { render, toPlainText } from "@react-email/components";
import { generateUrls } from "./generate-urls";

export async function buildAndSendEmail({
   firstName,
   email,
   orderReference,
   offerEndDate,
}: {
   firstName: string;
   email: string;
   orderReference: string;
   offerEndDate: Date;
}) {
   // Generate URLs
   const { bonusActivationUrl, friendGiftUrl } = generateUrls(orderReference);
   const emailHtml = await render(
      <BlackFridayInstructionsEmail
         customerName={firstName}
         companyName={COMPANY_NAME}
         bonusActivationUrl={bonusActivationUrl}
         friendGiftUrl={friendGiftUrl}
         offerEndDate={dateTimeFormatter.format(offerEndDate)}
      />
   );
   const emailText = toPlainText(emailHtml);

   try {
      await sendEmail({
         to: email,
         subject: BLACK_FRIDAY_EMAIL_SUBJECT,
         text: emailText,
         html: emailHtml,
      });
   } catch (error) {
      console.error("Could not send email.", error);
      throw new ApiError({
         name: "INTERNAL_SERVER_ERROR",
         message: "Could not send email.",
         status: 500,
         cause: error,
      });
   }
}
