'use client';

import { forwardRef, ReactNode, useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/components/ui/command';
import { Input, InputProps } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/components/ui/popover';
import { cn } from '@ui/lib/utils';
import { ArrowDown, Check } from 'lucide-react';

interface IData {
  label: string;
  value: string;
  image?: string;
  group?: string;
}

interface CustomSelectSearchProps extends InputProps {
  onValueChange?: (value: string) => void;
  data: IData[];
  label?: ReactNode;
}

export const CustomSelectSearch = forwardRef<HTMLInputElement, CustomSelectSearchProps>(
  ({ className, value, size, label, placeholder = 'Please select', data = [], onValueChange, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Label className="mb-1.5 block">{label}</Label>
            <Input
              onChange={() => null}
              value={value}
              size={size}
              placeholder={placeholder}
              {...props}
              className={cn(className)}
              ref={ref}
              suffix={<ArrowDown />}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[var(--radix-popper-anchor-width)]">
          <Command>
            <CommandInput placeholder="Search by keyword..." />
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              <CommandList className="max-h-[300px] overflow-auto">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((x) => (
                    <CommandItem
                      onSelect={() => {
                        onValueChange?.(x.value);
                        setOpen(false);
                      }}
                      key={x.value}
                    >
                      <Check className={cn('mr-2 h-4 w-4', value === x.value ? 'opacity-100' : 'opacity-0')} />
                      <div className="flex items-center space-x-2">
                        {x?.image && <img src={x.image} alt="" className="h-6 w-6" />}
                        <p>{x.label}</p>
                      </div>
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No data available.</CommandEmpty>
                )}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
