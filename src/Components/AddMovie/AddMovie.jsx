import './AddMovie.css'
import { useContext, useState } from 'react';
import { FaFilm, FaPlus, FaTrash } from 'react-icons/fa';
import AuthContext from "../../Providers/AuthContext.jsx";
import useGenreLoader from "../../CustomHooks/useGenreLoader.js";
import useCategoryLoader from "../../CustomHooks/useCategoryLoader.js";
import useMyMovieLoader from "../../CustomHooks/useMyMovieLoader.js";
import { toast } from "react-toastify";
import { Rating } from 'react-simple-star-rating';


const initialFormState = {
    title: '',
    type: '',
    genre: [],
    director: '',
    cast: [{ name: '', role: '' }],
    releaseYear: '',
    duration: '',
    language: [],
    country: '',
    rating: '',
    boxOffice: {
        budget: '',
        gross: ''
    },
    summary: '',
    availability: {
        streaming: [],
        rent: [],
        purchase: []
    },
    playLinks: {
        fullMovie: '',
        trailer: ''
    },
    videoQuality: [],
    categories: [],
    cinemaSchedule: [],
    reviews: [],
    posterUrl: '',
    ingestedBy: '',
    addedToFavoriteBy: []
};


const languages = [
    "English", "Spanish", "French", "German", "Italian",
    "Mandarin", "Japanese", "Korean", "Hindi", "Arabic"
];


const countries = [
    "United States", "United Kingdom", "France", "Germany", "Italy",
    "Spain", "Canada", "Australia", "Japan", "South Korea",
    "China", "India", "Brazil", "Mexico", "Russia"
];


const videoQualityOptions = ['480p', '720p', '1080p', '1440p', '4K', '8K'];


const availabilityOptions = {
    streaming: [
        "Netflix", "Amazon Prime Video", "HBO Max", "Disney+", "Apple TV+",
        "Hulu", "Peacock", "Paramount+", "Crave", "Sky Store"
    ],
    rent: [
        "Google Play", "YouTube", "Amazon Prime Video", "Apple iTunes",
        "Microsoft Store", "Vudu", "FandangoNOW", "Redbox", "Rakuten TV", "PlayStation Store"
    ],
    purchase: [
        "iTunes", "Microsoft Store", "Amazon Prime Video", "Google Play Movies",
        "Vudu", "Apple TV+", "FandangoNOW", "Rakuten TV", "PlayStation Store", "Xbox Store"
    ]
};


const AddMovie = () => {
    const [formData, setFormData] = useState(initialFormState);
    const { user } = useContext(AuthContext);
    const { genres } = useGenreLoader();
    const { categories } = useCategoryLoader();
    const { handleAddThisNewMovie } = useMyMovieLoader();
    const [errors, setErrors] = useState({});


    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;

        if (name === 'rating') {
            setFormData(prevState => ({ ...prevState, rating: Number(value) }));
        } else if (type === 'checkbox') {
            if (name === 'genres' || name === 'language' || name === 'videoQuality' || name === 'categories') {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: checked
                        ? [...prevState[name], value]
                        : prevState[name].filter(item => item !== value)
                }));
            } else if (name.startsWith('availability.')) {
                const [, category] = name.split('.');
                setFormData(prevState => ({
                    ...prevState,
                    availability: {
                        ...prevState.availability,
                        [category]: checked
                            ? [...(prevState.availability[category] || []), value]
                            : (prevState.availability[category] || []).filter(item => item !== value)
                    }
                }));
            } else {
                setFormData(prevState => ({ ...prevState, [name]: checked }));
            }
        } else if (name === 'name' || name === 'role') {
            setFormData(prevState => ({
                ...prevState,
                cast: prevState.cast.map((member, i) => (
                    i === index ? { ...member, [name]: value } : member
                ))
            }));
        } else if (name.startsWith('boxOffice.')) {
            const key = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                boxOffice: {
                    ...prevState.boxOffice,
                    [key]: Number(value)
                }
            }));
        } else if (name.startsWith('playLinks.')) {
            const key = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                playLinks: {
                    ...prevState.playLinks,
                    [key]: value
                }
            }));
        } else if (name === 'country') {
            setFormData(prevState => ({
                ...prevState,
                country: value
            }));
        } else if (name === 'releaseYear' || name === 'duration') {
            setFormData(prevState => ({
                ...prevState,
                [name]: Number(value)
            }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };


    const addCastMember = () => {
        setFormData(prevState => ({
            ...prevState,
            cast: [...prevState.cast, { name: '', role: '' }]
        }));
    };


    const removeCastMember = (index) => {
        setFormData(prevState => ({
            ...prevState,
            cast: prevState.cast.filter((_, i) => i !== index)
        }));
    };


    const validateFormData = () => {
        let newErrors = {};

        if (!formData.title || formData.title.length < 3 || formData.title.length > 50) {
            newErrors.title = 'Title must be between 3 and 50 characters long.';
        }

        if (formData.genres.length === 0) {
            newErrors.genres = 'Please select at least one genre.';
        }

        if (!formData.director || formData.director.length < 2 || formData.director.length > 50) {
            newErrors.director = 'Director name must be between 2 and 50 characters long.';
        }

        if (formData.cast.length === 0) {
            newErrors.cast = 'Please add at least one cast member.';
        } else {
            formData.cast.forEach((member, index) => {
                if (!member.name || member.name.length < 2 || member.name.length > 50) {
                    newErrors[`cast.${index}.name`] = 'Cast member name must be between 2 and 50 characters long.';
                }
                if (!member.role || member.role.length < 2 || member.role.length > 50) {
                    newErrors[`cast.${index}.role`] = 'Cast member role must be between 2 and 50 characters long.';
                }
            });
        }

        if (!formData.releaseYear) {
            newErrors.releaseYear = 'Please select a release year.';
        }

        if (!formData.duration || formData.duration < 60 || formData.duration > 210) {
            newErrors.duration = 'Duration must be between 60 and 210 minutes.';
        }

        if (formData.language.length === 0) {
            newErrors.language = 'Please select at least one language.';
        }

        if (!formData.country) {
            newErrors.country = 'Please select a country.';
        }

        if (!formData.playLinks.fullMovie) {
            newErrors.playLinks = 'Please provide a full movie link.';
        }
        if (!formData.playLinks.trailer) {
            newErrors.playLinks = (newErrors.playLinks) ? newErrors.playLinks + " Please provide a trailer link." : 'Please provide a trailer link.';
        }

        if (formData.videoQuality.length === 0) {
            newErrors.videoQuality = 'Please select at least one video quality.';
        }

        if (formData.categories.length === 0) {
            newErrors.categories = 'Please select at least one category.';
        }

        if (Object.values(formData.availability).every(arr => arr.length === 0)) {
            newErrors.availability = 'Please select at least one availability option.';
        }

        if (!formData.summary || formData.summary.length < 10 || formData.summary.length > 500) {
            newErrors.summary = 'Summary must be between 10 and 500 characters long.';
        }

        if (!formData.boxOffice.budget || isNaN(formData.boxOffice.budget) || formData.boxOffice.budget <= 0) {
            newErrors.boxOffice = 'Please enter a valid budget.';
        }

        if (!formData.boxOffice.gross || isNaN(formData.boxOffice.gross) || formData.boxOffice.gross <= 0) {
            newErrors.boxOffice = (newErrors.boxOffice ? newErrors.boxOffice + ' ' : '') + 'Please enter a valid gross amount.';
        }

        if (formData.rating === 0) {
            newErrors.rating = 'Please provide a rating.';
        }

        if (!formData.posterUrl) {
            newErrors.posterUrl = 'Please provide a poster URL.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmitAddNewMovie = async (event) => {
        event.preventDefault();

        if (user && validateFormData) {
            formData.type = 'Movie';
            formData.ingestedBy = user?.email;
            handleAddThisNewMovie(formData).then();
            console.log(formData);
            toast.success('Movie added successfully!');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-900 to-orange-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 mb-8 font-ranchio">Add New Movie</h2>
                    <form onSubmit={handleSubmitAddNewMovie} className="space-y-6">

                        {/* MOVIE TITLE - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label htmlFor="title" className="ml-1 mb-1 block text-sm font-medium text-blue-500">Title*</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Movie Title"
                                value={formData.title}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        {/* GENRES - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Genres*</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {genres.map((genre) => (
                                    <label key={genre} className="text-sm inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="genres"
                                            value={genre}
                                            checked={formData.genres?.includes(genre)}
                                            onChange={(e) => handleChange(e)}
                                            className="form-checkbox h-4 w-4 text-red-600"
                                        />
                                        <span className="ml-2 text-gray-300">{genre}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.genres && <p className="text-red-500 text-xs mt-1">{errors.genres}</p>}
                        </div>

                        {/* DIRECTOR - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label htmlFor="director" className="ml-1 mb-1 block text-sm font-medium text-blue-500">Director*</label>
                            <input
                                type="text"
                                name="director"
                                id="director"
                                className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Movie Director"
                                value={formData.director}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            {errors.director && <p className="text-red-500 text-xs mt-1">{errors.director}</p>}
                        </div>

                        {/* CAST - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Cast*</label>
                            {formData.cast.map((member, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Actor Name"
                                        value={member.name}
                                        onChange={(e) => handleChange(e, index)}
                                        className="bg-gray-700 text-white flex-1 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="role"
                                        placeholder="Character Role"
                                        value={member.role}
                                        onChange={(e) => handleChange(e, index)}
                                        className="bg-gray-700 text-white flex-1 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        required
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeCastMember(index)}
                                            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            <FaTrash/>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addCastMember}
                                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <FaPlus className="mr-2"/>
                                Add Cast Member
                            </button>
                            {errors.cast && <p className="text-red-500 text-xs mt-1">{errors.cast}</p>}
                        </div>

                        {/* RELEASE YEAR - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label htmlFor="releaseYear" className="ml-1 mb-1 block text-sm font-medium text-blue-500">Release Year*</label>
                            <input
                                type="number"
                                name="releaseYear"
                                id="releaseYear"
                                className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Release Year"
                                value={formData.releaseYear}
                                onChange={handleChange}
                                required
                            />
                            {errors.releaseYear && <p className="text-red-500 text-xs mt-1">{errors.releaseYear}</p>}
                        </div>

                        {/* DURATION - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label htmlFor="duration" className="ml-1 mb-1 block text-sm font-medium text-blue-500">Duration (minutes)*</label>
                            <input
                                type="number"
                                name="duration"
                                id="duration"
                                className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Movie Duration"
                                value={formData.duration}
                                onChange={handleChange}
                                min="60"
                                max="210"
                                required
                            />
                            {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                        </div>

                        {/* LANGUAGE - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Language*</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {languages.map((lang) => (
                                    <label key={lang} className="text-sm inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="language"
                                            value={lang}
                                            checked={formData.language.includes(lang)}
                                            onChange={(e) => handleChange(e)}
                                            className="form-checkbox h-4 w-4 text-red-600"
                                        />
                                        <span className="ml-2 text-gray-300">{lang}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language}</p>}
                        </div>

                        {/* COUNTRY - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Country*</label>
                            <select
                                name="country"
                                id="country"
                                className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Country</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                        </div>

                        {/* RATING - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Rating*</label>
                            <div className="flex items-center space-x-1 rating-container">
                                <Rating
                                    onClick={(rate) => setFormData(prevState => ({ ...prevState, rating: rate }))}
                                    initialValue={formData.rating * 2}
                                    allowFraction
                                    size={30}
                                    fillColor="#EF4444"
                                    iconsCount={10}
                                />
                            </div>
                            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                        </div>

                        {/* BOX OFFICE - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Box Office*</label>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        name="boxOffice.budget"
                                        id="budget"
                                        className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        placeholder="Budget (USD)"
                                        value={formData.boxOffice.budget}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        name="boxOffice.gross"
                                        id="gross"
                                        className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        placeholder="Gross (USD)"
                                        value={formData.boxOffice.gross}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {errors.boxOffice && <p className="text-red-500 text-xs mt-1">{errors.boxOffice}</p>}
                        </div>

                        {/* SUMMARY - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label htmlFor="summary" className="ml-1 mb-1 block text-sm font-medium text-blue-500">Summary*</label>
                            <textarea
                                name="summary"
                                id="summary"
                                rows="3"
                                className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Movie Summary"
                                value={formData.summary}
                                onChange={handleChange}
                                required
                            ></textarea>
                            {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary}</p>}
                        </div>

                        {/* AVAILABILITY - required */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-gray-300">Availability*</label>
                            {Object.entries(availabilityOptions).map(([category, options]) => (
                                <div key={category} className="mb-4">
                                    <h4 className="text-sm font-medium text-blue-500 capitalize mb-2">{category}:</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        {options.map((option) => (
                                            <label key={option} className="text-sm inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name={`availability.${category}`}
                                                    value={option}
                                                    checked={formData.availability[category]?.includes(option)}
                                                    onChange={(e) => {
                                                        const { checked, value } = e.target;
                                                        setFormData(prevState => ({
                                                            ...prevState,
                                                            availability: {
                                                                ...prevState.availability,
                                                                [category]: checked
                                                                    ? [...(prevState.availability[category] || []), value]
                                                                    : (prevState.availability[category] || []).filter(item => item !== value)
                                                            }
                                                        }));
                                                    }}
                                                    className="form-checkbox h-4 w-4 text-red-600"
                                                />
                                                <span className="ml-2 text-gray-300">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
                        </div>

                        {/* Play Links */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Play Links*</label>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <input
                                        type="url"
                                        name="playLinks.fullMovie"
                                        id="fullMovie"
                                        className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        placeholder="Full Movie Link"
                                        value={formData.playLinks.fullMovie}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="url"
                                        name="playLinks.trailer"
                                        id="trailer"
                                        className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        placeholder="Trailer Link"
                                        value={formData.playLinks.trailer}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {errors.playLinks && <p className="text-red-500 text-xs mt-1">{errors.playLinks}</p>}
                        </div>

                        {/* Video Quality */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Video Quality*</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {videoQualityOptions.map((quality) => (
                                    <label key={quality} className="text-sm inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="videoQuality"
                                            value={quality}
                                            checked={formData.videoQuality.includes(quality)}
                                            onChange={(e) => handleChange(e)}
                                            className="form-checkbox h-4 w-4 text-red-600"
                                        />
                                        <span className="ml-2 text-gray-300">{quality}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.videoQuality && <p className="text-red-500 text-xs mt-1">{errors.videoQuality}</p>}
                        </div>

                        {/* Categories */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label className="ml-1 mb-1 block text-sm font-medium text-blue-500">Categories*</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {categories.map((category) => (
                                    <label key={category} className="text-sm inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="categories"
                                            value={category}
                                            checked={formData.categories.includes(category)}
                                            onChange={(e) => handleChange(e)}
                                            className="form-checkbox h-4 w-4 text-red-600"
                                        />
                                        <span className="ml-2 text-gray-300">{category}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.categories && <p className="text-red-500 text-xs mt-1">{errors.categories}</p>}
                        </div>

                        {/* Add Poster URL field */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <label htmlFor="posterUrl" className="ml-1 mb-1 block text-sm font-medium text-blue-500">Poster URL*</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="posterUrl"
                                    id="posterUrl"
                                    className="bg-gray-700 text-white block w-full px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    placeholder="Poster URL"
                                    value={formData.posterUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {errors.posterUrl && <p className="text-red-500 text-xs mt-1">{errors.posterUrl}</p>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                <FaFilm className="mr-2 h-5 w-5"/>
                                Add Movie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default AddMovie;
