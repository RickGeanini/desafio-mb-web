import * as React from 'react';

// UTILS
import { cn } from '@utils/utils';

// UI TEXT FIELD UTILS
export interface IUiTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// UI TEXT FIELD
const UiTextField = React.forwardRef<HTMLInputElement, IUiTextFieldProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);

UiTextField.displayName = 'UiTextField';

export { UiTextField };
