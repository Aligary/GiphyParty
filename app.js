//global constatns 
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H';
const LIMIT = 9;
const RATING = 'g';
 
/**
* QUERY SELECTORS VARIABLES GO HERE
*/
const GIFInput = document.querySelector("#GIFInput");
const submitBtn = document.querySelector("#submitBtn");
const GIFDisplay = document.querySelector("#container");
const showMoreBtn = document.querySelector("#showMoreBtn");

showMoreBtn.style.display = 'none';

var currentPageNum = 0;
var offset = 0;

submitBtn.addEventListener("click", (e) => {
    GIFDisplay.innerHTML = ``
    var request = 'http://api.giphy.com/v1/gifs/search?api_key=' + API_KEY + '&q=' + GIFInput.value + '&limit=' + LIMIT + '&rating=' + RATING;
    getResults(request);
    showMoreBtn.style.display = 'block';
})

/**
 * Gets results form API
 * @param {String} request - HTTP request
 */
async function getResults(request){
    currentPageNum++;
    const result = await fetch(request);
    const data = await result.json();
    displayResults(data);
}

/**
 *  displays gifs.
 * @param {String} res - json response
 */
function displayResults(res){
    for(let i = 0; i < res.data.length; i++)
    {
        GIFDisplay.innerHTML += `
            <div>
                <img id="gifApp" src="${res.data[i].images.original.url}" alt="${GIFInput} GIF">
            </div>
        `
    }
}

function showMore(request)
{
    currentPageNum++;
    getResults(request);
}

showMoreBtn.addEventListener("click", (e) => {
    offset = LIMIT*currentPageNum;
    var newRequest = 'http://api.giphy.com/v1/gifs/search?api_key=' + API_KEY + '&q=' + GIFInput.value + '&limit=' + LIMIT + '&rating=' + RATING + '&offset=' + offset;
    showMore(newRequest);
})


