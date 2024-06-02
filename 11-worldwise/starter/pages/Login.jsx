import { useAuth } from '../../../projetos/worldwise/src/contexts/FakeAuthContext';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');

	const navigate = useNavigate();
	const { login, isAuthenticated } = useAuth();

	function handleLoginClick(e) {
		e.preventDefault();
		if (email && password) {
			login(email, password);
		}
	}

	useEffect(
		function () {
			console.log('isAuthenticated', isAuthenticated);
			if (isAuthenticated) {
				navigate('/app');
			}
		},
		[isAuthenticated, navigate]
	);

	return (
		<main className={styles.login}>
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary" onClick={handleLoginClick}>
						Login
					</Button>
				</div>
			</form>
		</main>
	);
}
