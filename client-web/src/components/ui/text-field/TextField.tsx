import * as React from 'react';

// UTILS
import { cn } from '@utils/utils';

// UI TEXT FIELD UTILS
export interface IUiTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

// UI TEXT FIELD
const UiTextField = React.forwardRef<HTMLInputElement, IUiTextFieldProps>(
	({ className, error, type, ...props }, ref) => {
		let defaultClasses =
			'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

		if (!!error) {
			defaultClasses = `${defaultClasses} border-yellow-300 rounded-b-none`;
		}

		return (
			<>
				<input type={type} className={cn(defaultClasses, className)} ref={ref} {...props} />
				{!!error && (
					<div className="bg-yellow-300 max-w-full text-black p-1 pl-2 pr-2 rounded-b-sm text-sm">
						{error}
					</div>
				)}
			</>
		);
	},
);

UiTextField.displayName = 'UiTextField';

export { UiTextField };
