import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import AuthContext from "../Providers/AuthContext.jsx";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
//import axios from "axios";
import useAxiosSecure from "./useAxiosSecure.jsx";
import dataContext from "../Providers/DataContext.jsx";


const useMyMovieLoader = () => {
    const {user} = useContext(AuthContext);
    const {myMoviesCount, setMyMoviesCount} = useContext(dataContext);
    const [myMovies, setMyMovies] = useState([]);
    const [myMoviesLoading, setMyMoviesLoading] = useState(true);
    const [myMoviesError, setMyMoviesError] = useState(null);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const handleAddThisNewMovie = async (newMovieObject) => {
        try {
            const response = await fetch(`${BASE_URL}/movies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMovieObject)
            });

            if (!response.ok) {
                new Error(`Server Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            setMyMoviesCount(myMoviesCount + 1);
            console.log("Movie successfully saved:", responseData);

        }
        catch (error) {
            console.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
        finally {
            navigate('/movies/my_movies')
        }
    }


    const handleDeleteThisMoviePermanently = async (movieId) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })

            if (result.isConfirmed) {

                const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
                    method: 'DELETE',
                });
                const result = await response.json(); // Parse the JSON response

                if (!response.ok) new Error(result.message || 'Failed to delete coffee');

                setMyMoviesCount(myMoviesCount - 1);

                await Swal.fire({
                    title: "Deleted!",
                    text: "Your movie has been deleted.",
                    icon: "success"
                });

            } else if (result.isDenied) {
                await Swal.fire("Delete aborted", "", "info");
            }

        }
        catch (error) {
            console.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
        finally {
            navigate('/movies/category/all')
        }
    }


    useEffect(() => {
        const fetchMyMovies = async () => {
            try {
                if (user?.email) {
                    setMyMoviesLoading(true); // Show loading state

                    /* FETCHING USER ADDED MOVIES - MANUALLY */
                    /*const response = await fetch(`${BASE_URL}/movies/user_added_movies`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: user?.email })
                    });*/

                    /* FETCHING USER ADDED MOVIES - USING AXIOS */
                    /*const responseOld = await axios.post(
                        `${BASE_URL}/movies/user_added_movies`,
                        {email: user?.email},
                        {
                            headers: {"Content-Type": "application/json"},
                            withCredentials: true
                        }
                    );*/

                    /* FETCHING USER ADDED MOVIES - USING AXIOS-SECURE (CUSTOM HOOK) */
                    const response = await axiosSecure.post(
                        '/movies/user_added_movies',
                        {email: user?.email})

                    const moviesData = response?.data;
                    setMyMovies(moviesData);
                    setMyMoviesCount(moviesData.length);

                } else {
                    setMyMovies([]);
                    setMyMoviesCount(0);
                }

            } catch (error) {
                setMyMoviesError(error);
                toast.error(`ERROR MESSAGE: ${error.code || 'UNKNOWN'}: ${error.message || 'Something went wrong'}`);


            } finally {
                setMyMoviesLoading(false);
            }
        };
        fetchMyMovies().then();
    }, [axiosSecure, setMyMoviesCount, user?.email]);


    return {myMovies, myMoviesLoading, myMoviesError, myMoviesCount, handleAddThisNewMovie, handleDeleteThisMoviePermanently};
}

export default useMyMovieLoader;
