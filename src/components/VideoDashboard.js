import '../scss/Dashboard.scss';
import Video from "./Video";
import { useCallback, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { debounce } from "../utils/debounce";
import services from "../common/services";

function VideoDashboard() {
    const {videoList, setVideoList, setIsLoading} = useContext(AppContext);

    const videoRef = useRef(videoList);
    videoRef.current = videoList;

    const fetchVideoDetails = useCallback((query) => {
        const token = videoRef.current?.nextPageToken;
        setIsLoading(true);
        services.fetchVideoDetails(query, token)
            .then(result => {
                const newVideos = {
                    ...videoRef.current,
                    ...result,
                    items: [...(videoRef.current?.items || []), ...(result.items || [])],
                };

                videoRef.current = newVideos;
                setVideoList(newVideos);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [setIsLoading, setVideoList]);

    const debouncedFetchData = useCallback(debounce(fetchVideoDetails, 500), [fetchVideoDetails]);

    useEffect(() => {
        debouncedFetchData('popular');
    }, [])

    const {items} = videoList || {};
    const {length} = items || [];
    return (
        <main className="content">
            {length > 0 && items.map((item, index) => (
                <Video
                    data={item}
                    key={index}
                    index={index}
                    lastVideoIndex={length - 1}
                    debouncedFetchData={debouncedFetchData}
                />
            ))}
        </main>
    );
}

export default VideoDashboard;
