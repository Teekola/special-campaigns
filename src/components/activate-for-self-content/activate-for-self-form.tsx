"use client";

import { useCallback, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "@/ui/form";
import { SelectItem } from "../ui/select";
import { FieldDescription, FieldLegend, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { courseOptions } from "@/lib/black-friday-2025/courses";
import { activateCourse } from "@/actions/activate-course";
import { updateActivation } from "@/actions/update-activation-status";
import { useParams, useRouter } from "next/navigation";
import { ActivationStatus, ActivationType } from "@/generated/prisma";
import { Spinner } from "../ui/spinner";

const schema = z.object({
   courseName: z.string().min(1, "Valitse kurssi."),
});
type ActivateForSelfFormValues = z.infer<typeof schema>;

export function ActivateForSelfForm({
   email,
   name,
}: {
   email: string;
   name: string;
}) {
   const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
         courseName: "",
      },
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
   const { orderReference } = useParams<{ orderReference: string }>();

   const onSubmit = useCallback(
      async (
         values: ActivateForSelfFormValues,
         form: UseFormReturn<ActivateForSelfFormValues>
      ) => {
         try {
            setIsSubmitting(true);
            const activationResult = await activateCourse({
               courseName: values.courseName,
               name,
               email,
            });
            if (activationResult?.error) {
               throw new Error(activationResult.error);
            }
            const updateResult = await updateActivation({
               orderReference,
               type: ActivationType.FOR_SELF,
               status: ActivationStatus.COMPLETED,
               course: values.courseName,
            });
            if (updateResult?.error) {
               throw new Error(updateResult.error);
            }
            router.push(`/aktivoi/${orderReference}/itse/valmis`);
         } catch (error) {
            setIsSubmitting(false);
            if (error instanceof Error) {
               form.setError("courseName", { message: error.message });
               return;
            }
            form.setError("courseName", {
               message: "Tapahtui tuntematon virhe.",
            });
         }
      },
      [name, email, orderReference, router]
   );
   return (
      <form
         onSubmit={form.handleSubmit((values) => onSubmit(values, form))}
         className="space-y-6"
      >
         <FieldSet>
            <FieldLegend className="">Aktivoi kurssi</FieldLegend>
            <FieldDescription>
               Valitse, minkä toisen kurssin haluat aktivoida itsellesi ja paina
               sen jälkeen aktivointipainiketta.
            </FieldDescription>
            <FormSelect
               control={form.control}
               name="courseName"
               label="Kurssi"
               disabled={isSubmitting}
            >
               {Object.keys(courseOptions).map((option) => (
                  <SelectItem key={option} value={option}>
                     {option}
                  </SelectItem>
               ))}
            </FormSelect>
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
