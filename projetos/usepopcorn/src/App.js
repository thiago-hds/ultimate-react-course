import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';
import { useKey } from './useKey';

const average = arr =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = 'c9d52ec9';

function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function Search({ query, setQuery }) {
	const inputElement = useRef(null);

	// esta forma de focar no input não é declarativa como a do react
	// useEffect(() => {
	// 	document.querySelector('.search').focus();
	// }, []);

	useKey('Enter', function () {
		if (document.activeElement === inputElement.current) {
			return;
		}

		inputElement?.current.focus();
		setQuery('');
	});

	return (
		<input
			ref={inputElement}
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={e => setQuery(e.target.value)}
		/>
	);
}

function NumberResults({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function NavBar({ children }) {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
		</nav>
	);
}

function Movie({ movie, onSelectMovie }) {
	return (
		<li onClick={() => onSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className="list list-movies">
			{movies?.map(movie => (
				<Movie
					key={movie.imdbID}
					movie={movie}
					onSelectMovie={onSelectMovie}
				/>
			))}
		</ul>
	);
}

function Box({ children }) {
	const [isOpen1, setIsOpen1] = useState(true);

	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen1(open => !open)}
			>
				{isOpen1 ? '–' : '+'}
			</button>
			{isOpen1 && children}
		</div>
	);
}

function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map(movie => movie.imdbRating));
	const avgUserRating = average(watched.map(movie => movie.userRating));
	const avgRuntime = average(watched.map(movie => movie.runtime));
	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating.toFixed(2)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(2)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime.toFixed(2)} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMovie({ movie, onDeleteWatched }) {
	return (
		<li>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>

				<button
					className="btn-delete"
					onClick={() => onDeleteWatched(movie.imdbId)}
				>
					&times;
				</button>
			</div>
		</li>
	);
}

function WatchedMovieList({ watched, onDeleteWatched }) {
	return (
		<ul className="list">
			{watched.map(movie => (
				<WatchedMovie
					movie={movie}
					key={movie.imdbId}
					onDeleteWatched={onDeleteWatched}
				/>
			))}
		</ul>
	);
}

function MovieDetails({
	selectedId,
	onCloseMovie,
	onAddWatched,
	watchedRating,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState('');

	const countRef = useRef(0);

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	useEffect(() => {
		async function fetchMovieDetails() {
			setIsLoading(true);
			try {
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
				);
				if (!res.ok) {
					throw new Error(
						'Something went wrong with fetching movies'
					);
				}
				const data = await res.json();
				setMovie(data);
			} catch (err) {
				// setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchMovieDetails();
	}, [selectedId]);

	useEffect(() => {
		document.title = title ? `Movie | ${title}` : 'usePopcorn';
		return () => {
			document.title = 'usePopcorn';
		};
	}, [title]);

	useEffect(() => {
		if (userRating) {
			countRef.current += 1;
		}
	}, [userRating]);

	useKey('Escape', onCloseMovie);

	function handleAdd() {
		const newWatchedMovie = {
			imdbId: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
		};

		onAddWatched(newWatchedMovie);
		onCloseMovie();
		setUserRating('');
	}

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${title}`} />
						<div className="details-overview">
							<h2>
								{title} ({year})
							</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span> {imdbRating} IMDB rating
							</p>
						</div>
					</header>

					<section>
						<div className="rating">
							{!watchedRating ? (
								<>
									<StarRating
										size={24}
										maxRating={10}
										onRateSelected={setUserRating}
									/>
									{userRating > 0 && (
										<button
											className="btn-add"
											onClick={handleAdd}
										>
											+ Add to List
										</button>
									)}
								</>
							) : (
								<div>
									{`You rated this movie with ${watchedRating}
									stars.`}
								</div>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function Loader() {
	return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
	return <p className="error">{message}</p>;
}

export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	const { movies, isLoading, error } = useMovies(query);

	const [watched, setWatched] = useLocalStorageState([], 'watched');

	function handleSelectedMovie(id) {
		setSelectedId(prevId => (prevId === id ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatchedMovie(movie) {
		setWatched(watched => [...watched, movie]);
	}

	function handleDeleteWatched(id) {
		setWatched(watched => watched.filter(movie => movie.imdbId !== id));
	}

	function getWatchedRating(id) {
		const watchedMovie = watched.find(movie => movie.imdbId === id);
		return watchedMovie?.userRating || null;
	}

	return (
		<>
			<NavBar movies={movies}>
				<Search query={query} setQuery={setQuery} />
				<NumberResults movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							onSelectMovie={handleSelectedMovie}
						/>
					)}
					{error ? <ErrorMessage message={error} /> : null}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatchedMovie}
							watchedRating={getWatchedRating(selectedId)}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
