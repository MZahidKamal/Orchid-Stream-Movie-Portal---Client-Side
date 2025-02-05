import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


const useGenreLoader = () => {
    const [genres, setGenres] = useState([]);
    const [genresLoading, setGenresLoading] = useState(true);
    const [genresError, setGenresError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setGenresLoading(true);
                const response = await fetch(`${BASE_URL}/genre/all`);

                if (!response.ok) {
                    new Error(`Failed to fetch genres: ${response.status}`);
                }

                const dataArray = await response.json();
                setGenres(dataArray);
            }
            catch (error) {
                setGenresError(error);
                toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
            }
            finally {
                setGenresLoading(false);
            }
        }
        fetchGenres().then();
    }, []);

    return {genres, genresLoading, genresError};
}

export default useGenreLoader;
