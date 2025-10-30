import { ReactNode } from "react";

import {
   Field,
   FieldContent,
   FieldDescription,
   FieldError,
   FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Controller,
   ControllerProps,
   FieldPath,
   FieldValues,
} from "react-hook-form";

type FormControlProps<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
   TTransformedValues = TFieldValues
> = {
   name: TName;
   label: ReactNode;
   disabled?: boolean;
   description?: ReactNode;
   control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};

type FormBaseProps<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
   TTransformedValues = TFieldValues
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
   horizontal?: boolean;
   controlFirst?: boolean;

   children: (
      field: Parameters<
         ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
      >[number]["field"] & {
         "aria-invalid": boolean;
         id: string;
      }
   ) => ReactNode;
};

type FormControlFunc<
   ExtraProps extends Record<string, unknown> = Record<never, never>
> = <
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
   TTransformedValues = TFieldValues
>(
   props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps
) => ReactNode;

function FormBase<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
   TTransformedValues = TFieldValues
>({
   children,
   control,
   label,
   disabled,
   name,
   description,
   controlFirst,
   horizontal,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field, fieldState }) => {
            const labelElement = (
               <>
                  <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                  {description && (
                     <FieldDescription>{description}</FieldDescription>
                  )}
               </>
            );
            const control = children({
               ...field,
               disabled,
               id: field.name,
               "aria-invalid": fieldState.invalid,
            });
            const errorElem = fieldState.invalid && (
               <FieldError errors={[fieldState.error]} />
            );

            return (
               <Field
                  data-invalid={fieldState.invalid}
                  orientation={horizontal ? "horizontal" : undefined}
               >
                  {controlFirst ? (
                     <>
                        {control}
                        <FieldContent>
                           {labelElement}
                           {errorElem}
                        </FieldContent>
                     </>
                  ) : (
                     <>
                        <FieldContent>{labelElement}</FieldContent>
                        {control}
                        {errorElem}
                     </>
                  )}
               </Field>
            );
         }}
      />
   );
}

export const FormInput: FormControlFunc<{ placeholder?: string }> = ({
   placeholder,
   ...props
}) => {
   return (
      <FormBase {...props}>
         {(field) => <Input {...field} placeholder={placeholder} />}
      </FormBase>
   );
};

export const FormSelect: FormControlFunc<{ children: ReactNode }> = ({
   children,
   ...props
}) => {
   return (
      <FormBase {...props}>
         {({ onChange, onBlur, ...field }) => (
            <Select {...field} onValueChange={onChange}>
               <SelectTrigger
                  aria-invalid={field["aria-invalid"]}
                  id={field.id}
                  onBlur={onBlur}
               >
                  <SelectValue />
               </SelectTrigger>
               <SelectContent>{children}</SelectContent>
            </Select>
         )}
      </FormBase>
   );
};
