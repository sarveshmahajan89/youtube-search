import services from '../common/services';
import constants from '../common/constants';

global.fetch = jest.fn();

describe('services', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchVideoDetails', () => {
        const mockQuery = 'test query';
        const mockToken = 'mockToken';
        const mockResponse = { items: [{ id: '123', snippet: {} }] };

        it('calls fetch with the correct URL and query parameters', async () => {
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse),
            });

            const url = `${constants.searchUrl}?key=${constants.API}&part=snippet&maxResults=10&q=${mockQuery}&type=video&pageToken=${mockToken}`;

            await services.fetchVideoDetails(mockQuery, mockToken);

            expect(fetch).toHaveBeenCalledWith(url);
        });

        it('returns parsed JSON on success', async () => {
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse),
            });

            const result = await services.fetchVideoDetails(mockQuery, mockToken);

            expect(result).toEqual(mockResponse);
        });

        it('logs an error when the fetch call fails', async () => {
            const mockError = new Error('Failed to fetch data');
            console.error = jest.fn();

            fetch.mockRejectedValueOnce(mockError);

            const result = await services.fetchVideoDetails(mockQuery, mockToken);

            expect(console.error).toHaveBeenCalledWith('Error fetching data:', mockError);
            expect(result).toBeUndefined();
        });
    });

    describe('fetchPopularVideos', () => {
        const mockToken = 'mockToken';
        const mockResponse = { items: [{ id: '456', snippet: {}, statistics: {} }] };

        it('calls fetch with the correct URL and query parameters', async () => {
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse),
            });

            const url = `${constants.popularVideosUrl}?key=${constants.API}&part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=10&pageToken=${mockToken}`;

            await services.fetchPopularVideos(mockToken);

            expect(fetch).toHaveBeenCalledWith(url);
        });

        it('returns parsed JSON on success', async () => {
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse),
            });

            const result = await services.fetchPopularVideos(mockToken);

            expect(result).toEqual(mockResponse);
        });

        it('logs an error when the fetch call fails', async () => {
            const mockError = new Error('Failed to fetch popular videos');
            console.error = jest.fn();

            fetch.mockRejectedValueOnce(mockError);

            const result = await services.fetchPopularVideos(mockToken);

            expect(console.error).toHaveBeenCalledWith('Error fetching data:', mockError);
            expect(result).toBeUndefined();
        });
    });
});