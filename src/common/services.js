import constants from "../common/constants";

const fetchVideoDetails = async (query = '', token = '') => {
    const fetchWithApiKey = async (apiKey) => {
        const response = await fetch(`${constants.searchUrl}?key=${apiKey}&part=snippet&maxResults=10&q=${query}&type=video&pageToken=${token}`);
        if (response.status === 403) {
            throw new Error('403 Forbidden');
        }
        return await response.json();
    };

    try {
        return await fetchWithApiKey(constants.API);
    } catch (error) {
        if (error.message === '403 Forbidden') {
            try {
                return await fetchWithApiKey(constants.API1);
            } catch (error) {
                console.error('Error fetching data with second API key:', error);
            }
        } else {
            console.error('Error fetching data:', error);
        }
    }
};
const fetchPopularVideos = async (token = '') => {
    try {
        const response = await fetch(`${constants.popularVideosUrl}?key=${constants.API}&part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=10&pageToken=${token}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default {
    fetchVideoDetails,
    fetchPopularVideos
}