import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';

const Wrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'p-4 mx-auto max-w-sm md:max-w-xl lg:max-w-3xl 2xl:max-w-5xl gap-y-5',
                className,
            )}
            {...props}
        />
    ),
);
Wrapper.displayName = 'Wrapper';

export { Wrapper };
