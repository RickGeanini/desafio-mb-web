import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// UTILS
import { cn } from '@utils/utils';

// UI BUTTON UTILS
const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				outline:
					'border border-primary text-primary bg-background hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				default: 'h-10 px-4 py-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface UiButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const UiButton = React.forwardRef<HTMLButtonElement, UiButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);

UiButton.displayName = 'UiButton';

export { UiButton, buttonVariants };
