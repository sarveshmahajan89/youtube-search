import {useState, useCallback} from 'react';
import {Link} from "react-router-dom";
import {useAppContext} from '../context/ApplicationContext';
import {debounce} from '../utils/debounce';
import services from "../common/services";
import '../scss/Header.scss';

function Header() {
    const [input, setInput] = useState("");
    const {setVideoList, setQuery, setIsLoading} = useAppContext();

    const fetchVideoDetails = useCallback((input) => {
        setIsLoading(true);
        services.fetchVideoDetails(input)
            .then(result => {
                setQuery(input);
                setVideoList(result);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [setIsLoading, setVideoList, setQuery]);

    const debouncedFetchData = useCallback(debounce(fetchVideoDetails, 500), [fetchVideoDetails]);

    const handleChange = ({target: {value}}) => {
        setVideoList(null);
        setInput(value);
        debouncedFetchData(value);
    };
    const handleClearSearch = () => {
        setInput('');
        debouncedFetchData('');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/"><img alt="logo"/></Link>
            </div>
            <div className="search-box">
                <input type="text"
                       placeholder="Search"
                       value={input}
                       className="search-input"
                       onChange={handleChange}/>
                {input.length > 0 && (<div className="remove-icon" onClick={handleClearSearch}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                </div>)}
                <button className="search-button">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"
                              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>

                </button>
            </div>
        </header>
    );
}

export default Header;
