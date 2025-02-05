import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


const useCategoryLoader = () => {
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoriesLoading(true);
                const response = await fetch(`${BASE_URL}/categories/all`);

                if (!response.ok) {
                    new Error(`Failed to fetch categories: ${response.status}`);
                }

                const dataArray = await response.json();
                setCategories(dataArray);
            }
            catch (error) {
                setCategoriesError(error);
                toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
            }
            finally {
                setCategoriesLoading(false);
            }
        }
        fetchCategories().then();
    }, []);

    return {categories, categoriesLoading, categoriesError};
}

export default useCategoryLoader;
