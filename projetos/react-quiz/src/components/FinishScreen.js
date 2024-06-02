import { useQuiz } from '../context/QuizContext';

function FinishScreen() {
	const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
	const percentage = (points / maxPossiblePoints) * 100;
	return (
		<>
			<p className="result">
				<strong>You scored {points}</strong> out of {maxPossiblePoints}{' '}
				({Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(Highscore: {highscore} points)</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'restart' })}
			>
				Restart
			</button>
		</>
	);
}

export default FinishScreen;
