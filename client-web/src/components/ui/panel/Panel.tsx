import type { ReactNode } from 'react';
import { UiButton } from '../button/Button';

// UI PANEL UTILS
interface IUiPanelProps {
	backHandler?: () => void;
	children: ReactNode;
	continueButtonText?: string;
	continueHandler: () => void;
	title: ReactNode;
}

// UI PANEL
export const UiPanel = ({
	backHandler,
	continueButtonText = 'Continuar',
	continueHandler,
	children,
	title,
}: IUiPanelProps) => {
	/* Render */
	return (
		<section className="shadow-sm bg-white rounded-lg p-4 max-w-sm">
			<p className="text-sm pb-2">{title}</p>
			{children}
			<div className="flex space-x-2 mt-6">
				{!!backHandler && (
					<UiButton className="w-full" variant="outline" onClick={backHandler}>
						Voltar
					</UiButton>
				)}
				<UiButton className="w-full" onClick={continueHandler}>
					{continueButtonText}
				</UiButton>
			</div>
		</section>
	);
};
