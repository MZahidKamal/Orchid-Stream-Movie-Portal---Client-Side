import {useNavigate} from 'react-router-dom';
import {FaStar, FaClock, FaCalendarAlt, FaTrash, FaInfoCircle} from 'react-icons/fa';
import { TbCategoryPlus } from "react-icons/tb";
import useMyMovieLoader from "../../CustomHooks/useMyMovieLoader.js";
import useFavoriteMovieLoader from "../../CustomHooks/useFavoriteMovieLoader.js";
import {useContext} from "react";
import dataContext from "../../Providers/DataContext.jsx";


const MyMovies = () => {


    const {myMoviesCount, favoriteMoviesCount} = useContext(dataContext);
    const {myMovies} = useMyMovieLoader();
    const {favoriteMovies, handleRemoveThisMovieFromFavorite} = useFavoriteMovieLoader();
    const navigate = useNavigate();


    const handleDetails = (movieId) => {
        navigate(`/movies/id/${movieId}`);
    };


    return (
        <div
            className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-red-900 to-orange-900 bg-cover bg-center bg-no-repeat">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-12 font-ranchio">My Movies</h1>

                {/* Added Movies Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 font-ranchio">Added Movies</h2>
                    {myMoviesCount > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myMovies.map((movie) => (
                                <div key={movie?._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                    <div className="relative pb-[56.25%]">
                                        <img src={movie?.posterUrl || '/placeholder.svg'} alt={movie?.title} className="absolute h-full w-full object-cover"/>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-2xl font-ranchio text-white mb-2">{movie?.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                            <span className="flex items-center"><FaCalendarAlt
                                                className="mr-1 text-yellow-400"/> {movie?.releaseYear}</span>
                                            <span className="flex items-center"><FaClock
                                                className="mr-1 text-yellow-400"/> {`${Math.floor(movie?.duration / 60)}h ${movie?.duration % 60}min`}</span>
                                            <span className="flex items-center"><FaStar
                                                className="mr-1 text-yellow-400"/> {isNaN(movie?.rating) ? 'N/A' : movie?.rating}</span>
                                            <span className="flex items-center"><TbCategoryPlus
                                                className="mr-1 text-yellow-400 text-base"/> {isNaN(movie?.rating) ? 'N/A' : movie?.genre?.join(', ')}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => handleDetails(movie?._id)}
                                                className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                                            >
                                                <FaInfoCircle className="mr-1"/>See Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white text-center">No movies in this category yet.</p>
                    )}
                </div>

                {/* Favorite Movies Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 font-ranchio">Favorite Movies</h2>
                    {favoriteMoviesCount > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favoriteMovies?.map((movie) => (
                                <div key={movie?._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                    <div className="relative pb-[56.25%]">
                                        <img src={movie?.posterUrl || '/placeholder.svg'} alt={movie?.title} className="absolute h-full w-full object-cover"/>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-2xl font-ranchio text-white mb-2">{movie?.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                            <span className="flex items-center"><FaCalendarAlt className="mr-1 text-yellow-400"/> {movie?.releaseYear}</span>
                                            <span className="flex items-center"><FaClock className="mr-1 text-yellow-400"/> {`${Math.floor(movie?.duration / 60)}h ${movie?.duration % 60}min`}</span>
                                            <span className="flex items-center"><FaStar className="mr-1 text-yellow-400"/> {isNaN(movie?.rating) ? 'N/A' : movie?.rating}</span>
                                            <span className="flex items-center"><TbCategoryPlus className="mr-1 text-yellow-400 text-base"/> {isNaN(movie?.rating) ? 'N/A' : movie?.genre.join(', ')}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <button
                                                onClick={() => handleDetails(movie?._id)}
                                                className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                                            >
                                                <FaInfoCircle className="mr-1"/>See Details
                                            </button>
                                            <button
                                                onClick={() => handleRemoveThisMovieFromFavorite(movie?._id)}
                                                className="flex items-center px-3 py-1 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors"
                                            >
                                                <FaTrash className="mr-1"/>Remove from Favorites
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white text-center">No movies in this category yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyMovies;
