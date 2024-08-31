import React, { useId } from 'react';
import { FormControl, FormField, FormItem } from '@ui/components/ui/form';
import { Switch } from '@ui/components/ui/switch';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

interface SwitchProps<T extends FieldValues = FieldValues> {
  isChecked?: boolean;
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
}

const SwitchFormField = <T extends FieldValues>({ control, name, ...props }: SwitchProps<T>) => {
  const id = useId();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Switch id={id} checked={field.value} onCheckedChange={field.onChange} {...props} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export { SwitchFormField };
