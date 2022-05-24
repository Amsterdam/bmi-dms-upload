import { useState, useCallback } from 'react';
import { confirm as dialogConfirm } from '@amsterdam/bmi-component-library';

function useConfirmSave(onSave: () => void): { isOpen: boolean; confirm: () => void } {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const confirm = useCallback(() => {
		setIsOpen(true);
		dialogConfirm({
			title: 'Open velden',
			message: 'Je hebt nog niet bij alle bestanden de metadata ingevuld. Wil je deze upload toch al opslaan?',
			textCancelButton: 'Terug',
			textConfirmButton: 'Akkoord',
			onCancel: () => {
				setIsOpen(false);
			},
			onConfirm: () => {
				onSave();
			},
		});
	}, []);

	return { isOpen, confirm };
}

export default useConfirmSave;
