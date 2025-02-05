import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import AuthContext from "./AuthContext.jsx";
import auth from "../Firebase/firebase.init.js";
import {toast} from "react-toastify";
import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import axios from "axios";


const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);


    const signUpNewUser = async (name, photoUrl, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            setUser(user);
            setUserLoading(false);

            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoUrl
            });

            const userInfoForDatabase = {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            };

            /* SAVING USER INFO INTO MONGODB */
            /*const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfoForDatabase),
            });*/
            const response = await axios.post(`${BASE_URL}/users`, userInfoForDatabase)


            if (!response?.ok) {
                new Error('Failed to save user info to MongoDB');
            }

            await signOut(auth);
            toast.success('Registration successful!');

        } catch (error) {
            setUserLoading(false);
            toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
    };


    const signInExistingUsers = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            setUser(userCredential.user);
            setUserLoading(false);

            /* REQUESTING JSON WEB TOKEN THROUGH API - (SHIFTED TO THE OBSERVER) */
            /*await axios.post(`${BASE_URL}/auth/sign_in/jwt`,
                {email: userCredential?.user?.email},
                {withCredentials: true})
                .then(response => {
                    console.log(`JSON Web Token: `, response?.data);
                })*/

            toast.success('Login successful!');

        } catch (error) {
            toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
    };


    const updateExistingUsers = async (name, photoUrl) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoUrl
            });

            setUser(auth.currentUser);

            toast.success('Profile updated successfully!');

        } catch (error) {
            toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
    };


    const signOutCurrentUser = async () => {
        try {
            await signOut(auth);

            setUser(null);
            setUserLoading(false);

            toast.success('Logout successful!');

        } catch (error) {
            toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
    };


    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);

            toast.success('Password reset email sent!');

        } catch (error) {
            toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
    };


    const provider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);

            const userInfoForDatabase = {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            };

            /* SAVING USER INFO INTO MONGODB */
            /*const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfoForDatabase),
            });*/
            const response = await axios.post(`${BASE_URL}/users`, userInfoForDatabase);


            if (!response?.ok) {
                new Error('Failed to save user info to MongoDB');
            }

            setUser(userCredential.user);
            setUserLoading(false);

            /* REQUESTING JSON WEB TOKEN THROUGH API - (SHIFTED TO THE OBSERVER) */
            /*await axios.post(`${BASE_URL}/auth/sign_in/jwt`,
                {email: userCredential?.user?.email},
                {withCredentials: true})
                .then(response => {
                    console.log(`JSON Web Token: `, response?.data);
                })*/

            toast.success('Login successful!');

        } catch (error) {
            toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
    };


    /* THIS OBSERVER IS CREATED ACCORDING TO THE FIREBASE DOCUMENT, INCLUDING DEPENDENCIES */
    /*useEffect(() => {
        /!* The recommended way to get the current user is by setting an observer on the Auth object. *!/
        const authentication_State_Observer = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // console.log("User is logged in");
                setUser(currentUser);

                /!* REQUESTING JSON WEB TOKEN THROUGH API *!/
                axios.post(`${BASE_URL}/auth/sign_in/jwt`,
                    {email: currentUser?.email},
                    {withCredentials: true})
                    .then(response => {
                        console.log(`JSON Web Token: `, response?.data);
                        setUserLoading(false);
                    })

            } else {
                // console.log("User is logged out.");
                setUser(null);

                /!* REQUESTING JSON WEB TOKEN THROUGH API *!/
                axios.post(`${BASE_URL}/auth/logout/clear_jwt`,
                    {},
                    {withCredentials: true})
                    .then(response => {
                        console.log(`JSON Web Token cleared: `, response?.data);
                        setUserLoading(false);
                    })
            }
        })

        /!* Component Unmounting. *!/
        return () => authentication_State_Observer();
    }, [user]);*/
    /* THIS OBSERVER IS MODIFIED, EXCLUDING DEPENDENCIES */
    useEffect(() => {
        /* The recommended way to get the current user is by setting an observer on the Auth object. */
        const authentication_State_Observer = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                /* REQUESTING JSON WEB TOKEN THROUGH API */
                axios.post(`${BASE_URL}/auth/sign_in/jwt`,
                    {email: currentUser?.email},
                    {withCredentials: true})
                    .then(response => {
                        console.log(`JSON Web Token: `, response?.data);
                    })
                    .catch(error => {
                        console.error("Error while requesting JWT:", error);
                    })
                    .finally(() => {
                        setUserLoading(false);
                    });
            } else {
                setUser(null);

                /* REQUESTING JSON WEB TOKEN CLEAR THROUGH API */
                axios.post(`${BASE_URL}/auth/logout/clear_jwt`,
                    {},
                    {withCredentials: true})
                    .then(response => {
                        console.log(`JSON Web Token cleared: `, response?.data);
                    })
                    .catch(error => {
                        console.error("Error while clearing JWT:", error);
                    })
                    .finally(() => {
                        setUserLoading(false);
                    });
            }
        });

        /* Cleanup observer on unmount */
        return () => {
            if (authentication_State_Observer) {
                authentication_State_Observer();
            }
        };
    }, []); // Removed 'user' from dependency array



    const authInfo = {user, userLoading, signUpNewUser, signInExistingUsers, updateExistingUsers, signOutCurrentUser, resetPassword, signInWithGoogle};


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;


/*
Initially have created the 'AuthContext.jsx'.
Then have created the 'AuthProvider'.

Then in the 'main.jsx' file, the 'RouterProvider' is wrapped by 'AuthProvider'.
Here the 'RouterProvider' is like a children of 'AuthProvider'.

Inside the 'AuthProvider.jsx' I've received the {children} as props.
Then inside the 'AuthProvider.jsx' I have done all the logical coding part related to the Firebase Authentication process.
Then all thing, which I want to distribute through the whole project, are combined and created an object 'authInfo'.
Then in the return section, 'AuthContext.Provider' tag along with 'value={authInfo}' are used to finish the distribution process.

And then from any component, 'useContext(AuthContext)' has been used to received all necessary things from this contextAPI.
*/
