import React, { Component } from 'react';
import { ChevronLeft } from '@amsterdam/asc-assets';
import {
	CancelButtonStyle,
	PreviousButtonStyle,
	ButtonPanelStyle,
	LeftActionStyle,
	RightActionStyle,
	WizardButton,
} from './WizardFooterStyles';

export default class WizardFooter extends Component<{
	cancelLabel: string;
	nextLabel: string;
	previousLabel: string;
	saveLabel: string;
	showCancelButton: boolean;
	showNextButton: boolean;
	showPreviousButton: boolean;
	showSaveButton: boolean;
	altNextButton: boolean;
	altSaveButton: boolean;
	preventNextStep: boolean;
	preventSave: boolean;
	onCancelClick: any;
	onPreviousClick: any;
	onNextClick: any;
	onSaveClick: any;
}> {
	static defaultProps = {
		cancelLabel: 'Annuleren',
		nextLabel: 'Volgende',
		previousLabel: 'Vorige',
		saveLabel: 'Opslaan',
		showCancelButton: false,
		showNextButton: false,
		showPreviousButton: false,
		showSaveButton: false,
		altNextButton: false,
		altSaveButton: false,
		preventNextStep: false,
		preventSave: false,
		onCancelClick: null,
		onPreviousClick: null,
		onNextClick: null,
		onSaveClick: null,
	};

	render() {
		const {
			cancelLabel,
			nextLabel,
			previousLabel,
			saveLabel,
			showCancelButton,
			showNextButton,
			showPreviousButton,
			showSaveButton,
			altNextButton,
			altSaveButton,
			preventNextStep,
			preventSave,
			onCancelClick,
			onPreviousClick,
			onNextClick,
			onSaveClick,
		} = this.props;

		return (
			<div>
				<ButtonPanelStyle>
					<LeftActionStyle>
						{showCancelButton ? (
							<CancelButtonStyle variant="textButton" iconLeft={<ChevronLeft />} onClick={onCancelClick}>
								{cancelLabel}
							</CancelButtonStyle>
						) : (
							''
						)}
					</LeftActionStyle>

					<RightActionStyle>
						{showPreviousButton ? (
							<PreviousButtonStyle variant="textButton" iconLeft={<ChevronLeft />} onClick={onPreviousClick}>
								{previousLabel}
							</PreviousButtonStyle>
						) : (
							''
						)}

						{showNextButton ? (
							<WizardButton
								name="next"
								variant={altNextButton ? 'secondary' : 'primary'}
								onClick={onNextClick}
								disabled={preventNextStep}
							>
								{nextLabel}
							</WizardButton>
						) : (
							''
						)}

						{showSaveButton ? (
							<WizardButton
								name="save"
								variant={altSaveButton ? 'secondary' : 'primary'}
								onClick={onSaveClick}
								disabled={preventSave}
							>
								{saveLabel}
							</WizardButton>
						) : (
							''
						)}
					</RightActionStyle>
				</ButtonPanelStyle>
			</div>
		);
	}
}
