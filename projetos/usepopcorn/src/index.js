import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Test() {
	const [rating, setRating] = useState(0);
	return (
		<>
			<StarRating
				messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
				defaultRating={3}
				onRateSelected={value => setRating(value)}
				maxRating={5}
			/>
			<p>This movie was rated {rating} star(s).</p>
		</>
	);
}
root.render(
	<React.StrictMode>
		<App />
		{/* <Test /> */}
	</React.StrictMode>
);
