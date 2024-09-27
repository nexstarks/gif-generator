document.getElementById('fetchGif').addEventListener('click', fetchGif);

async function fetchGif() {
    const apiKey = 'u4I7CFlSPjxVdWiKih6suWSWaUsRhDQw'; // Replace with your Giphy API key
    const gifText = document.getElementById('gifText').value || 'Hello!'; // Get text from input field

    const apiUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${encodeURIComponent(gifText)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const gifUrl = data.data.images.original.url;

        // Display the GIF
        const gifElement = document.getElementById('gif');
        gifElement.src = gifUrl;
        gifElement.style.display = 'block'; // Show the image if hidden
    } catch (error) {
        console.error('Error fetching GIF:', error);
    }
}
