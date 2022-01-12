import { useState, useCallback } from 'react';
import { confirm as dialogConfirm } from '@amsterdam/bmi-component-library';

function useConfirmTermination(onTerminate: () => void): { isOpen: boolean; confirm: () => void } {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const confirm = useCallback(() => {
		setIsOpen(true);
		dialogConfirm({
			title: 'Annuleer uploaden',
			message:
				'U gaat het uploaden van de bestanden annuleren. De geuploade bestanden zullen uit het systeem worden verwijderd',
			textCancelButton: 'Terug',
			textConfirmButton: 'Oke',
			onCancel: () => {
				setIsOpen(false);
			},
			onConfirm: () => {
				onTerminate();
			},
		});
	}, []);

	return { isOpen, confirm };
}

export default useConfirmTermination;
