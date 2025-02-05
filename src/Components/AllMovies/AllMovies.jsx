import MovieSliderCard from "../MovieSliderCard/MovieSliderCard.jsx";
import {useParams} from "react-router";
import useMovieLoader from "../../CustomHooks/useMovieLoader.js";


const AllMovies = () => {


    const params = useParams();
    const {movies: selectedMovies} = useMovieLoader(params);


    return (
        <section className="bg-gradient-to-br from-[#450207] via-[#93040f] to-[#450207] py-16">
            <div className="w-11/12 lg:container mx-auto">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {
                        selectedMovies?.map((movie, index) => (
                            <MovieSliderCard key={index} movie={movie}></MovieSliderCard>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};


export default AllMovies;
