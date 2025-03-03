import '../scss/Dashboard.scss';
import {useParams} from 'react-router-dom';

const url = 'https://www.youtube.com/embed/';

function WatchVideo() {
    const {videoId, title} = useParams();

    return (
        <main className="content">
            <iframe
                title={title}
                src={`${url}${videoId}`}
                className='iframe-video'
            ></iframe>
        </main>
    );
}

export default WatchVideo;
