interface IStepsNavigationConfig<E> {
    backStep: () => void;
    nextStep: (step: E) => void;
}

export const stepsNavigationConfig = <E>(
    steps: E[],
    currentStep: E,
    previousSteps: E[],
    setCurrentStep: (currentStep: E) => void,
    setPreviousSteps: (previousSteps: E[]) => void
): IStepsNavigationConfig<E> => {
    return {
        nextStep: (step: E) => {
            if (!!steps.includes(step)) {
                setPreviousSteps([...previousSteps, currentStep]);
                setCurrentStep(step);
            }
        },
        backStep: () => {
            if (previousSteps.length > 0) {
                const lastStep = previousSteps[previousSteps.length - 1];

                setPreviousSteps(previousSteps.slice(0, -1));
                setCurrentStep(lastStep);
            }
        },
    };
};
