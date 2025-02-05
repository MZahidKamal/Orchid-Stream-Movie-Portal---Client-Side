import SeriesSliderCard from "../SeriesSliderCard/SeriesSliderCard.jsx";
import useSeriesLoader from "../../CustomHooks/useSeriesLoader.js";


const AllMovies = () => {


    const {series} = useSeriesLoader();


    return (
        <section className="bg-gradient-to-br from-[#450207] via-[#93040f] to-[#450207] py-16">
            <div className="w-11/12 lg:container mx-auto">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {series.map((series, index) => (
                        <SeriesSliderCard key={index} series={series}></SeriesSliderCard>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default AllMovies;
