"use client";

import { useCallback, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormSelect } from "@/ui/form";
import { SelectItem } from "../ui/select";
import { FieldGroup, FieldLegend, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { courseOptions } from "@/lib/black-friday-2025/courses";
import { activateCourse } from "@/actions/activate-course";
import { updateActivation } from "@/actions/update-activation-status";
import { useParams, useRouter } from "next/navigation";
import { ActivationStatus, ActivationType } from "@/generated/prisma";
import { Spinner } from "../ui/spinner";
import { checkEmailForActivation } from "@/actions/check-email-for-activation";
import { BLACK_FRIDAY_GIFT_CLAIMED_PAGE } from "@/lib/black-friday-2025/config";

const schema = z.object({
   courseName: z.string().min(1, "Valitse kurssi."),
   email: z.email("Syötä toimiva sähköpostiosoite."),
   name: z.string("Syötä nimesi."),
});
type ActivateGiftFormValues = z.infer<typeof schema>;

export function ActivateGiftForm() {
   const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
         courseName: "",
         email: "",
         name: "",
      },
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
   const { orderReference } = useParams<{ orderReference: string }>();

   const onSubmit = useCallback(
      async (
         values: ActivateGiftFormValues,
         form: UseFormReturn<ActivateGiftFormValues>
      ) => {
         try {
            setIsSubmitting(true);
            // Check if activation is possible
            const checkEmailResult = await checkEmailForActivation({
               orderReference,
               email: values.email,
            });
            if (checkEmailResult?.error) {
               throw new Error(checkEmailResult.error);
            }
            const activationResult = await activateCourse(values);
            if (activationResult?.error) {
               throw new Error(activationResult.error);
            }
            const updateResult = await updateActivation({
               orderReference,
               type: ActivationType.GIFT,
               status: ActivationStatus.COMPLETED,
               ...values,
            });
            if (updateResult?.error) {
               throw new Error(updateResult.error);
            }
            router.push(BLACK_FRIDAY_GIFT_CLAIMED_PAGE);
         } catch (error) {
            setIsSubmitting(false);
            if (error instanceof Error) {
               if (error.message.includes("Et voi")) {
                  form.setError("email", { message: error.message });
                  return;
               }
               form.setError("courseName", { message: error.message });
               return;
            }
            form.setError("courseName", {
               message: "Tapahtui tuntematon virhe.",
            });
         }
      },
      [orderReference, router]
   );
   return (
      <form
         onSubmit={form.handleSubmit((values) => onSubmit(values, form))}
         className="space-y-6"
      >
         <h1 className="text-xl">Tervetuloa HyvinvointiHeimon sivuille!</h1>

         <p className="text-base text-muted-foreground">
            Taisit saada tämän linkin kaveriltasi? Hienoa, sillä hän tilasi
            HyvinvointiHeimon Black Friday 2025 -tarjouksen, johon sisältyy yksi
            ilmainen verkkokurssi kaverille jaettavaksi. Onneksi olkoon,
            kaverisi on päättänyt antaa ilmaisen verkkokurssin sinulle 😊
         </p>

         <FieldSet>
            <FieldLegend className="">Toimi näin:</FieldLegend>

            <ol className="list-decimal list-inside text-muted-foreground">
               <li>
                  Syötä nimi ja sähköpostiosoite, valitse kurssi ja klikkaa
                  Aktivoi-nappia.
               </li>
               <li>Aktivoimme verkkokurssin sähköpostiosoitteellesi.</li>
               <li>
                  Saat sähköpostiisi käyttäjätunnuksen ja kirjautumisohjeet.
               </li>
            </ol>

            <FieldGroup>
               <FormInput control={form.control} name="name" label="Nimi" />
               <FormInput
                  control={form.control}
                  name="email"
                  label="Sähköpostiosoite"
               />
               <FormSelect
                  control={form.control}
                  name="courseName"
                  label="Kurssi"
                  placeholder="Valitse kurssi..."
                  disabled={isSubmitting}
               >
                  {Object.keys(courseOptions).map((option) => (
                     <SelectItem key={option} value={option}>
                        {option}
                     </SelectItem>
                  ))}
               </FormSelect>
            </FieldGroup>
         </FieldSet>

         <Button
            size="lg"
            className="w-full"
            disabled={isSubmitting}
            data-disabled={!form.formState.isValid}
         >
            {isSubmitting && <Spinner />}
            {isSubmitting ? "Aktivoidaan" : "Aktivoi"}
         </Button>
      </form>
   );
}
