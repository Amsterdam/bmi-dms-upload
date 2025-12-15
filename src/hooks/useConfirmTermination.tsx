import { useState, useCallback } from 'react';
import { confirm as dialogConfirm } from '@amsterdam/bmi-component-library';
import { customSubject } from '../components/ConfirmTermination/ConfirmTermination';

function useConfirmTermination(onTerminate: () => void): {
	isOpen: boolean;
	confirm: (forceTerminate?: boolean) => void;
} {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const confirm = useCallback((forceTerminate?: boolean) => {
		if (typeof forceTerminate !== 'undefined' && forceTerminate) {
			return onTerminate();
		}

		setIsOpen(true);
		dialogConfirm(
			{
				title: 'Annuleer uploaden',
				message: 'U annuleert het uploaden. Eventueel zojuist toegevoegde bestanden zullen worden verwijderd',
				textCancelButton: 'Terug',
				textConfirmButton: 'Akkoord',
				onCancel: () => {
					setIsOpen(false);
				},
				onConfirm: () => {
					onTerminate();
				},
			},
			customSubject,
		);
	}, []);

	return { isOpen, confirm };
}

export default useConfirmTermination;
