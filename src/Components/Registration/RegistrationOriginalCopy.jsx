/*
import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthContext from "../../Providers/AuthContext.jsx";
import {toast} from "react-toastify";


const Registration = () => {


    const [formData, setFormData] = useState({
        fullName: '',
        photoUrl: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });


    const {signUpNewUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);


    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (!passwordPattern.test(formData.password)) {
            newErrors.password = `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character like @ $ ! % * ? & #.`;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            //console.log('Form submitted:', formData);
            //console.log(event.target)

            try {
                /!* SIGNING UP THROUGH FIREBASE *!/
                await signUpNewUser(formData.fullName, formData.photoUrl, formData.email, formData.password);
                event.target.reset();
                setErrors({});
                navigate('/auth/sign_in');
            } catch (error) {
                /!* HANDLING ERROR *!/
                toast.error('ERROR MESSAGE C:', error.message);
            }
        }
    };


    return (
        <div className="min-h-[calc(100vh-96px-409px)] flex items-center justify-center bg-gray-900 bg-cover bg-center bg-no-repeat py-5">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-11/12 lg:w-full max-w-xl">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full
                            Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                className="bg-gray-700 text-white block w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-300">Photo URL</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaImage className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type="url"
                                name="photoUrl"
                                id="photoUrl"
                                className="bg-gray-700 text-white block w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Photo URL"
                                value={formData.photoUrl}
                                onChange={handleChange}/>
                            {errors.photoUrl && <p className="text-red-500 text-xs mt-1">{errors.photoUrl}</p>}
                        </div>
                    </div>
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
                                required/>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
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
                                required/>
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
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm
                            Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                className="bg-gray-700 text-white block w-full pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required/>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button type="button" onClick={toggleConfirmPasswordVisibility}
                                        className="text-gray-400 hover:text-white focus:outline-none">
                                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5"/> :
                                        <FaEye className="h-5 w-5"/>}
                                </button>
                            </div>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <div className="flex items-center">
                        <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            required/>
                        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-300">
                            I accept the <a href="#" className="text-red-600 hover:text-red-500">Terms and
                            Conditions</a>
                        </label>
                        {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-2 text-center">
                    <Link to="/auth/sign_in" className="text-sm text-gray-300">
                        Already registered? Click <span className={'font-bold italic hover:text-red-500'}>Sign In</span>.
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default Registration;
*/
