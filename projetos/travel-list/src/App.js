import { useState } from 'react';
import Logo from './Logo';
import { Form } from './Form';
import { PackingList } from './PackingList';
import { Stats } from './Stats';

export default function App() {
	const [items, setItems] = useState([]);

	function addItem(item) {
		setItems(items => [...items, item]);
	}

	function deleteItem(id) {
		setItems(items => items.filter(i => i.id !== id));
	}

	function clearItems() {
		setItems([]);
	}

	function togglePacked(id) {
		setItems(prevItems => {
			return prevItems.map(item => {
				return item.id === id
					? { ...item, packed: !item.packed }
					: item;
			});
		});
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItem={addItem} />
			<PackingList
				items={items}
				onDeleteItem={deleteItem}
				onTogglePacked={togglePacked}
				onClear={clearItems}
			/>
			<Stats items={items} />
		</div>
	);
}
