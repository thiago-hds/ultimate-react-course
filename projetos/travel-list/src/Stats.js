export function Stats({ items }) {
	const numTotal = items.length;

	if (!numTotal) {
		return (
			<p className="stats">
				<em>Start adding some items to your packing list</em>
			</p>
		);
	}
	const numPacked = items.filter(item => item.packed).length;
	const percentagePacked = Math.round((numPacked / numTotal) * 100);
	return (
		<footer className="stats">
			<em>
				{percentagePacked === 100
					? 'You got everything! Ready to go'
					: `You have ${numTotal} items on your list, and you already packed 
				${numPacked} (${percentagePacked}%)`}
			</em>
		</footer>
	);
}
