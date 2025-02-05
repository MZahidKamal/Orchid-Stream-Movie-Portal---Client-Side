import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPlay } from 'react-icons/fa'


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center">
                            <FaPlay className="text-red-600 text-3xl mr-2" />
                            <span className="text-red-600 text-2xl font-bold">Orchid</span>
                            <span className="text-white text-2xl font-bold">Stream</span>
                        </Link>
                        <p className="text-sm text-gray-400">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-red-600">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/movies" className="text-gray-400 hover:text-white transition-colors">Movies</Link></li>
                            <li><Link to="/tv-shows" className="text-gray-400 hover:text-white transition-colors">TV Shows</Link></li>
                            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help</Link></li>
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-red-600">Important Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">Latest News</Link></li>
                            <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing Plan</Link></li>
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-red-600">Subscribe</h3>
                        <p className="text-sm text-gray-400 mb-4">Subscribe our newsletter to get latest update & news.</p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} OrchidStream - All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
