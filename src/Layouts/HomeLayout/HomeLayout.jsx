import Banner from "../../Components/Banner/Banner.jsx";
import FeaturedMoviesSlider from "../../Components/FeaturedMoviesSlider/FeaturedMoviesSlider.jsx";
import TrendingMoviesSlider from "../../Components/TrendingMoviesSlider/TrendingMoviesSlider.jsx";
import UpcomingMoviesSlider from "../../Components/UpcomingMoviesSlider/UpcomingMoviesSlider.jsx";
import PopularSeriesSlider from "../../Components/PopularSeriesSlider/PopularSeriesSlider.jsx";


const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedMoviesSlider></FeaturedMoviesSlider>
            <TrendingMoviesSlider></TrendingMoviesSlider>
            <UpcomingMoviesSlider></UpcomingMoviesSlider>
            <PopularSeriesSlider></PopularSeriesSlider>
        </div>
    );
};


export default HomeLayout;
