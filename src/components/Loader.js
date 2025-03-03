import '../scss/Loader.scss';
import {useAppContext} from '../context/ApplicationContext';

function Loader() {
    const {isLoading} = useAppContext();
    return (
        <>
            {isLoading && <div className="loader">
                &nbsp;
            </div>}
        </>
    );
}

export default Loader;
