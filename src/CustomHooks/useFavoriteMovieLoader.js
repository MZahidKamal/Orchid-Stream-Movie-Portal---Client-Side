import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import AuthContext from "../Providers/AuthContext.jsx";
import dataContext from "../Providers/DataContext.jsx";


const useFavoriteMovieLoader = () => {
    const {user} = useContext(AuthContext);
    const {favoriteMoviesCount, setFavoriteMoviesCount} = useContext(dataContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favoriteMoviesLoading, setFavoriteMoviesLoading] = useState(true);
    const [favoriteMoviesError, setFavoriteMoviesError] = useState(null);


    const handleAddThisMovieToFavorite = async (movieId) => {
        try {
            const response = await fetch(`${BASE_URL}/movies/add_to_favorite_movies`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user?.email, id: movieId })
            });

            const result = await response.json();

            if (!response.ok) {
                new Error(result.message || `Failed to add this movie to favorites: ${response.statusText}`);
            }

            if (result.message === "Movie already exists in favorites.") {
                toast.warning(result.message);
            } else {
                toast.success("Movie added to your favorites!");
                setFavoriteMoviesCount(favoriteMoviesCount + 1);
            }

        } catch (error) {
            console.error(`ERROR MESSAGE: ${error.code || "Unknown"}: ${error.message}`);
            toast.error(`Failed to add movie to favorites: ${error.message}`);
        }
    };


    const handleRemoveThisMovieFromFavorite = async (movieId) => {
        try {
            const response = await fetch(`${BASE_URL}/movies/remove_from_favorite_movies`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user?.email, id: movieId })
            });

            if (!response.ok) {
                new Error(`Failed to remove from favorite movies: ${response.statusText}`);
            }
            setFavoriteMoviesCount(favoriteMoviesCount - 1);
            toast.success("Movie removed from your favorites!");

        } catch (error) {
            console.error(`ERROR MESSAGE: ${error.message}`);
        }
    };


    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                if (user?.email) {
                    setFavoriteMoviesLoading(true); // Show loading state
                    const response = await fetch(`${BASE_URL}/movies/user_favorite_movies`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: user?.email })
                    });

                    const moviesData = await response.json();
                    setFavoriteMovies(moviesData);
                }
                else {
                    setFavoriteMovies([]);
                }

            } catch (error) {
                setFavoriteMoviesError(error);
                toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);

            } finally {
                setFavoriteMoviesLoading(false);
            }
        };
        fetchFavoriteMovies().then();
    }, [user?.email]);


    return {favoriteMovies, favoriteMoviesLoading, favoriteMoviesError, handleAddThisMovieToFavorite, handleRemoveThisMovieFromFavorite};
}

export default useFavoriteMovieLoader;
