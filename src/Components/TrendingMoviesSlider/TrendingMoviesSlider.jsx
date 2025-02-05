import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import MovieSliderCard from "../MovieSliderCard/MovieSliderCard.jsx";
import useMovieLoader from "../../CustomHooks/useMovieLoader.js";


const TrendingMoviesSlider = () => {


    const {movies: trendingMovies} = useMovieLoader({category: 'Trending'});
    const [displayedMovies, setDisplayedMovies] = useState([])


    useEffect(() => {
        const shuffleMovies = () => {
            const shuffled = [...trendingMovies].sort(() => 0.5 - Math.random())
            setDisplayedMovies(shuffled.slice(0, 4))
        }

        shuffleMovies()
        const interval = setInterval(shuffleMovies, 4000)

        return () => clearInterval(interval)
    }, [trendingMovies])


    return (
        <section className="bg-gradient-to-br from-[#450207] via-[#93040f] to-[#450207] py-16">
            <div className="w-11/12 lg:container mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-300">Trending Movies</h2>
                    <Link to="/movies/category/trending" className="flex items-center text-gray-300 hover:text-white transition-colors">
                        <p className="text-sm md:text-base text-gray-300 font-bold">See All</p>
                        <FaChevronRight className="ml-2 w-4 h-4"/>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                    {displayedMovies.map((movie, index) => (
                        <MovieSliderCard key={index} movie={movie} ></MovieSliderCard>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default TrendingMoviesSlider;
