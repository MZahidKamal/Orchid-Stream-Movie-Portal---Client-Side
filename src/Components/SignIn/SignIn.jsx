import {useContext, useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../../Providers/AuthContext.jsx";
import {toast} from "react-toastify";
import Lottie from "lottie-react";
import signInLottieAnimationData from "../../assets/LottieFiles/Sign In/Animation - 1733840294772.json";


const SignIn = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const {user, signInExistingUsers, signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const togglePasswordVisibility = () => setShowPassword(!showPassword);


    const validateForm = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (!passwordPattern.test(formData.password)) {
            newErrors.password = `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character like @ $ ! % * ? & #.`;
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {

            try {
                /* SIGNING IN THROUGH FIREBASE */
                await signInExistingUsers(formData.email, formData.password);
                event.target.reset();
                setErrors({});
                // navigate('/auth/user_profile');
            }catch (error) {
                toast.error('ERROR MESSAGE B:', error.message);
            }
        }
    };


    useEffect(() => {
        if (user) {
            navigate('/');
        }
        else navigate('/auth/sign_in');
    }, [navigate, user]);


    return (
        <div className="min-h-[calc(100vh-96px-409px)] flex items-center justify-center bg-gray-900 bg-[url('/placeholder.svg')] bg-cover bg-center bg-no-repeat py-5">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-11/12 lg:w-full max-w-xl">
                <div className={'flex justify-center items-center space-x-5'}>
                    <h2 className="text-4xl font-bold text-center text-red-600">Sign In</h2>
                    <Lottie animationData={signInLottieAnimationData} loop={true} className={'w-24'}></Lottie>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-700 text-white block w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="bg-gray-700 text-white block w-full pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button type="button" onClick={togglePasswordVisibility}
                                        className="text-gray-400 hover:text-white focus:outline-none">
                                    {showPassword ? <FaEyeSlash className="h-5 w-5"/> : <FaEye className="h-5 w-5"/>}
                                </button>
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Sign In
                        </button>
                        <p className={'text-sm text-gray-300 text-center my-2'}>OR</p>
                        <button
                            type="submit"
                            onClick={signInWithGoogle}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <FcGoogle className="mr-3 h-6 w-6 text-red-500"/>
                            Sign In using Google
                        </button>
                    </div>
                </form>
                <div className="mt-2 text-center">
                    <Link to="/auth/reset_password" className="text-sm text-gray-300">
                        Forgot Password? Click <span
                        className={'font-bold italic hover:text-red-500'}>Reset Password</span>.
                    </Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to="/auth/registration" className="text-sm text-gray-300">
                        Not yet registered? Click <span
                        className={'font-bold italic hover:text-red-500'}>Registration</span>.
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default SignIn;
