import { FormControl, FormField, FormItem, FormMessage } from '@ui/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@ui/components/ui/radio-group';
import { ISelectOption } from '@ui/types';
import { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

interface RadioGroupFormFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  data?: ISelectOption<string>[];
  className?: string;
}

const RadioGroupFormField = <T extends FieldValues>({
  control,
  name,
  data = [],
  className,
  defaultValue,
}: RadioGroupFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="my-3 flex items-center space-x-2">
            <FormControl>
              <RadioGroup
                className={className}
                defaultValue={defaultValue}
                value={field.value}
                onValueChange={field.onChange}
              >
                {data.map(({ label, value }, i) => (
                  <label key={i} className="flex h-14 cursor-pointer items-center space-x-2.5">
                    <RadioGroupItem value={value} />
                    <p>{label}</p>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export { RadioGroupFormField };
