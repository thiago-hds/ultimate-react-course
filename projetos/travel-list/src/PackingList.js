import { useState } from 'react';
import { Item } from './Item';

export function PackingList({ items, onDeleteItem, onTogglePacked, onClear }) {
	const [sortBy, setSortBy] = useState('input');
	let sortedItems;
	if (sortBy === 'input') sortedItems = items;
	else
		sortedItems = items.slice().sort((a, b) => {
			if (sortBy === 'description' && a.description !== b.description) {
				return a.description < b.description ? -1 : 1;
			} else if (sortBy === 'packed' && a.packed !== b.packed) {
				return a.packed ? -1 : 1;
			}
			return 0;
		});
	return (
		<div className="list">
			<ul>
				{sortedItems.map(item => (
					<Item
						key={item.id}
						item={item}
						onDeleteItem={onDeleteItem}
						onTogglePacked={onTogglePacked}
					/>
				))}
			</ul>
			<div className="actions">
				<select
					value={sortBy}
					onChange={e => setSortBy(e.target.value)}
				>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by descriptions</option>
					<option value="packed">Sort by packed status</option>
				</select>
				<button onClick={onClear}>Clear list</button>
			</div>
		</div>
	);
}
