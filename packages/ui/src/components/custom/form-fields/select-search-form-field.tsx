import React, { ReactNode } from 'react';
import { CustomSelectSearch } from '@ui/components/custom/components/custom-select-search';
import { FormField, FormItem, FormMessage } from '@ui/components/ui/form';
import { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

interface IData {
  label: string;
  value: string;
  image?: string;
  group?: string;
}

interface Props<T extends FieldValues = FieldValues>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  data: IData[];
  size?: 'sm' | 'default';
}

const SelectSearchFormField = <T extends FieldValues>({
  name,
  defaultValue,
  control,
  data,
  label,
  size,
  ...props
}: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <CustomSelectSearch
              fullWidth={props.fullWidth}
              data={data}
              onValueChange={field.onChange}
              value={field.value}
              disabled={props.disabled}
              label={label}
              size={size}
            />
            <FormMessage className="mt-1 text-xs" />
          </FormItem>
        );
      }}
    />
  );
};

export { SelectSearchFormField };
