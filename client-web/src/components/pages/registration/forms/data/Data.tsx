import type { ChangeEvent } from 'react';
import type { FormikProps } from 'formik';

// COMPONENTS
import { UiTextField } from '@components/ui/text-field/TextField';
import { UiLabel } from '@components/ui/label/Label';

// ENUMS
import { EPersonType, personTypeDescription } from '@enums/registration';

// INTERFACES
import type { IRegisterPayload } from '@interfaces/registration';

// UTILS
import { clearDocument, formatDocument, isCnpjDocument, validateDocument } from '@utils/string';

// REGISTRATION DATA FORM UTILS
interface IRegistrationDataFormProps {
	hideTitle?: boolean;
	formik: FormikProps<IRegisterPayload>;
}

// REGISTRATION DATA FORM
const RegistrationDataForm = ({ hideTitle = false, formik }: IRegistrationDataFormProps) => {
	/* Vars */
	const { handleChange, setFieldError, setFieldValue, values } = formik;
	const document = values.document ? formatDocument(values.document) : '';
	const isLegalPerson = values.person_type === EPersonType.PJ;

	/* Handlers */
	const changeDocumentHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const insertedValue = e.currentTarget.value;
		const name = e.currentTarget.name;
		const newValue = clearDocument(insertedValue);

		if (newValue.length > 14) {
			return;
		}

		setFieldValue(name, newValue);
	};

	const onDocumentBlurHandler = async () => {
		const isDocumentValid = validateDocument(values.document);

		if (isDocumentValid) {
			return values.document;
		}

		const document = clearDocument(values.document);

		setFieldError(
			'national_registration',
			`Digite um ${isCnpjDocument(document) ? 'CNPJ' : 'CPF'} válido`,
		);
	};

	/* Render */
	return (
		<>
			{!hideTitle && (
				<h1 className="text-xl text-border mb-6 capitalize">
					{personTypeDescription[values.person_type]}
				</h1>
			)}

			<div className="flex flex-col space-y-2">
				<div>
					<UiLabel htmlFor="name" className="text-1xl text-[#015426]">
						{isLegalPerson ? 'Razão social' : 'Nome'}
					</UiLabel>
					<UiTextField
						type="text"
						name="name"
						onChange={handleChange}
						value={values.name}
					/>
				</div>
				<div>
					<UiLabel htmlFor="document" className="text-1xl text-[#015426]">
						{isLegalPerson ? 'CNPJ' : 'CPF'}
					</UiLabel>
					<UiTextField
						type="text"
						name="document"
						onBlur={onDocumentBlurHandler}
						onChange={changeDocumentHandler}
						value={document}
					/>
				</div>
				<div>
					<UiLabel htmlFor="date" className="text-1xl text-[#015426]">
						{isLegalPerson ? 'Data de abertura' : 'Data de nascimento'}
					</UiLabel>
					<UiTextField
						type="date"
						name="date"
						onChange={handleChange}
						value={values.date}
					/>
				</div>
				<div>
					<UiLabel htmlFor="phone" className="text-1xl text-[#015426]">
						Telefone
					</UiLabel>
					<UiTextField
						type="text"
						name="phone"
						onChange={handleChange}
						value={values.phone}
					/>
				</div>
			</div>
		</>
	);
};

export default RegistrationDataForm;
