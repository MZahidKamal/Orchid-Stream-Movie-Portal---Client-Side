import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router";
import './index.css'
import MainLayout from "./Layouts/MainLayout/MainLayout.jsx";
import HomeLayout from "./Layouts/HomeLayout/HomeLayout.jsx";
import Error404 from "./Components/Error404/Error404.jsx";
import Registration from "./Components/Registration/Registration.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import ProfileUpdate from "./Components/ProfileUpdate/ProfileUpdate.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import AllMovies from "./Components/AllMovies/AllMovies.jsx";
import AllSeries from "./Components/AllSeries/AllSeries.jsx";
import MovieDetails from "./Components/MovieDetails/MovieDetails.jsx";
import SeriesDetails from "./Components/SeriesDetails/SeriesDetails.jsx";
import AddMovie from "./Components/AddMovie/AddMovie.jsx";
import DataProvider from "./Providers/DataProvider.jsx";
import MyMovies from "./Components/MyMovies/MyMovies.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";


const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <AuthProvider>
            <DataProvider>
                <Routes>
                    <Route path={'/'} element={<MainLayout></MainLayout>}>

                        <Route path={'/'} element={<HomeLayout></HomeLayout>}></Route>

                        <Route path={'/auth/registration'} element={<Registration></Registration>}></Route>
                        <Route path={'/auth/sign_in'} element={<SignIn></SignIn>}></Route>
                        <Route path={'/auth/reset_password'} element={<ResetPassword></ResetPassword>}></Route>
                        <Route path={'/auth/user_profile'} element={<PrivateRoute><UserProfile></UserProfile></PrivateRoute>}></Route>
                        <Route path={'/auth/profile_update'} element={<PrivateRoute><ProfileUpdate></ProfileUpdate></PrivateRoute>}></Route>

                        <Route path={'/movies/category/:category'} element={<AllMovies></AllMovies>}></Route>
                        <Route path={'/movies/genres/:genre'} element={<AllMovies></AllMovies>}></Route>
                        <Route path={'/movies/id/:id'} element={<PrivateRoute><MovieDetails></MovieDetails></PrivateRoute>}></Route>
                        <Route path={'/movies/add_movie'} element={<PrivateRoute><AddMovie></AddMovie></PrivateRoute>}></Route>

                        <Route path={'/movies/my_movies'} element={<PrivateRoute><MyMovies></MyMovies></PrivateRoute>}></Route>

                        <Route path={'/series/all'} element={<AllSeries></AllSeries>}></Route>
                        <Route path={'/series/id/:id'} element={<PrivateRoute><SeriesDetails></SeriesDetails></PrivateRoute>}></Route>


                    </Route>
                    <Route path={'*'} element={<Error404></Error404>}></Route>
                </Routes>
            </DataProvider>

        </AuthProvider>
    </BrowserRouter>
);
