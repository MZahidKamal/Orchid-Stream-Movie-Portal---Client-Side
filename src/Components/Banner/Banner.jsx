import {useEffect, useState} from 'react';
import {FaChevronLeft, FaChevronRight, FaPlay, FaTimes} from 'react-icons/fa';
import { RiMovie2Line } from "react-icons/ri";
import {Link} from "react-router-dom";
import BASE_URL from "../../SharedUtilities/SharedUtilities.jsx";
import { motion } from "motion/react"


const getYouTubeVideoId = (url) => {
    // Remove 'https://youtu.be/' which is common to all video links, taking the rest, splitting the rest by '?si=' and taking the first part.
    return url.replace('https://youtu.be/', '').split('?si=')[0];
};


const Banner = () => {


    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [trailerIndex, setTrailerIndex] = useState(0);


    useEffect(() => {

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/movies/all`);
                const allMoviesData = await response.json();

                // Shuffle allMoviesData
                const shuffledMovies = allMoviesData.sort(() => 0.5 - Math.random());

                // Take the first three from the shuffled movies
                const random3Movies = shuffledMovies.slice(0, 3);

                setMovies(random3Movies);
            } catch (error) {
                console.error('Error fetching random 3 movies & 1 series:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovies().then();
    }, []);


    useEffect(() => {
        let timer;
        if (!isTrailerOpen) {
            timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % movies.length);
            }, 5000);
        }
        return () => clearInterval(timer);
    }, [movies.length, isTrailerOpen]);


    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
    };


    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % movies.length);
    };


    const openTrailer = () => {
        setIsTrailerOpen(true);
        setTrailerIndex(currentSlide);
    };


    const closeTrailer = () => {
        setIsTrailerOpen(false);
    };


    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };


    return (
        <div className="relative min-h-[calc(100vh-96px)] w-full overflow-hidden">

            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <p className="text-center text-gray-600 text-7xl animate-bounce">Loading...</p>
                </div>
            ) : (
                <>
                    {/* Slides */}
                    {movies.map((movie, index) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>

                            {/* Background Image with Gradient Overlay */}
                            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${movie?.posterUrl})` }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            </div>


                            {/* Content */}
                            <div className="relative h-full">
                                <div className="container mx-auto px-4 h-full flex items-center">
                                    <div className="max-w-2xl">

                                        {/* Genre Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {movie.genre.map((genre, index) => (
                                                <span key={index} className="inline-block px-3 py-1 bg-yellow-500 text-black text-sm font-semibold rounded-md">{genre}</span>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <motion.h1
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-ranchio">
                                            {movie.title}
                                        </motion.h1>

                                        {/* Movie Info */}
                                        <div className="flex items-center gap-4 text-white/80 mb-4">
                                            <span>{movie?.releaseYear}</span>
                                            <span className="border border-red-500 px-2 py-1 rounded text-sm">{movie.language[0]}</span>
                                            <span>{formatDuration(movie.duration)}</span>
                                        </div>

                                        {/* Synopsis */}
                                        <p className="text-white/70 text-sm md:text-base mb-8 line-clamp-3">{movie.summary}</p>

                                        {/* Buttons */}
                                        <div className="flex flex-wrap gap-4">

                                            <button onClick={openTrailer} className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors">
                                                <FaPlay />
                                                <span>Watch Trailer</span>
                                            </button>

                                            <button onClick={() => console.log('See Details')} className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full transition-colors">
                                                <RiMovie2Line className={'text-xl'}/>
                                                <Link to={`movies/all`}>See All Movies</Link>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button onClick={handlePrevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors">
                        <FaChevronLeft className="text-2xl"/>
                    </button>

                    <button onClick={handleNextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors">
                        <FaChevronRight className="text-2xl"/>
                    </button>
                </>
            )}



            {/* Trailer Modal */}
            {isTrailerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                    <div className="relative w-full max-w-5xl aspect-video">

                        <button onClick={closeTrailer} className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors">
                            <FaTimes className="text-3xl" />
                        </button>

                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(movies[trailerIndex]?.playLinks?.trailer)}?autoplay=1&playsinline=1&controls=0&modestbranding=0`}
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
    );
};


export default Banner;
