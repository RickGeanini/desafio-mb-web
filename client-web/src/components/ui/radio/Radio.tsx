import { type InputHTMLAttributes } from 'react';

// UI RADIO PROPS
interface IUiRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label: string;
}

// UI RADIO
export const UiRadio = ({ label, ...restProps }: IUiRadioProps) => {
	/* Render */
	return (
		<div className="flex items-center">
			<input
				checked={restProps.checked}
				id={restProps.id}
				type="radio"
				value={restProps.value}
				name="person_type"
				className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:primary dark:focus:primary dark:primary focus:ring-2 dark:bg-primary dark:border-primary"
				onChange={restProps.onChange}
			/>
			<label htmlFor={restProps.id} className="ms-2 text-sm font-medium">
				{label}
			</label>
		</div>
	);
};
