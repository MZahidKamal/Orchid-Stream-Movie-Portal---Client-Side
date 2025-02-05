import BASE_URL from "../SharedUtilities/SharedUtilities.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


const useSeriesLoader = () => {
    const [series, setSeries] = useState([]);
    const [seriesLoading, setSeriesLoading] = useState(true);
    const [seriesError, setSeriesError] = useState(null);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await fetch(`${BASE_URL}/series/all`);
                const dataArray = await response.json();
                setSeries(dataArray);
            }
            catch (error) {
                setSeriesError(error);
                toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
            }
            finally {
                setSeriesLoading(false);
            }
        }
        fetchSeries().then();
    }, []);

    return {series, seriesLoading, seriesError};
}

export default useSeriesLoader;
