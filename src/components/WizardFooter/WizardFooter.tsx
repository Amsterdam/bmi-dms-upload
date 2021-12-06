import React, { ComponentProps } from 'react';
import {
	ButtonPanelStyle,
	CancelButtonStyle,
	LeftActionStyle,
	PreviousButtonStyle,
	RightActionStyle,
	WizardButton,
} from './WizardFooterStyles';
import { ChevronLeft } from '@amsterdam/asc-assets';
import { Button } from '@amsterdam/asc-ui';

type ButtonConfig = {
	visible?: boolean;
	disabled?: boolean;
	label?: string;
	onClick?: ComponentProps<typeof Button>['onClick'];
	dataTestId?: string;
};
type Props = {
	cancel?: ButtonConfig;
	next?: ButtonConfig;
	previous?: ButtonConfig;
	save?: ButtonConfig;
};

function useButtonConfig(
	config: ButtonConfig | undefined,
	defaultLabel: string,
): {
	visible: boolean;
	label: string;
	disabled: boolean;
	onClick?: ButtonConfig['onClick'];
	dataTestId?: string;
} {
	return {
		visible: config?.visible ?? false,
		label: config?.label ?? defaultLabel,
		disabled: config?.disabled ?? false,
		onClick: config?.onClick,
		dataTestId: config?.dataTestId,
	};
}
const WizardFooter: React.FC<Props> = ({ cancel, next, previous, save }) => {
	const {
		visible: showCancelButton,
		onClick: onCancelClick,
		label: cancelLabel,
		dataTestId: cancelTestId,
	} = useButtonConfig(cancel, 'Annuleren');

	const {
		visible: showNextButton,
		disabled: preventNextStep,
		onClick: onNextClick,
		label: nextLabel,
		dataTestId: nextTestId,
	} = useButtonConfig(next, 'Volgende');

	const {
		visible: showPreviousButton,
		onClick: onPreviousClick,
		label: previousLabel,
		dataTestId: previousTestId,
	} = useButtonConfig(previous, 'Vorige');

	const {
		visible: showSaveButton,
		disabled: preventSave,
		onClick: onSaveClick,
		label: saveLabel,
		dataTestId: saveTestId,
	} = useButtonConfig(save, 'Opslaan');

	return (
		<ButtonPanelStyle>
			<LeftActionStyle>
				{showCancelButton && (
					<CancelButtonStyle
						name="cancel"
						variant="textButton"
						iconLeft={<ChevronLeft />}
						onClick={onCancelClick}
						data-testid={cancelTestId}
					>
						{cancelLabel}
					</CancelButtonStyle>
				)}
			</LeftActionStyle>
			<RightActionStyle>
				{showPreviousButton && (
					<PreviousButtonStyle
						name="previous"
						variant="textButton"
						iconLeft={<ChevronLeft />}
						onClick={onPreviousClick}
						data-testid={previousTestId}
					>
						{previousLabel}
					</PreviousButtonStyle>
				)}
				{showNextButton && (
					<WizardButton
						name="next"
						variant="secondary"
						onClick={onNextClick}
						disabled={preventNextStep}
						data-testid={nextTestId}
						taskflow
					>
						{nextLabel}
					</WizardButton>
				)}
				{showSaveButton && (
					<WizardButton
						name="save"
						variant="secondary"
						onClick={onSaveClick}
						disabled={preventSave}
						data-testid={saveTestId}
					>
						{saveLabel}
					</WizardButton>
				)}
			</RightActionStyle>
		</ButtonPanelStyle>
	);
};
export default WizardFooter;
