export const courseOptions: Record<string, string> = {
   "Vapauta Hermostosi":
      "https://checkout.kajabi.com/webhooks/offers/7j93dqFfh2Uk3j2P/2148721682/activate",
   "Rauhoita Hermostosi":
      "https://checkout.kajabi.com/webhooks/offers/sfUA2oUtzieEBuxv/2148907957/activate",
   LonkkaRemontti:
      "https://checkout.kajabi.com/webhooks/offers/UBWRRsQdiQW3NW5o/2149020313/activate",
   HartiaRemontti:
      "https://checkout.kajabi.com/webhooks/offers/SVz3uTBmkhegb6Ck/2149020295/activate",
   RyhtiRemontti:
      "https://checkout.kajabi.com/webhooks/offers/KN25qwQgZ9zHqG8i/2149020327/activate",
   "Keskivartalo Kuntoon":
      "https://checkout.kajabi.com/webhooks/offers/mZFXHZPoB2XmvRZ5/2149020358/activate",
   "Niska-Hartian Ensiapupakkaus":
      "https://checkout.kajabi.com/webhooks/offers/99pDdeTnoFbJArso/2149020370/activate",
   "Alaselän Ensiapupakkaus":
      "https://checkout.kajabi.com/webhooks/offers/qAUp5hLmHmBoLgDn/2149020375/activate",
   "Olkapään Ensiapupakkaus":
      "https://checkout.kajabi.com/webhooks/offers/bzhzpM5E6w5TjF2D/2149084137/activate",
   OlkapääRemontti:
      "https://checkout.kajabi.com/webhooks/offers/hmw26SuTkAfRA3RC/2149164278/activate",
   "Vapauta Hermostosi -jatkokurssi":
      "https://checkout.kajabi.com/webhooks/offers/dAvW7Pg3kdYXXSmz/2149380606/activate",
   "Vapauta Kallonpohja":
      "https://checkout.kajabi.com/webhooks/offers/XtHuE3HVoco7KxbB/2149621749/activate",
   Vahvaniska:
      "https://checkout.kajabi.com/webhooks/offers/fggagJiYc73TtAsc/2149621745/activate",
   "E-kirjakokoelma":
      "https://checkout.kajabi.com/webhooks/offers/jmjPqVfYiafqNVbD/2149764470/activate",
   RankaRemontti:
      "https://checkout.kajabi.com/webhooks/offers/p4dWLpEDF4nmG2m7/2150116216/activate",
   "Vapauta Faskiasi":
      "https://checkout.kajabi.com/webhooks/offers/V55wBkzkQfS76BHq/2150227327/activate",
   "Plantaarifaskiitti Kotona Kuntoon":
      "https://checkout.kajabi.com/webhooks/offers/kosMrB2eWntQV5FH/2150479008/activate",
   "Nuku Paremmin":
      "https://checkout.kajabi.com/webhooks/offers/Z25Le4dF7LF6d2rD/2149120227/activate",
   "Niskat Kuriin":
      "https://checkout.kajabi.com/webhooks/offers/VZEzpD6SJbeN8PQn/2149119885/activate",
   "Putkirullaus & Itsehieronta":
      "https://checkout.kajabi.com/webhooks/offers/deXYo4Nc4FaJLp96/2149119502/activate",
   "Kehon Korjaussarja":
      "https://checkout.kajabi.com/webhooks/offers/gZupMFooXg9rnS5v/2149151630/activate",
   "Juoksijan Kehonhuolto":
      "https://checkout.kajabi.com/webhooks/offers/eiT24UoL5HfVJfjm/2149153867/activate",
   "Kotitreenit Niska-Hartialle":
      "https://checkout.kajabi.com/webhooks/offers/34YgM5BQ2N7d2yLF/2149167378/activate",
   "Istumatyöläisen Taukojumpat":
      "https://checkout.kajabi.com/webhooks/offers/zZ2UvBeYr7aJrhww/2149120136/activate",
};

export function getWebhookUrl(courseName: string) {
   const webhookUrl = courseOptions[courseName];

   if (!webhookUrl) {
      throw new Error("Kurssia ei löydy.");
   }

   return webhookUrl;
}
