import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
	questions: [],
	// loading, error, ready, active, finished
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

const SECONDS_PER_QUESTION = 30;

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload.questions,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
			};
		case 'newAnswer':
			const question = state.questions[state.index];

			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};

		case 'nextQuestion':
			return { ...state, index: state.index + 1, answer: null };
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore:
					state.points > state.highscore
						? state.points
						: state.highscore,
			};
		case 'restart':
			return {
				...initialState,
				status: 'ready',
				questions: state.questions,
			};
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status:
					state.secondsRemaining === 0 ? 'finished' : state.status,
			};
		default:
			throw new Error('Invalid action');
	}
}

export function QuizProvider({ children }) {
	const [
		{
			status,
			questions,
			index,
			answer,
			points,
			highscore,
			secondsRemaining,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	useEffect(() => {
		async function fetchQuestions() {
			try {
				const response = await fetch('http://localhost:8000/questions');
				const questions = await response.json();
				dispatch({ type: 'dataReceived', payload: { questions } });
			} catch (err) {
				dispatch({ type: 'dataFailed' });
			}
		}
		fetchQuestions();
	}, []);

	return (
		<QuizContext.Provider
			value={{
				status,
				questions,
				index,
				answer,
				points,
				highscore,
				secondsRemaining,
				dispatch,
				numberOfQuestions: questions.length,
				maxPossiblePoints: questions.reduce((acc, curr) => {
					return curr.points + acc;
				}, 0),
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

export function useQuiz() {
	const context = useContext(QuizContext);
	if (context === undefined) {
		throw new Error('QuizContext was used outside of QuizProvider');
	}

	return context;
}
