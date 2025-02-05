import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import {Outlet} from "react-router";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>

            <Outlet></Outlet>

            <Footer></Footer>

            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            ></ToastContainer>

        </>
    );
};

export default MainLayout;
