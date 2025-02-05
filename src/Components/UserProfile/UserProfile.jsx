import {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FaUser, FaPen } from 'react-icons/fa';
import { GrContactInfo } from "react-icons/gr";
import AuthContext from "../../Providers/AuthContext.jsx";


const UserProfile = () => {


    const {user} = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setIsLoaded(true);
    }, []);


    useEffect(() => {
        if (user) {
            navigate('/auth/user_profile');
        }
        else navigate('/auth/sign_in');
    }, [navigate, user]);


    return (
        <div className="min-h-[calc(100vh-96px-409px)] flex items-center justify-center bg-gradient-to-br from-purple-900 via-red-900 to-orange-900 bg-repeat py-5">
            <div className={`bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg p-2 rounded-2xl shadow-2xl w-11/12 lg:w-full max-w-3xl transform transition-all duration-1000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-25"></div>
                    <div className="relative bg-gray-800 rounded-2xl p-6">


                        <div className="flex flex-col lg:flex-row justify-center items-center">
                            <div className="relative w-36 h-36 mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full animate-spin-slow"></div>
                                <img src={user?.photoURL} alt="Profile" className="rounded-full object-cover w-full h-full border-4 border-gray-800 relative z-10"/>
                                <div className="absolute bottom-0 right-0 bg-red-600 rounded-full p-2 z-20"><FaUser className="text-white text-xl"/></div>
                            </div>
                            <div className={'mx-auto'}>
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 mb-2">Hello,<br/><span className={'text-4xl'}>{user?.displayName}</span></h2>
                                <div className="text-sm text-gray-300">
                                    We are thrilled to have you here as a member of our community!
                                </div>
                            </div>
                        </div>


                        <div className="mt-6 bg-gray-700 bg-opacity-50 rounded-lg p-8">
                            <h3 className="text-xl font-semibold text-white mb-2 flex justify-center items-center">
                                <GrContactInfo className={'mr-4 text-red-600 text-3xl'}/>
                                Profile Information
                            </h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <strong>Name:</strong> {user?.displayName}
                                </li>
                                <li>
                                    <strong>Email:</strong> {user?.email}
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 text-sm text-center flex justify-center items-center space-x-4">
                            <p className="text-gray-300">Need to update profile information?</p>
                            <Link
                                to={'/auth/profile_update'}
                                className="inline-flex items-center px-6 py-1 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 hover:from-red-600 hover:via-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-all hover:scale-105">
                                <FaPen className="mr-2" />
                                Update Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
