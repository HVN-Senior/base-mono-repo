import { ReactNode } from 'react';
import { CustomShow } from '@ui/components/custom/components';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/components/ui/form';
import { TextArea, TextAreaProps } from '@ui/components/ui/textarea';
import { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues = FieldValues> extends TextAreaProps {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  required?: boolean;
  labelClassName?: string;
}

const TextAreaFormField = <T extends FieldValues>({
  defaultValue,
  labelClassName,
  control,
  label,
  required,
  ...props
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={props.name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div>
              <CustomShow when={!!label}>
                <FormLabel className={labelClassName}>
                  {label} {required && <span className="text-error-light">*</span>}
                </FormLabel>
              </CustomShow>
              <TextArea {...field} {...props} />
            </div>
          </FormControl>
          <FormMessage className="mt-1 text-xs" />
        </FormItem>
      )}
    />
  );
};

export { TextAreaFormField };
