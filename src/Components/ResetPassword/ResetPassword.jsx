import {useContext, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {FaEnvelope, FaPaperPlane, FaLock} from 'react-icons/fa';
import AuthContext from "../../Providers/AuthContext.jsx";
import {toast} from "react-toastify";


const ResetPassword = () => {


    const [formData, setFormData] = useState({
        email: '',
    });


    const {resetPassword} = useContext(AuthContext);
    const navigate = useNavigate();
    // const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const validateForm = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            //console.log('Form submitted:', formData);

            try {
                /* SENDING PASSWORD RESET EMAIL THROUGH FIREBASE */
                await resetPassword(formData.email);
                event.target.reset();
                setErrors({});
                setTimeout(() => {
                    navigate('/auth/sign_in');
                }, 200)
            } catch (error) {
                // Handle errors
                toast.error('ERROR MESSAGE B:', error.message);
            }
        }
    };


    return (
        <div
            className="min-h-[calc(100vh-96px-409px)] flex items-center justify-center from-purple-900 via-red-900 to-orange-900 bg-gray-900 bg-repeat py-5">
            <div
                className="bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-xl transform transition-all duration-500 hover:scale-105">
                <div className="relative">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-25"></div>
                    <div className="relative bg-gray-800 rounded-2xl p-10">
                        <div className={'flex justify-center items-center space-x-5 mb-2'}>
                            <div className="flex justify-center">
                                <div
                                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 p-1 animate-pulse">
                                    <div className="bg-gray-800 rounded-full p-2">
                                        <FaLock className="text-white text-xl"/>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
                                Reset Password</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400"/>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-700 text-white block w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Email Address"
                                        required/>
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300">
                                    <FaPaperPlane className="mr-2"/>
                                    Send password reset email
                                </button>
                            </div>
                        </form>
                        <div className="mt-2 text-center">
                            <Link to="/auth/registration" className="text-sm text-gray-300">
                                Not yet registered? Click <span
                                className={'font-bold italic hover:text-red-500'}>Registration</span>.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ResetPassword;
