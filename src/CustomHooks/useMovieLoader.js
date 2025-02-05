import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";


const useMovieLoader = (params) => {
    const [movies, setMovies] = useState([]);
    const [moviesLoading, setMoviesLoading] = useState(true);
    const [moviesError, setMoviesError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (params.category){
                    if(params.category === 'all'){
                        /*const response = await fetch(`${BASE_URL}/movies/all`);
                        const dataArray = await response.json();*/
                        const response = axios.get(`${BASE_URL}/movies/all`);
                        const dataArray = (await response).data;

                        setMovies(dataArray);
                    }
                    else {
                        const response = await fetch(`${BASE_URL}/movies/${params.category}`);
                        const dataArray = await response.json();
                        setMovies(dataArray);
                    }
                }
                else if (params.genre){
                    const response = await fetch(`${BASE_URL}/movies/genre/${params.genre}`);
                    const dataArray = await response.json();
                    setMovies(dataArray);
                }
                else if (params.id){
                    const response = await fetch(`${BASE_URL}/movies/id/${params.id}`);
                    const dataArray = await response.json();
                    setMovies(dataArray);
                }
                
                else setMovies([]);
            }
            catch (error) {
                setMoviesError(error);
                toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
            }
            finally {
                setMoviesLoading(false);
            }
        }
        fetchMovies().then();
    }, [params.category, params.genre, params.id]);

    return {movies, moviesLoading, moviesError};
}

export default useMovieLoader;
