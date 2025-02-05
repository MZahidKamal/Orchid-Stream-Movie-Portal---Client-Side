import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    FaPlay,
    FaHeart,
    FaFilm,
    FaStar,
    FaCalendarAlt,
    FaClock,
    FaGlobe,
    FaTv,
    FaTimes,
    FaListOl
} from 'react-icons/fa';
import BASE_URL from "../../SharedUtilities/SharedUtilities.jsx";


const getYouTubeVideoId = (url) => {
    return url.replace('https://youtu.be/', '').split('?si=')[0];
};


const SeriesDetails = () => {


    const { id } = useParams();
    const [series, setSeries] = useState({});
    const [showTrailer, setShowTrailer] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchSeries = async () => {
            const response = await fetch(`${BASE_URL}/series/${id}`);
            const data = await response.json();
            setSeries(data);
        };
        fetchSeries().then();
    }, [id]);


    const handleAddToFavorite = () => {
        console.log('Added to Favorite successfully');
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen pt-20 pb-36">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                        <img src={series.posterUrl} alt={series.title} className="w-full h-auto rounded-lg shadow-2xl" />
                    </div>
                    <div className="lg:w-2/3">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-ranchio">{series.title}</h1>

                        <div className="flex flex-wrap gap-4 mb-6">
                            <span>Genre: </span>
                            {series.genre?.map((genre, index) => (
                                <span key={index} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">{genre}</span>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4">
                            <span>Categories:</span>
                            {series.categories?.map((category, index) => (
                                <span key={index} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">{category}</span>
                            ))}
                        </div>

                        <p className="text-xl mb-6">{series.synopsis}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center">
                                <FaStar className="text-yellow-400 mr-2" />
                                <span>Rating: {series.rating}/10</span>
                            </div>
                            <div className="flex items-center">
                                <FaCalendarAlt className="text-blue-400 mr-2" />
                                <span>Release Year: {series.releaseYear}</span>
                            </div>
                            <div className="flex items-center">
                                <FaClock className="text-green-400 mr-2" />
                                <span>Runtime: {series.runtimePerEpisode}</span>
                            </div>
                            <div className="flex items-center">
                                <FaGlobe className="text-purple-400 mr-2" />
                                <span>Country: {series.country}</span>
                            </div>
                            <div className="flex items-center">
                                <FaListOl className="text-orange-400 mr-2" />
                                <span>Seasons: {series.seasons}</span>
                            </div>
                            <div className="flex items-center">
                                <FaTv className="text-indigo-400 mr-2" />
                                <span>Episodes: {series.episodesPerSeason?.join(', ')}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                            >
                                <FaPlay className="mr-2" /> Watch Trailer
                            </button>
                            <button
                                onClick={handleAddToFavorite}
                                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                            >
                                <FaHeart className="mr-2" /> Add to Favorite
                            </button>
                            <button
                                onClick={() => navigate('/series/all')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                            >
                                <FaFilm className="mr-2" /> See all Series
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 font-ranchio">Series Details</h2>
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <tbody>
                            <tr className="border-b border-gray-700">
                                <td className="py-3 px-4 font-semibold">Director</td>
                                <td className="py-3 px-4">{series.director?.join(', ')}</td>
                            </tr>
                            <tr className="border-b border-gray-700 bg-gray-900">
                                <td className="py-3 px-4 font-semibold">Cast</td>
                                <td className="py-3 px-4">
                                    {series.cast?.map((actor, index) => (
                                        <div key={index} className="mb-1">
                                            {actor.name} as {actor.role}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-700">
                                <td className="py-3 px-4 font-semibold">Language</td>
                                <td className="py-3 px-4">{series.language?.join(', ') ?? 'N/A'}</td>
                            </tr>
                            <tr className="border-b border-gray-700 bg-gray-900">
                                <td className="py-3 px-4 font-semibold">Availability</td>
                                <td className="py-3 px-4">
                                    <div className="flex flex-wrap gap-2">
                                        {series.availability?.streaming?.map((platform, index) => (
                                            <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
                          <FaTv className="mr-1" /> {platform}
                        </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-700">
                                <td className="py-3 px-4 font-semibold">Video Quality</td>
                                <td className="py-3 px-4">
                                    {series.videoQuality?.join(', ') ?? 'N/A'}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 font-ranchio">Episodes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {series.episodes?.map((episode, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-2">Season {episode.season}, Episode {episode.episode}</h3>
                                <p className="text-lg mb-2">{episode.title}</p>
                                <p className="text-gray-400">Release Year: {episode.releaseYear}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 font-ranchio">Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {series.reviews?.map((review, index) => (
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
                        ))}
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
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(series?.playLinks?.trailer)}?autoplay=1&playsinline=1&controls=0&modestbranding=0`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Series Trailer"
                                frameBorder="0"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default SeriesDetails;
