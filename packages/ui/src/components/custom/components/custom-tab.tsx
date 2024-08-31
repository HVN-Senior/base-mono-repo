'use client';

import { useId } from 'react';
import { ScrollArea } from '@ui/components/ui/scroll-area';
import { cn } from '@ui/lib/utils';
import { IOption } from '@ui/types';
import { motion } from 'framer-motion';

interface Props<T extends string | number> {
  data: IOption<T>[];
  onChange: (value: T) => void;
  value: T;
  className?: string;
  extras?: any;
}

export const CustomTab = <T extends string | number>({ data, extras, className, onChange, value }: Props<T>) => {
  const id = useId();
  return (
    <div className={className}>
      <div className="border-b">
        <ScrollArea barClassName="h-1.5" orientation="horizontal">
          <ul className="-mb-0.5 flex min-h-[60px]">
            {data.map((tab, i) => (
              <li
                onClick={() => onChange(tab.value)}
                className={cn(
                  'text-neutral-30 relative mt-auto h-12 cursor-pointer whitespace-nowrap px-4 py-3 text-center text-sm md:text-base',
                  {
                    'text-main': value === tab.value,
                  }
                )}
                key={i}
              >
                {tab.name}
                {value === tab.value ? (
                  <motion.div
                    layoutId={id}
                    className="bg-main absolute bottom-0 left-0 z-10 h-[5px] w-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                ) : null}
              </li>
            ))}

            {extras && <li className="ml-auto flex items-center justify-end">{extras}</li>}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
};
