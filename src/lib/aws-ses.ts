import {
   SESClient,
   SendEmailCommand,
   type SendEmailCommandInput,
} from "@aws-sdk/client-ses";

import { env } from "@/env";

const sesClient = new SESClient({
   region: env.AWS_SES_REGION,
   credentials: {
      accessKeyId: env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SES_SECRET_ACCESS_KEY,
   },
});

export async function sendEmail({
   to,
   subject,
   text,
   html,
}: {
   to: string;
   subject: string;
   text: string;
   html?: string;
}) {
   const params: SendEmailCommandInput = {
      Destination: {
         ToAddresses: [to],
      },
      Message: {
         Body: {
            Text: { Data: text, Charset: "UTF-8" },
            ...(html && { Html: { Data: html, Charset: "UTF-8" } }),
         },
         Subject: { Data: subject, Charset: "UTF-8" },
      },
      Source: env.AWS_SES_FROM_EMAIL,
   };

   const command = new SendEmailCommand(params);

   const data = await sesClient.send(command);
   return data;
}
