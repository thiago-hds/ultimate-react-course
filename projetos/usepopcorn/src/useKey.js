import { useEffect } from 'react';

export function useKey(key, action) {
	useEffect(() => {
		const handleEscapeKeydown = function (e) {
			if (e.code.toLowerCase() === key.toLowerCase()) {
				action();
			}
		};
		document.addEventListener('keydown', handleEscapeKeydown);

		return () => {
			document.removeEventListener('keydown', handleEscapeKeydown);
		};
	}, [action, key]);
}
