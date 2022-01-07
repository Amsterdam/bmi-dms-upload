import { useState, useCallback } from 'react';

function useConfirmTermination({ data: value, path }: any) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onOpen = useCallback(() => {
		setIsOpen(true);
	}, [path]);

	return { isOpen, onOpen };
}

export default useConfirmTermination;
