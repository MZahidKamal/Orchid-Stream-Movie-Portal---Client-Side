import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {useState} from "react";
import { IoIosStar } from "react-icons/io";


const SeriesSliderCard = ({series}) => {

    const {_id, title, posterUrl, genre, seasons, rating} = series;

    const [hoveredCard, setHoveredCard] = useState(false)

    return (
        <div
            onMouseEnter={() => setHoveredCard(true)}
            onMouseLeave={() => setHoveredCard(false)}
            className="border border-gray-500 relative group rounded-lg overflow-hidden cursor-pointer aspect-[9/6] transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
            {/*Image Container*/}
            <div className="absolute inset-0">
                <img src={posterUrl} alt={title} className="w-full h-full object-cover"/>
            </div>

            {/*Gradient Overlay*/}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"/>

            {/*Rating*/}
            {rating &&
                <div className="absolute top-2 right-2 text-yellow-300 text-base bg-gray-700 px-2 py-0 flex justify-center items-center space-x-1 rounded-lg ">
                    <p>{rating}</p>
                    <IoIosStar/>
                </div>
            }

            {/*Content*/}
            <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-white font-bold text-xl mb-1 font-ranchio">{title}</h3>
                <p className="text-gray-300 text-sm">{genre.join(', ')}</p>
                <p className="text-gray-300 text-sm bg-red-500 inline px-2 rounded-sm ">{seasons} Seasons</p>
            </div>

            {hoveredCard &&
                <Link
                    to={`/series/id/${_id}`}
                    className={`absolute bottom-3 right-2 bg-white/10 backdrop-blur-sm text-white px-4 py-1 rounded-full text-xs hover:bg-white/20 transition-all duration-300`}>
                    Explore more
                </Link>
            }

        </div>
    );
};


SeriesSliderCard.propTypes = {
    series: PropTypes.object,
}


export default SeriesSliderCard;
