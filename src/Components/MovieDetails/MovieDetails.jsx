import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneDelete } from "react-icons/ai";
import {useParams} from "react-router";
import {
    FaPlay,
    FaHeart,
    FaFilm,
    FaStar,
    FaCalendarAlt,
    FaClock,
    FaGlobe,
    FaMoneyBillWave,
    FaVideo,
    FaShoppingCart,
    FaTv,
    FaTimes
} from 'react-icons/fa';
import AuthContext from "../../Providers/AuthContext.jsx";
import useMovieLoader from "../../CustomHooks/useMovieLoader.js";
import useMyMovieLoader from "../../CustomHooks/useMyMovieLoader.js";
import useFavoriteMovieLoader from "../../CustomHooks/useFavoriteMovieLoader.js";


const getYouTubeVideoId = (url) => {
    // Remove 'https://youtu.be/' which is common to all video links, taking the rest, splitting the rest by '?si=' and taking the first part.
    return url.replace('https://youtu.be/', '').split('?si=')[0];
};


const MovieDetails = () => {


    const {user} = useContext(AuthContext);
    const params = useParams();
    const {movies: movie} = useMovieLoader(params);
    const {handleDeleteThisMoviePermanently} = useMyMovieLoader();
    const {handleAddThisMovieToFavorite, handleRemoveThisMovieFromFavorite} = useFavoriteMovieLoader();


    const [showTrailer, setShowTrailer] = useState(false);
    const navigate = useNavigate();
    const [movieOwnership, setMovieOwnership] = useState(false);
    const [isThisFavorite, setIsThisFavorite] = useState(false);


    const {
        _id,
        title,
        // type,
        genre,
        director,
        cast,
        releaseYear,
        duration,
        language,
        country,
        rating,
        // boxOffice: { budget, gross },
        summary,
        // availability: { streaming, rent, purchase },
        // playLinks: { fullMovie, trailer },
        videoQuality,
        categories,
        // cinemaSchedule,
        reviews,
        posterUrl,
        ingestedBy,
        addedToFavoriteBy
    } = movie;


    useEffect(() => {
        try {
            if (user && movie) {
                if (user?.email === ingestedBy) {
                    setMovieOwnership(true);
                } else {
                    setMovieOwnership(false);
                }
            }
        } catch (error) {
            console.error("An error occurred while checking movie ownership:", error);
        }
    }, [user, movie, ingestedBy]);


    useEffect(() => {
        try {
            if (user && movie) {
                if (movie?.addedToFavoriteBy?.includes(user?.email)) {
                    setIsThisFavorite(true);
                } else {
                    setIsThisFavorite(false);
                }
            }
        } catch (error) {
            console.error("An error occurred while checking movie ownership:", error);
        }
    }, [user, movie, addedToFavoriteBy]);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen pt-20 pb-36">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                        <img src={posterUrl} alt={title} className="w-full h-auto rounded-lg shadow-2xl" />
                    </div>
                    <div className="lg:w-2/3">

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-ranchio">{title}</h1>

                        <div className="flex flex-wrap gap-4 mb-6">
                            <span>Genre: </span>
                            {genre?.map((genre, index) => (
                                <span key={index}
                                      className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">{genre}</span>
                            )) ?? []}
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4">
                            <span>Categories:</span>
                            {categories?.map((category, index) => (
                                <span key={index}
                                      className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">{category}</span>
                            )) ?? []}
                        </div>

                        <p className="text-xl mb-6">{summary}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center">
                                <FaStar className="text-yellow-400 mr-2"/>
                                <span>Rating: {rating}/10</span>
                            </div>
                            <div className="flex items-center">
                                <FaCalendarAlt className="text-blue-400 mr-2"/>
                                <span>Release Year: {releaseYear}</span>
                            </div>
                            <div className="flex items-center">
                                <FaClock className="text-green-400 mr-2"/>
                                <span>Duration: {`${Math.floor(duration / 60)}h ${duration % 60}min`}</span>
                            </div>
                            <div className="flex items-center">
                                <FaGlobe className="text-purple-400 mr-2"/>
                                <span>Country: {country}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                            >
                                <FaPlay className="mr-2"/> Watch Trailer
                            </button>

                            {isThisFavorite? (
                                <button
                                    onClick={()=>handleRemoveThisMovieFromFavorite(_id)}
                                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                >
                                    <FaHeart className="mr-2"/> Remove from Favorite
                                </button>
                            ) : (
                                <button
                                    onClick={()=>handleAddThisMovieToFavorite(_id)}
                                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                >
                                    <FaHeart className="mr-2"/> Add to Favorite
                                </button>
                            )}

                            <button
                                onClick={() => navigate('/movies/category/all')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                            >
                                <FaFilm className="mr-2"/> See all Movies
                            </button>
                            {movieOwnership && (
                                <>
                                    <button
                                        onClick={()=>handleDeleteThisMoviePermanently('000')}
                                        //TODO: Will develop the update function later.
                                        className="bg-amber-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                    >
                                        <AiTwotoneDelete className="mr-2"/> Update Movie
                                    </button>
                                    <button
                                        onClick={()=>handleDeleteThisMoviePermanently(_id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                    >
                                        <AiTwotoneDelete className="mr-2"/> Delete Movie
                                    </button>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 font-ranchio">Movie Details</h2>
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <tbody>
                            <tr className="border-b border-gray-700">
                                <td className="py-3 px-4 font-semibold">Director</td>
                                <td className="py-3 px-4">{director}</td>
                            </tr>
                            <tr className="border-b border-gray-700 bg-gray-900">
                                <td className="py-3 px-4 font-semibold">Cast</td>
                                <td className="py-3 px-4">
                                    {cast?.map((actor, index) => (
                                        <div key={index} className="mb-1">
                                            {actor.name} as {actor.role}
                                        </div>
                                    )) ?? []}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-700">
                                <td className="py-3 px-4 font-semibold">Language</td>
                                <td className="py-3 px-4">{language?.join(', ') ?? 'N/A'}</td>
                            </tr>
                            <tr className="border-b border-gray-700 bg-gray-900">
                                <td className="py-3 px-4 font-semibold">Box Office</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <FaMoneyBillWave className="text-green-400 mr-2"/>
                                        Budget: ${movie?.boxOffice?.budget?.toLocaleString() ?? 'N/A'}
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <FaMoneyBillWave className="text-green-400 mr-2"/>
                                        Gross: ${movie?.boxOffice?.gross?.toLocaleString() ?? 'N/A'}
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-700">
                                <td className="py-3 px-4 font-semibold">Availability</td>
                                <td className="py-3 px-4">
                                    <div className="flex flex-wrap gap-2">
                                        {movie?.availability?.streaming?.map((platform, index) => (
                                            <span key={index}
                                                  className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs flex items-center"><FaTv
                                                className="mr-1"/> {platform}</span>
                                        )) ?? []}
                                        {movie?.availability?.rent?.map((platform, index) => (
                                            <span key={index}
                                                  className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs flex items-center"><FaVideo
                                                className="mr-1"/> {platform}</span>
                                        )) ?? []}
                                        {movie?.availability?.purchase?.map((platform, index) => (
                                            <span key={index}
                                                  className="bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center"><FaShoppingCart
                                                className="mr-1"/> {platform}</span>
                                        )) ?? []}
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-gray-900">
                                <td className="py-3 px-4 font-semibold">Video Quality</td>
                                <td className="py-3 px-4">{videoQuality?.join(', ') ?? 'N/A'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 font-ranchio">Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews?.map((review, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold">{review.reviewer}</h3>
                                    <div className="flex items-center">
                                        <FaStar className="text-yellow-400 mr-1" />
                                        <span>{review.rating}/10</span>
                                    </div>
                                </div>
                                <p className="text-gray-300">{review.comment}</p>
                            </div>
                        )) ?? []}
                    </div>
                </div>

                {showTrailer && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="relative w-full max-w-5xl aspect-video">

                            <button onClick={() => setShowTrailer(false)}
                                    className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors">
                                <FaTimes className="text-3xl"/>
                            </button>

                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(movie?.playLinks?.trailer)}?autoplay=1&playsinline=1&controls=0&modestbranding=0`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Movie Trailer"
                                frameBorder="0"
                            />

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default MovieDetails;
