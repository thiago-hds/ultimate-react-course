import { useEffect } from 'react';

function formatTime(seconds) {
	return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${
		seconds % 60
	}`;
}

function Timer({ dispatch, secondsRemaining }) {
	const formatedTime = formatTime(secondsRemaining);

	useEffect(() => {
		const timerId = setInterval(() => {
			dispatch({ type: 'tick' });
		}, 1000);

		return () => clearInterval(timerId);
	}, [dispatch]);
	return <div className="timer">{formatedTime}</div>;
}

export default Timer;
