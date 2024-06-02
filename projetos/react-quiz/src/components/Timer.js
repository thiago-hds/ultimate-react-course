import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

function formatTime(seconds) {
	return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${
		seconds % 60
	}`;
}

function Timer() {
	const { dispatch, secondsRemaining } = useQuiz();
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
