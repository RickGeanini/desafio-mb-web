import type { FormikProps } from 'formik';

// COMPONENTS
import { UiRadio } from '@components/ui/radio/Radio';
import { UiTextField } from '@components/ui/text-field/TextField';
import { UiLabel } from '@components/ui/label/Label';

// ENUMS
import { EPersonType, personTypeDescription } from '@enums/registration';

// INTERFACES
import type { IRegisterPayload } from '@interfaces/registration';

// UTILS
import { validateEmail } from '@utils/string';

// REGISTRATION DATA FORM UTILS
interface IRegistrationDataFormProps {
	hideTitle?: boolean;
	formik: FormikProps<IRegisterPayload>;
}

// REGISTRATION EMAIL FORM
const RegistrationEmailForm = ({ hideTitle = false, formik }: IRegistrationDataFormProps) => {
	/* Vars */
	const { handleChange, setFieldError, setFieldValue, values } = formik;

	/* Handlers */
	const onEmailBlurHandler = () => {
		if (!values?.email) {
			return;
		}

		if (!validateEmail(values?.email)) {
			setFieldError('email', 'Digite um e-mail válido ');
		} else {
			setFieldError('email', undefined);
		}
	};

	/* Utils */
	const renderedPersonTypes = Object.values(EPersonType).map(personType => {
		return (
			<UiRadio
				checked={values.person_type === personType}
				id={personType}
				key={personType}
				label={personTypeDescription[personType]}
				name="person_type"
				onChange={() => setFieldValue('person_type', personType)}
				value={personType}
			/>
		);
	});
	/* Render */
	return (
		<>
			{!hideTitle && <h1 className="text-xl text-border mb-6">Seja bem vindo(a)</h1>}

			<UiLabel htmlFor="email" className="text-1xl text-[#015426]">
				Endereço de e-mail
			</UiLabel>
			<UiTextField
				type="email"
				name="email"
				onBlur={onEmailBlurHandler}
				onChange={handleChange}
				value={values.email}
			/>

			{!hideTitle && <div className="flex mt-4 mb-6 space-x-4">{renderedPersonTypes}</div>}
		</>
	);
};

export default RegistrationEmailForm;
