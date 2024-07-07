'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@utils/utils';

const labelVariants = cva(
	'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

export interface IUiLabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement>,
		VariantProps<typeof labelVariants> {}

const UiLabel = React.forwardRef<HTMLLabelElement, IUiLabelProps>(
	({ className, ...props }, ref) => (
		<label ref={ref} className={cn(labelVariants(), className)} {...props} />
	),
);
UiLabel.displayName = 'UiLabel';

export { UiLabel };
