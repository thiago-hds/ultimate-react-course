import { useQuiz } from '../context/QuizContext';

function Progress() {
	const { index, numberOfQuestions, points, maxPossiblePoints, answer } =
		useQuiz();

	return (
		<header className="progress">
			<progress
				max={numberOfQuestions}
				value={index + Number(answer !== null)}
			/>
			<p>
				Question{' '}
				<strong>
					{index + 1}/{numberOfQuestions}
				</strong>
			</p>
			<p>
				<strong>{points}</strong> / {maxPossiblePoints}
			</p>
		</header>
	);
}

export default Progress;
