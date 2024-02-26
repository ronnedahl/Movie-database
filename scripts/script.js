

window.addEventListener('load', () => {
    console.log('load');
    //Förslagsvis anropar ni era funktioner som skall sätta lyssnare, rendera objekt osv. härifrån
    setupCarousel();
    fetchMovies()
    posterDB()
});

//Hämtar youtube videos från API
const url = 'https://santosnr6.github.io/Data/movies.json'
const ulRef = document.querySelector('#youtube-slides')
const imageRef = document.querySelector('.popular__img-container')  

const fetchMovies = async () => {
    try {

        const resp = await fetch(url)
        const data = await resp.json()
        let urlData = []
        //stoppar i alla filmer i arrayen 


        data.map(Newdata => {

            urlData.push(Newdata.trailer_link)

        })


        // 5 stycken slumpmässigt genererade länkar
        // som stoppas i generatedUrl
        const generatedUrl = []
        for (let i = 0; i < 5; i++) {

            const link = urlData.splice(Math.floor(Math.random() * urlData.length), 1)
            generatedUrl.push(link)
        }
        const listGenerated = generatedUrl

        appendYoutubeSlides(listGenerated)
    } catch (error) {
        console.error('fel vid hämtning av filmdata', error)

    }



}



// Listar youtube-videos 5 stycken slumpmässigt

function appendYoutubeSlides(listofGen) {

    const youtubeSlides = `<li class="carousel__slide" data-active>
    <iframe src="${listofGen[0]}" width="420" height="315" frameborder="0"></iframe>
    </li>
    <li class="carousel__slide">
    <iframe src="${listofGen[1]}" width="420" height="315" frameborder="0"></iframe>
    </li>
    <li class="carousel__slide">
    <iframe src="${listofGen[2]}" width="420" height="315" frameborder="0"></iframe>
    </li>
    <li class="carousel__slide">
    <iframe src="${listofGen[3]}" width="420" height="315" frameborder="0"></iframe>
    </li>
    <li class="carousel__slide">
    <iframe src="${listofGen[4]}" width="420" height="315" frameborder="0"></iframe>
    </li>`



    ulRef.innerHTML = youtubeSlides
}



let newPostArray =[]
console.log(newPostArray)
const posterDB = async () => {

    const resp = await fetch(url)
    const dataMovie = await resp.json()
    console.log(dataMovie)

    dataMovie.map(moviePoster =>{
    newPostArray.push(moviePoster.poster)
    })
    postImage()
}
// skapar bilder och lägger till så att det 
// det går att göra bilderna till länkar.
function postImage(){
    
    newPostArray.forEach(function (src){
    const createImg = document.createElement("img")
    createImg.src = src
    const createLink = document.createElement("a");
    createLink.href = "#"; // Add your link URL here
    createLink.appendChild(createImg);

    imageRef.appendChild(createLink);
   


    })
}


//Denna funktion skapar funktionalitet för karusellen
function setupCarousel() {
    console.log('carousel');
    const buttons = document.querySelectorAll('[data-carousel-btn]');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const offset = btn.dataset.carouselBtn === 'next' ? 1 : -1;
            const slides = btn.closest('[data-carousel').querySelector('[data-slides');
            const activeSlide = slides.querySelector('[data-active]');
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;

            if (newIndex < 0) {
                newIndex = slides.children.length - 1;
            } else if (newIndex >= slides.children.length) {
                newIndex = 0;
            }

            slides.children[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;
        });
    });
}

