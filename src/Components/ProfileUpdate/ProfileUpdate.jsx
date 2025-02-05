import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaUser, FaImage, FaSave} from 'react-icons/fa';
import {GrContactInfo} from "react-icons/gr";
import AuthContext from "../../Providers/AuthContext.jsx";
import {toast} from "react-toastify";


const ProfileUpdate = () => {


    const [formData, setFormData] = useState({
        fullName: '',
        photoUrl: '',
    });


    const {user, updateExistingUsers} = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        setIsLoaded(true);
        setFormData({
            fullName: user.displayName,
            photoUrl: user.photoURL,
        });
    }, [user]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.photoUrl.trim()) {
            newErrors.photoUrl = 'Photo URL is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            //console.log('Form submitted:', formData);

            try {
                /* SIGNING UP THROUGH FIREBASE */
                await updateExistingUsers(formData.fullName, formData.photoUrl);
                event.target.reset();
                setErrors({});
            } catch (error) {
                /* HANDLING ERROR */
                toast.error('ERROR MESSAGE: ', error.message);
            } finally {
                navigate('/auth/user_profile');
            }
        }
    };


    return (
        <div
            className="min-h-[calc(100vh-96px-409px)] flex items-center justify-center bg-gradient-to-br from-purple-900 via-red-900 to-orange-900 bg-repeat py-5">
            <div
                className={`bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg p-2 rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-1000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <div className="relative">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-25"></div>
                    <div className="relative bg-gray-800 rounded-2xl p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col lg:flex-row justify-center items-center">
                                <div className="relative w-36 h-36 mx-auto">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full animate-spin-slow"></div>
                                    <img src={formData.photoUrl} alt="Profile"
                                         className="rounded-full object-cover w-full h-full border-4 border-gray-800 relative z-10"/>
                                    <div className="absolute bottom-0 right-0 bg-red-600 rounded-full p-2 z-20"><FaUser
                                        className="text-white text-xl"/></div>
                                </div>
                                <div className={'mx-auto'}>
                                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 mb-2">Hello,<br/><span
                                        className={'text-4xl'}>{formData.fullName}</span></h2>
                                    <div className="text-sm text-gray-300">
                                        We are thrilled to have you here as a member of our community!
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 bg-gray-700 bg-opacity-50 rounded-lg p-8 space-y-3">
                                <h3 className="text-xl font-semibold text-white mb-2 flex justify-center items-center">
                                    <GrContactInfo className={'mr-4 text-red-600 text-3xl'}/>
                                    Update Profile Information
                                </h3>
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Full
                                        Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required/>
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-300 mb-1">Photo
                                        URL</label>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            id="photoUrl"
                                            name="photoUrl"
                                            value={formData.photoUrl}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pl-10"
                                            placeholder="Photo URL"/>
                                        <FaImage
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                    </div>
                                    {errors.photoUrl && <p className="text-red-500 text-xs mt-1">{errors.photoUrl}</p>}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-1 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 hover:from-red-600 hover:via-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-all hover:scale-105">
                                    <FaSave className="mr-2"/>
                                    Save Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProfileUpdate;
