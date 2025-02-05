import PropTypes from "prop-types";
import {useContext, useEffect} from "react";
import DataContext from "./DataContext.jsx";
import {useState} from "react";
import AuthContext from "./AuthContext.jsx";
// import {toast} from "react-toastify";
import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import axios from "axios";


const DataProvider = ({children}) => {


    const {user} = useContext(AuthContext);
    const [myMoviesCount, setMyMoviesCount] = useState(0);
    const [favoriteMoviesCount, setFavoriteMoviesCount] = useState(0);


    useEffect(() => {
        /* FETCHING USER ADDED MOVIES COUNT - USING AXIOS */
        const fetchUserAddedMoviesCount = async () => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/movies/user_added_movies_count`,
                    {email: user?.email},
                    {
                        headers: {"Content-Type": "application/json"},
                        withCredentials: true
                    }
                );
                // console.log(response?.data?.count);
                setMyMoviesCount(response?.data?.count);
            }
            catch (error) {
                console.error("Error fetching count:", error);
            }
        }
        fetchUserAddedMoviesCount().then();
    }, [user?.email]);


    useEffect(() => {
        /* FETCHING USER FAVORITE MOVIES COUNT - USING AXIOS */
        const fetchUserFavoriteMoviesCount = async () => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/movies/user_favorite_movies_count`,
                    {email: user?.email},
                    {
                        headers: {"Content-Type": "application/json"},
                        withCredentials: true
                    }
                );
                // console.log(response?.data?.count);
                setFavoriteMoviesCount(response?.data?.count);
            }
            catch (error) {
                console.error("Error fetching count:", error);
            }
        }
        fetchUserFavoriteMoviesCount().then();
    }, [user?.email]);


    const dataInfo = {
        myMoviesCount,
        setMyMoviesCount,
        favoriteMoviesCount,
        setFavoriteMoviesCount,
    };


    return (
        <div>
            <DataContext.Provider value={dataInfo}>
                {children}
            </DataContext.Provider>
        </div>
    );
};


DataProvider.propTypes = {
    children: PropTypes.node,
}

export default DataProvider;
