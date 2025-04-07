import { useState, useRef, useEffect, useCallback } from 'react';
import useElementInView from "../utils/useElementInView";
import { useAppContext } from '../context/ApplicationContext';
import { Link } from "react-router-dom";

function Video({data, lastVideoIndex, debouncedFetchData, index}) {
    const elementRef = useRef();
    const elementInView = useElementInView(elementRef);
    const [loadNewVideosAt, setLoadNewVideosAt] = useState(lastVideoIndex);
    const {query} = useAppContext();

    const handleElementInView = useCallback(() => {
        if (elementInView && loadNewVideosAt === Number(elementRef.current.id)) {
            setLoadNewVideosAt((prev) => prev + 10);
            debouncedFetchData(query);
        }
    }, [elementInView, loadNewVideosAt, debouncedFetchData, query]);

    useEffect(() => {
        handleElementInView();
    }, [handleElementInView])

    const {id: {videoId}, snippet: {title, channelTitle, thumbnails: {medium: {url}}}} = data;

    return (
        <>
            <Link to={`/watch/${videoId}/${title}`} className="video-link">
                <div className="video-card" ref={elementRef} id={index}>
                    <img className="video-image" src={url} alt={channelTitle}/>
                    <div className="video-info">
                        <span className="video-title">{title}</span>
                        <p className="video-description">{channelTitle}</p>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default Video;

























































































