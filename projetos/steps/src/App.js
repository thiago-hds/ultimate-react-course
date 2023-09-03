import { useState } from 'react';
const messages = [
	'Learn React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑',
];

function App() {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

	function goToPrevious() {
		if (step > 1) setStep(prevStep => prevStep - 1);
	}
	function goToNext() {
		if (step < 3) setStep(prevStep => prevStep + 1);
	}

	return (
		<>
			<button
				className="close"
				onClick={() => {
					setIsOpen(prevIsOpen => !prevIsOpen);
				}}
			>
				&times;
			</button>
			{isOpen && (
				<div className="steps">
					<div className="numbers">
						<div className={step >= 1 ? 'active' : ''}>1</div>
						<div className={step >= 2 ? 'active' : ''}>2</div>
						<div className={step >= 3 ? 'active' : ''}>3</div>
					</div>
					<p className="message">
						Step {step}: {messages[step - 1]}
					</p>
					<div className="buttons">
						<button
							style={{
								backgroundColor: '#7950f2',
								color: '#fff',
							}}
							onClick={goToPrevious}
						>
							Previous
						</button>
						<button
							style={{
								backgroundColor: '#7950f2',
								color: '#fff',
							}}
							onClick={goToNext}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
