import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';

// COMPONENTS
import { UiPanel } from '@components/ui/panel/Panel';
import RegistrationDataForm from '@components/pages/registration/forms/data/Data';
import RegistrationEmailForm from '@components/pages/registration/forms/email/Email';
import RegistrationPasswordForm from '@components/pages/registration/forms/password/Password';
import RegistrationResumeForm from '@components/pages/registration/forms/resume/Resume';

// INTERFACES
import type { IRegisterPayload } from '@interfaces/registration';

// SERVICES
import RegistrationService from '@services/registration';

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
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [previousSteps, setPreviousSteps] = useState<ERegistrationPageContainerSteps[]>([]);
	const [currentStep, setCurrentStep] = useState<ERegistrationPageContainerSteps>(
		ERegistrationPageContainerSteps.EMAIL,
	);

	/* Vars */
	const totalSteps = Object.values(ERegistrationPageContainerSteps).length;
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
	const registrationService: RegistrationService = useMemo(() => {
		return new RegistrationService();
	}, []);

	const formik = useFormik({
		initialValues: {} as IRegisterPayload,
		onSubmit: async values => {
			setIsLoading(true);
			const response = await registrationService.saveRegister(values);
			setIsLoading(false);

			if (response.ok) {
				setCurrentStep(ERegistrationPageContainerSteps.EMAIL);
				setPreviousSteps([]);
				formik.setValues({} as IRegisterPayload);
				return;
			}
		},
	});
	const disableContinueButton =
		Object.values(formik.errors).some(value => !!value) ||
		Object.values(formik.values).some(value => !value);

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

	// Lifecycle
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			await registrationService.getRegister();
			setIsLoading(false);
		})();
	}, []);

	/* Render */
	if (isLoading) {
		return <div>Carregando informações...</div>;
	}

	return (
		<UiPanel
			backHandler={!!previousSteps.length ? () => backHandler() : undefined}
			continueHandler={continueHandler}
			title={renderedPanelTitle}
			disableContinueButton={disableContinueButton}
			continueButtonText={
				currentStep === ERegistrationPageContainerSteps.RESUME ? 'Cadastrar' : undefined
			}
		>
			<>{pageSteps[currentStep]}</>
		</UiPanel>
	);
};

export default RegistrationPageContainer;
