import { useState } from 'react';
import { useFormik } from 'formik';

// COMPONENTS
import { UiPanel } from '@components/ui/panel/Panel';
import RegistrationDataForm from '@components/pages/registration/forms/data/Data';
import RegistrationEmailForm from '@components/pages/registration/forms/email/Email';
import RegistrationPasswordForm from '@components/pages/registration/forms/password/Password';
import RegistrationResumeForm from '@components/pages/registration/forms/resume/Resume';

// INTERFACES
import type { IRegisterPayload } from '@interfaces/registration';

// UTILS
import { stepsNavigationConfig } from '@utils/navigation';

// REGISTRATION PAGE CONTAINER UTILS
enum ERegistrationPageContainerSteps {
	EMAIL = '1',
	DATA = '2',
	PASSWORD = '3',
	RESUME = '4',
}

// REGISTRATION PAGE CONTAINER
const RegistrationPageContainer = () => {
	/* State */
	const [previousSteps, setPreviousSteps] = useState<ERegistrationPageContainerSteps[]>([]);
	const [currentStep, setCurrentStep] = useState<ERegistrationPageContainerSteps>(
		ERegistrationPageContainerSteps.EMAIL,
	);

	/* Vars */
	const totalSteps = Object.values(ERegistrationPageContainerSteps).length;
	const formik = useFormik({
		initialValues: {} as IRegisterPayload,
		onSubmit: values => {
			console.log(values);
		},
	});
	const nextStepByCurrentStep: Record<
		ERegistrationPageContainerSteps,
		ERegistrationPageContainerSteps | null
	> = {
		[ERegistrationPageContainerSteps.EMAIL]: ERegistrationPageContainerSteps.DATA,
		[ERegistrationPageContainerSteps.DATA]: ERegistrationPageContainerSteps.PASSWORD,
		[ERegistrationPageContainerSteps.PASSWORD]: ERegistrationPageContainerSteps.RESUME,
		[ERegistrationPageContainerSteps.RESUME]: null,
	};

	const pageNavigation = stepsNavigationConfig<ERegistrationPageContainerSteps>(
		Object.values(ERegistrationPageContainerSteps),
		currentStep,
		previousSteps,
		setCurrentStep,
		setPreviousSteps,
	);

	/* Handlers */
	const backHandler = () => {
		if (!!previousSteps.length) {
			pageNavigation.backStep();
		}
	};

	const continueHandler = () => {
		const nextStep = nextStepByCurrentStep[currentStep];

		if (!nextStep) {
			return formik.handleSubmit();
		}

		pageNavigation.nextStep(nextStep);
	};

	/* Utils */
	const pageSteps = {
		[ERegistrationPageContainerSteps.EMAIL]: <RegistrationEmailForm formik={formik} />,
		[ERegistrationPageContainerSteps.DATA]: <RegistrationDataForm formik={formik} />,
		[ERegistrationPageContainerSteps.PASSWORD]: <RegistrationPasswordForm formik={formik} />,
		[ERegistrationPageContainerSteps.RESUME]: <RegistrationResumeForm formik={formik} />,
	};

	const renderedPanelTitle = (
		<>
			Etapa <span className="text-primary">{currentStep}</span> de {totalSteps}
		</>
	);

	/* Render */
	return (
		<UiPanel
			backHandler={!!previousSteps.length ? () => backHandler() : undefined}
			continueHandler={continueHandler}
			title={renderedPanelTitle}
			continueButtonText={
				currentStep === ERegistrationPageContainerSteps.RESUME ? 'Cadastrar' : undefined
			}
		>
			<>{pageSteps[currentStep]}</>
		</UiPanel>
	);
};
export default RegistrationPageContainer;
