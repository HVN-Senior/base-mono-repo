'use client';

import { useRef } from 'react';
import { Avatar } from '@ui/components/ui/avatar';
import { FormControl, FormField, FormItem, FormMessage } from '@ui/components/ui/form';
import { cn } from '@ui/lib/utils';
import { Camera } from 'lucide-react';
import { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues = FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'accept'> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  fallbackUrl: string;
  accept?: string[];
}

const AvatarFormField = <T extends FieldValues>({
  accept = [],
  control,
  name,
  defaultValue,
  className,
  fallbackUrl,
  ...props
}: Props<T>) => {
  const ref = useRef<React.ElementRef<'input'>>(null);

  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const img = value ? (typeof value === 'string' ? value : URL.createObjectURL(value)) : fallbackUrl;

        return (
          <FormItem>
            <div className="relative w-fit">
              <Avatar src={img} className={cn('border-neutral-10 border-3 h-40 w-40', className)} />
              <button
                type="button"
                className="border-neutral-10 bg-neutral-0 absolute bottom-0 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2"
                onClick={() => ref.current?.click()}
              >
                <Camera />
              </button>
            </div>
            <FormControl>
              <input
                hidden
                accept={accept.length === 0 ? undefined : accept.join(', ')}
                type="file"
                onChange={(e) => onChange(e.target.files?.[0])}
                {...props}
                ref={ref}
              />
            </FormControl>

            <FormMessage className="mt-1 text-xs" />
          </FormItem>
        );
      }}
    />
  );
};

export { AvatarFormField };
