import axios from "axios";
import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useContext, useEffect} from "react";
import AuthContext from "../Providers/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


const UseAxiosSecure = () => {

    const {signOutCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        // Add a response interceptor.
        const interceptor = axiosInstance.interceptors.response.use(

            (response) => {
                // Any status code that lie within the range of 2xx cause this function to trigger.
                // Do something with response data.
                // console.log('Response interceptor triggered.')
                return response;
            },

            (error) => {

                // Any status codes that falls outside the range of 2xx cause this function to trigger.
                // Do something with response error.
                console.log('Unauthorized behavior detected by interceptor.', error)

                if (error?.response?.status === 401 || error?.response?.status === 403) {
                    signOutCurrentUser().then(() => {
                        console.log('Unauthorized user logged out successfully. Redirecting to login page.')
                        navigate('/auth/sign_in');
                    })
                }
                return Promise.reject(error);
            });

        // Cleanup interceptor on unmount.
        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };

    }, [navigate, signOutCurrentUser]);

    return axiosInstance;
};

export default UseAxiosSecure;
