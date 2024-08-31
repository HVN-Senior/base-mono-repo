import React from 'react';
import { CustomShow } from '@ui/components/custom/components';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/components/ui/form';
import { Input, InputProps } from '@ui/components/ui/input';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues = FieldValues> extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
}

const InputFormField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  required,
  ...props
}: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div>
              <CustomShow when={!!label}>
                <FormLabel className={labelClassName}>
                  {label} {required && <span className="text-error-light">*</span>}
                </FormLabel>
              </CustomShow>
              <Input {...field} {...props} className={className} />
              <FormMessage className="mt-1 text-xs" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export { InputFormField };
