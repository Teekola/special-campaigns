"use server";

import { getWebhookUrl } from "@/lib/black-friday-2025/courses";

export async function activateCourse({
   courseName,
   name,
   email,
}: {
   courseName: string;
   name: string;
   email: string;
}): Promise<{ error: string } | undefined> {
   const url = getWebhookUrl(courseName) + "?send_offer_grant_email=true";
   const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         name: name.trim(),
         email,
         external_user_id: email,
      }),
   });

   if (!result.ok) {
      const response = await result.json();
      if (
         JSON.stringify(response).includes(
            "has already been granted to this member"
         )
      ) {
         return { error: "Kurssi on jo aktivoitu." };
      }

      console.error(response);

      return { error: "Kurssin aktivointi epäonnistui." };
   }
}
