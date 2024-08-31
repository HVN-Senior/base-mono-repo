import { ReactNode } from 'react';
import { CustomShow } from '@ui/components/custom/components';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  selectTriggerVariants,
  SelectValue,
} from '@ui/components/ui/select';
import { cn } from '@ui/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

interface IData {
  label: string;
  value: string;
  image?: string;
  group?: string;
}

interface Props<T extends FieldValues = FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectTriggerVariants> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  labelClassName?: string;
  data: IData[];
}

const SelectFormField = <T extends FieldValues>({
  name,
  defaultValue,
  control,
  label,
  required,
  data,
  variant,
  inputSize,
  fullWidth,
  className,
  labelClassName,
  placeholder = 'Please select',
  ...props
}: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className={cn('relative', fullWidth ? 'w-full' : '')}>
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value} disabled={props.disabled}>
                <FormControl>
                  <div>
                    <CustomShow when={!!label}>
                      <FormLabel className={labelClassName}>
                        {label} {required && <span className="text-error-light">*</span>}
                      </FormLabel>
                    </CustomShow>
                    <SelectTrigger
                      variant={variant}
                      inputSize={inputSize}
                      className={cn(className, { 'w-full': fullWidth })}
                    >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </div>
                </FormControl>

                <SelectContent>
                  {data.map((x) => (
                    <SelectItem key={x.value} value={x.value}>
                      {x.image ? (
                        <div className="flex items-center space-x-2">
                          {x.image && <img src={x.image!} alt="" className="h-6 w-6" />}
                          <p>{x.label}</p>
                        </div>
                      ) : (
                        x.label
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="mt-1 text-xs" />
            </FormItem>
          </div>
        );
      }}
    />
  );
};

export { SelectFormField };
