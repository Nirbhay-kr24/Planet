/*=============== LOGO ===============*/
const logoLink = document.querySelector('.nav__logo');

logoLink.addEventListener('click', function(event) {
  event.preventDefault();  
  location.reload();  
});


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Show menu */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Hide menu */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById('header');
  
  window.scrollY >= 50 ? header.classList.add('blur-header')
                       : header.classList.remove('blur-header');
}

window.addEventListener('scroll', blurHeader);





/*=============== Nasa Api ===============*/
const API_KEY = 'RbNJ4JHLoLjQerkKAOeX9RgtCXeeAiF62qayt8Pw'; 
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

// DOM elements
const titleElement = document.getElementById('title_nasa');
const dateElement = document.getElementById('date_nasa');
const imageElement = document.getElementById('image_nasa');
const explanationElement = document.getElementById('explanation_nasa');
const contentNasa = document.getElementById('content_nasa');

// Function to convert UTC date to IST (UTC + 5:30)
function convertUTCToIST(utcDate) {
  const utc = new Date(utcDate);
  
  // Convert UTC time to IST (UTC + 5:30)
  const istOffset = 5.5 * 60; // IST is UTC + 5:30 hours
  const utcTime = utc.getTime() + utc.getTimezoneOffset() * 60000; // Convert current time to UTC
  const istTime = new Date(utcTime + istOffset * 60000); // Add IST offset
  
  // Format the IST date in 'YYYY-MM-DD' format
  const formattedISTDate = istTime.toISOString().split('T')[0];
  
  return formattedISTDate;
}

// Fetch and display APOD data when the page loads
async function fetchAPOD() {
  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayAPOD(data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    alert('Failed to fetch APOD data. Please try again later.');
  }
}

// Display APOD data
function displayAPOD(data) {
  titleElement.textContent = data.title;

  // Convert UTC date from NASA API to IST
  const istDate = convertUTCToIST(data.date);
  dateElement.textContent = `Date: ${istDate}`;
  explanationElement.textContent = data.explanation;

  if (data.media_type === 'image') {
    imageElement.src = data.url;
    imageElement.alt = data.title;
    imageElement.style.display = 'block';
  } else if (data.media_type === 'video') {
    // Replace the image element with an iframe for video
    const videoElement = document.createElement('iframe');
    videoElement.src = data.url;
    videoElement.width = "100%";
    videoElement.height = "400";
    videoElement.frameBorder = "0";
    videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoElement.allowFullscreen = true;

    // Remove the existing image element if it's present
    imageElement.style.display = 'none';
    if (contentNasa.querySelector('iframe')) {
      contentNasa.removeChild(contentNasa.querySelector('iframe'));
    }

    // Append the video iframe
    contentNasa.appendChild(videoElement);
  } else {
    console.error('Unsupported media type:', data.media_type);
    alert('Unsupported media type returned by NASA API.');
  }
}

// Fetch data automatically when the page loads
document.addEventListener('DOMContentLoaded', fetchAPOD);


  

/*=============== SWIPER PLANETS ===============*/
const swiperTravel = new Swiper('.travel__swiper', {
  loop: true,
  spaceBetween: '32',
  grabCursor: true,
  slidesPerView: 'auto',
  centeredSlides: 'auto',

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints:{
    600:{
      slidesPerView: 2,
    },
    900:{
      slidesPerView: 3,
    },
  }
});
/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () =>{

  const scrollUp = document.getElementById('scroll-up');

window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                              :scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
 

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px', 
  duration: 2500,
  delay: 100,
   
});

// Reveal elements with individual configurations
sr.reveal(`.home__data, .travel__swiper, .contact__container` ); 
sr.reveal(`.home__img`, { origin: 'top', delay:300 }); 
sr.reveal(`.home__ufo`, { origin:'right', delay:100 }); 
sr.reveal(`.explore__img`, { origin: 'left' });
sr.reveal(`.explore__data`, { origin: 'right' });
sr.reveal(`.explore__planet`, { origin: 'right' , delay: 200});
sr.reveal(`.history__card`, { interval: 100 });
sr.reveal(`.history__planet-1`, { origin: 'left', delay: 600 });
sr.reveal(`.history__planet-2`, { origin: 'right', delay: 500 });
sr.reveal(`.footer__planet-1`, { origin: 'bottom', delay: 600 });
sr.reveal(`.footer__planet-2`, { delay: 600 });
 sr.reveal(`.nasa`, { origin: 'bottom', delay: 200});










const exploreMarsButton = document.getElementById(".button");

// Ensure that the element exists
if (exploreMarsButton) {
  exploreMarsButton.addEventListener("click", function() {
    // Action when the button is clicked (example: scroll to Mars section)
    const marsSection = document.getElementById("mars-section");
    if (marsSection) {
      window.scrollTo({
        top: marsSection.offsetTop,
        behavior: "smooth"
      });
    }
  });
}
