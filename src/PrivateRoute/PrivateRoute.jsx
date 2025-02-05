import PropTypes from "prop-types";
import {useContext} from "react";
import AuthContext from "../Providers/AuthContext.jsx";
import {Navigate} from "react-router-dom";


const PrivateRoute = ({children}) => {

    const {user, userLoading} = useContext(AuthContext);

    if (userLoading) {
        // Show a loading state while the user status is being determined
        return <div>Loading...</div>;
    }

    if (!user) {
        // Redirect to the login if no user is found
        //setTimeout(() => {}, 200)
        return <Navigate to="/auth/sign_in"/>;
    }

    // Render the children if the user is authenticated
    return <div>{children}</div>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;
