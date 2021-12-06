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
	onClick: ComponentProps<typeof Button>['onClick'];
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
): { visible: boolean; label: string; disabled: boolean; onClick?: ButtonConfig['onClick'] } {
	return {
		visible: config?.visible ?? false,
		label: config?.label ?? defaultLabel,
		disabled: config?.disabled ?? false,
		onClick: config?.onClick,
	};
}
const WizardFooter: React.FC<Props> = ({ cancel, next, previous, save }) => {
	const { visible: showCancelButton, onClick: onCancelClick, label: cancelLabel } = useButtonConfig(
		cancel,
		'Annuleren',
	);

	const {
		visible: showNextButton,
		disabled: preventNextStep,
		onClick: onNextClick,
		label: nextLabel,
	} = useButtonConfig(next, 'Volgende');

	const { visible: showPreviousButton, onClick: onPreviousClick, label: previousLabel } = useButtonConfig(
		previous,
		'Vorige',
	);

	const { visible: showSaveButton, disabled: preventSave, onClick: onSaveClick, label: saveLabel } = useButtonConfig(
		save,
		'Opslaan',
	);

	return (
		<ButtonPanelStyle>
			<LeftActionStyle>
				{showCancelButton ? (
					<CancelButtonStyle variant="textButton" iconLeft={<ChevronLeft />} onClick={onCancelClick}>
						{cancelLabel}
					</CancelButtonStyle>
				) : null}
			</LeftActionStyle>
			<RightActionStyle>
				{showPreviousButton && (
					<PreviousButtonStyle variant="textButton" iconLeft={<ChevronLeft />} onClick={onPreviousClick}>
						{previousLabel}
					</PreviousButtonStyle>
				)}
				{showNextButton && (
					<WizardButton name="next" variant="secondary" onClick={onNextClick} disabled={preventNextStep}>
						{nextLabel}
					</WizardButton>
				)}
				{showSaveButton && (
					<WizardButton name="save" variant="secondary" onClick={onSaveClick} disabled={preventSave}>
						{saveLabel}
					</WizardButton>
				)}
			</RightActionStyle>
		</ButtonPanelStyle>
	);
};
export default WizardFooter;
