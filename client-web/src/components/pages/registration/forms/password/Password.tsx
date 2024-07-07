import type { FormikProps } from 'formik';

// COMPONENTS
import { UiTextField } from '@components/ui/text-field/TextField';
import { UiLabel } from '@components/ui/label/Label';

// INTERFACES
import type { IRegisterPayload } from '@interfaces/registration';

// REGISTRATION DATA FORM UTILS
interface IRegistrationDataFormProps {
	formik: FormikProps<IRegisterPayload>;
	hideTitle?: boolean;
}

// REGISTRATION DATA FORM
const RegistrationDataForm = ({ hideTitle = false, formik }: IRegistrationDataFormProps) => {
	/* Vars */
	const { handleChange, values } = formik;

	/* Render */
	return (
		<>
			{!hideTitle && <h1 className="text-xl text-border mb-6">Senha de acesso</h1>}

			<UiLabel htmlFor="password" className="text-1xl text-[#015426]">
				Sua senha
			</UiLabel>
			<UiTextField
				type="password"
				name="password"
				onChange={handleChange}
				value={values.password}
			/>
		</>
	);
};

export default RegistrationDataForm;
