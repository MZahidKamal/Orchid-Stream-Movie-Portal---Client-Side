import {useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaHeart, FaSearch, FaChevronDown, FaBars, FaTimes, FaPlus} from 'react-icons/fa'
import AuthContext from "../../Providers/AuthContext.jsx";
import useGenreLoader from "../../CustomHooks/useGenreLoader.js";
import dataContext from "../../Providers/DataContext.jsx";


const Navbar = () => {


    const {user, signOutCurrentUser} = useContext(AuthContext);
    const {myMoviesCount, favoriteMoviesCount} = useContext(dataContext);
    const {genres} = useGenreLoader();


    //const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()


    const handleProfileClick = () => {
        navigate('/auth/user_profile')
    }


    return (
        <nav className="bg-gray-900 text-white py-4">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between">

                    {/* Left Section */}
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="flex items-center">
                            <span className="text-red-600 text-3xl md:text-5xl font-bold">Orchid</span>
                            <span className="text-white text-3xl md:text-5xl font-bold">Stream</span>
                        </Link>

                        <div className="hidden xl:flex items-center">
                            <Link to="/" className="px-3 py-2 hover:text-red-600 transition-colors">HOME</Link>
                            <div className="w-px h-6 bg-white/20"></div>
                            <Link to="/movies/category/all" className="px-3 py-2 hover:text-red-600 transition-colors">MOVIE</Link>
                            <div className="w-px h-6 bg-white/20"></div>
                            <Link to="/series/all" className="px-3 py-2 hover:text-red-600 transition-colors">SERIES</Link>
                            <div className="w-px h-6 bg-white/20"></div>
                            <div className="relative group">
                                <button
                                    onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                                    className="px-3 py-2 hover:text-red-600 transition-colors flex items-center">
                                    GENRES
                                    <FaChevronDown className="ml-1"/>
                                </button>
                                {isGenreDropdownOpen && (
                                    <div
                                        className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                                        {
                                            genres.map((genre) => (
                                                <Link
                                                    key={genre}
                                                    to={`/movies/genres/${genre}`}
                                                    onClick={() => setIsGenreDropdownOpen(false)}
                                                    className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors">
                                                    {genre}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Middle Section - Search */}
                    <div className="hidden md:block flex-1 max-w-sm mx-auto px-5">
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="w-full bg-gray-800 rounded-full min-w-10 min-h-10 py-2 px-4 focus:outline-none border border-white/20"/>
                            <button className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white">
                                <FaSearch className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        {
                            user ? (
                                <>
                                    <button
                                        onClick={handleProfileClick}
                                        className="flex items-center space-x-2 hover:bg-gray-800 rounded-lg transition-colors"
                                        title={user.displayName}>

                                        <img src={user.photoURL} alt="Profile"
                                             className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"/>
                                        <div className="hidden lg:block text-left">
                                            <p className="text-sm font-medium">{user.displayName}</p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                        </div>
                                    </button>

                                    <div className="relative" title={"Add Movie"}>
                                        <Link to="/movies/add_movie">
                                            <FaPlus className="w-6 h-6 text-gray-400 hover:text-green-600 transition-colors"/>
                                            {myMoviesCount > 0 && (
                                                <span className="absolute -top-4 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{myMoviesCount}</span>
                                            )}
                                        </Link>
                                    </div>

                                    <div className="relative" title={"My Favorites"}>
                                        <Link to="/movies/my_movies">
                                            <FaHeart className="w-6 h-6 text-gray-400 hover:text-red-600 transition-colors"/>
                                            {favoriteMoviesCount > 0 && (
                                                <span className="absolute -top-4 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{favoriteMoviesCount}</span>
                                            )}
                                        </Link>
                                    </div>

                                    <button
                                        onClick={signOutCurrentUser}
                                        className="hidden lg:block bg-red-600 hover:bg-red-700 text-white w-24 px-4 py-2 rounded-full text-sm text-center transition-colors">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={'/auth/sign_in'}
                                        className="hidden lg:block bg-red-600 hover:bg-red-700 text-white w-20 px-4 py-2 rounded-full text-sm text-center transition-colors">
                                        Sign In
                                    </Link>
                                    <Link
                                        to={'/auth/registration'}
                                        className="hidden lg:block bg-red-600 hover:bg-red-700 text-white w-20 px-4 py-2 rounded-full text-sm text-center transition-colors">
                                        Register
                                    </Link>
                                </>
                            )
                        }

                        {/* Mobile Menu Button */}
                        <button
                            className="xl:hidden text-gray-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {
                                isMobileMenuOpen ? <FaTimes className="w-6 h-6"/> : <FaBars className="w-6 h-6"/>
                            }
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="xl:hidden mt-4 pb-4 border-t border-gray-700">
                        <div className="flex flex-col space-y-4 mt-4">
                            <Link to="/" className="hover:text-red-600 transition-colors">HOME</Link>
                            <Link to="/movies" className="hover:text-red-600 transition-colors">MOVIE</Link>
                            <Link to="/serieses" className="hover:text-red-600 transition-colors">SERIES</Link>
                            <button
                                onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                                className="text-left hover:text-red-600 transition-colors flex items-center justify-between">
                                GENRES <FaChevronDown className="ml-1"/>
                            </button>
                            {isGenreDropdownOpen && (
                                <div className="pl-4 space-y-2">
                                    {
                                        genres.map((genre) => (
                                            <Link
                                                key={genre}
                                                to={`/${genre.toLowerCase().replace(' ', '-')}`}
                                                className="block text-sm hover:text-red-600 transition-colors">
                                                {genre}
                                            </Link>
                                        ))
                                    }
                                </div>
                            )}
                            <div className="pt-4 border-t border-gray-700">
                                {
                                    user ? (
                                        <button
                                            onClick={signOutCurrentUser}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm transition-colors">
                                            Sign Out
                                        </button>
                                    ) : (
                                        <>
                                            <Link
                                                to={'/auth/sign_in'}
                                                className="w-full mb-2 text-white hover:text-red-600 px-4 py-2 text-sm flex flex-grow justify-center items-center border border-white/30 rounded-full transition-colors">
                                                Sign In
                                            </Link>
                                            <Link
                                                to={'/auth/registration'}
                                                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm flex flex-grow justify-center items-center transition-colors">
                                                Register
                                            </Link>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}


export default Navbar;
