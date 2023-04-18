const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//toggle button on and off
function toggleButton() {
    button.disabled = !button.disabled;
}
//passing the joke to the voiceRSS api
function tellMe(joke) {

    VoiceRSS.speech({
        key: '1222062416b04a0389b015a6f5ab8d04',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
};

//get jokes from api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // check if the joke has two parts, then assign joke
    if (data.type === 'twopart') {
        joke = `${data.setup} ... ${data.delivery}`;
    } else {
        joke = data.joke;
    };
    
    } catch(error){
        //error handle
    };

    //text-to-speech
    tellMe(joke);

    //toggle button
    toggleButton();
};

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)