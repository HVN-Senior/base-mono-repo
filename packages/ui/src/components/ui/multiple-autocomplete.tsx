'use client';

import { useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { CustomShow, HStack, VStack } from '@ui/components/custom';
import { CommandGroup, CommandInput, CommandInputProps, CommandItem, CommandList } from '@ui/components/ui/command';
import usePopover from '@ui/hooks/use-popover';
import { cn } from '@ui/lib/utils';
import { FCC } from '@ui/types';
import { Command as CommandPrimitive } from 'cmdk';
import { Check, CheckCircle, PlusIcon, X } from 'lucide-react';

import { Chip } from './chip';
import { Skeleton } from './skeleton';

type Option = {
  value: string;
  label: string;
};

interface Props extends CommandInputProps {
  values?: string[];
  onInputChange?: (val: string) => void;
  onChange?: (val: string[]) => void;
  onEnter?: (val: string[]) => void;
  label?: any;
  isLoading?: boolean;
  options?: Option[];
}

const MultipleAutoComplete: FCC<Props> = ({
  onEnter,
  options = [],
  isLoading,
  onChange,
  label,
  values,
  onInputChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState<string[]>(values ?? []);

  const [isOpen, floatingStyles, refs, { open, close }] = usePopover();

  const appendValue = useCallback(
    (val: string) => {
      if (selected.includes(val)) {
        setInputValue('');
        return selected;
      }
      const newSelected = [...selected, val];
      setSelected(newSelected);
      onChange?.(newSelected);
      setInputValue('');
      return newSelected;
    },
    [onChange, selected]
  );

  const removeValue = useCallback(
    (val: string) => {
      const newSelected = selected.filter((x) => x !== val);
      setSelected(newSelected);
      onChange?.(newSelected);
      return newSelected;
    },
    [onChange, selected]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        open();
      }

      // This is not a default behavior of the <input /> field
      if (event.key === 'Enter' && input.value !== '') {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const updateValues = appendValue(input.value);
        onEnter?.(updateValues);
      }

      if (event.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, open, appendValue, onEnter]
  );

  const handleChange = (val: string) => {
    onInputChange?.(val);
    setInputValue(val);
  };

  const hasValues = selected.length !== 0;

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div className="mx-auto">
        <div
          ref={refs.setReference}
          className={cn(
            'border-input hover:border-main ring-offset-background peer relative flex flex-wrap items-center gap-2 rounded-sm border bg-transparent px-3 text-sm placeholder:font-light',
            hasValues ? 'min-h-14 py-3' : 'h-14'
          )}
        >
          {hasValues && <label className="text-sub-1 -mt-4 mr-2 text-sm">{label}</label>}

          {selected.map((x, i) => (
            <Chip key={i}>
              {x}
              <X onClick={() => removeValue(x)} className="text-main-30 hover:text-main ml-2 h-3 w-3 cursor-pointer" />
            </Chip>
          ))}

          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={handleChange}
            onBlur={close}
            onFocus={open}
            icon
            className="w-0 min-w-[30px] flex-1"
            wrapperClassName="border-none px-0 h-8 flex-1"
            placeholder={selected.length === 0 ? label : 'Add more...'}
            {...props}
          />
        </div>
      </div>
      <div className="relative mt-1">
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={cn(
            'bg-popover shadow-popover z-50 min-h-[40px] w-full rounded-sm outline-none',
            isOpen ? 'visible' : 'invisible'
          )}
        >
          <CommandList>
            {isLoading ? (
              <CommandPrimitive.Loading>
                <VStack spacing={4} className="p-1">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </VStack>
              </CommandPrimitive.Loading>
            ) : null}

            <CommandGroup>
              {(isLoading ? [] : options).map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    onSelect={() => (isSelected ? removeValue(option.value) : appendValue(option.value))}
                    className={cn('flex w-full items-center gap-2', !isSelected ? 'pl-8' : null)}
                  >
                    {isSelected ? <Check className="w-4" /> : null}
                    {option.label}
                  </CommandItem>
                );
              })}

              <CustomShow when={!options.find((x) => x.value === inputValue) && !!inputValue}>
                <CommandItem
                  value={inputValue}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onSelect={() => appendValue(inputValue)}
                  className={cn('flex w-full items-center gap-2')}
                >
                  {selected.includes(inputValue) ? (
                    <CheckCircle className="text-success h-4 w-4" />
                  ) : (
                    <PlusIcon className="text-success h-4 w-4" />
                  )}
                  <HStack className="text-success">Suggest &quot;{inputValue}&quot;</HStack>
                </CommandItem>
              </CustomShow>
            </CommandGroup>
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};

export { MultipleAutoComplete };
