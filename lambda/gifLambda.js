const https = require('https');

// exports.handler = async (event) => {
const handler = async (event) => {
    const apiKey = 'u4I7CFlSPjxVdWiKih6suWSWaUsRhDQw'; // Replace with your Giphy API Key
    const gifText = event.queryStringParameters?.text || 'Hello, World!'; // Text to overlay on the GIF

    // Giphy API URL for random GIF (adjust based on API docs)
    const giphyApiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`;

    try {
        // Fetch random GIF from Giphy
        const gifData = await fetchGif(giphyApiUrl);
        const gifUrl = gifData.data.images.original.url;

        // Respond with GIF URL
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gifUrl: gifUrl,
                message: `GIF fetched successfully with text: "${gifText}"`,
            }),
        };
    } catch (error) {
        console.error('Error fetching GIF:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to fetch GIF',
            }),
        };
    }
};

// Helper function to fetch random GIF from Giphy API
function fetchGif(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            // Collect response data
            response.on('data', (chunk) => {
                data += chunk;
            });

            // On end of response, resolve promise
            response.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

const app = async () => {
    const event = { queryStringParameters: { text: 'hello' } }
    const response = await handler(event)
    console.log(response)
}
app()