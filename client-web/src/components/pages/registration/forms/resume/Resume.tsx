import type { FormikProps } from 'formik';

// COMPONENTS
import RegistrationDataForm from '@components/pages/registration/forms/data/Data';
import RegistrationEmailForm from '@components/pages/registration/forms/email/Email';
import RegistrationPasswordForm from '@components/pages/registration/forms/password/Password';

// INTERFACES
import type { IRegisterPayload } from '@interfaces/registration';

// REGISTRATION RESUME FORM UTILS
interface IRegistrationDataFormProps {
	formik: FormikProps<IRegisterPayload>;
}

// REGISTRATION RESUME FORM
const RegistrationResumeForm = ({ formik }: IRegistrationDataFormProps) => {
	/* Render */
	return (
		<>
			<h1 className="text-xl text-border mb-6">Revise suas informações</h1>
			<div className="flex flex-col space-y-2">
				<RegistrationEmailForm hideTitle formik={formik} />
				<RegistrationDataForm hideTitle formik={formik} />
				<RegistrationPasswordForm hideTitle formik={formik} />
			</div>
		</>
	);
};

export default RegistrationResumeForm;
