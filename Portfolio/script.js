// Sakura effect
function createSakura() {
  const sakura = document.createElement("span");
  sakura.textContent = "🌸";
  sakura.classList.add("sakura");
  sakura.style.left = Math.random() * 100 + "vw";
  sakura.style.fontSize = Math.random() * 20 + 15 + "px";
  sakura.style.animationDuration = Math.random() * 5 + 5 + "s";
  document.querySelector(".hero").appendChild(sakura);
  sakura.addEventListener('animationend', () => sakura.remove());
}
setInterval(createSakura, 500);

// Navbar logic
const navList = document.getElementById("nav-links");
const links = navList.querySelectorAll("a");
const indicator = document.querySelector(".indicator");
let activeLink = navList.querySelector("a.active");
const sections = document.querySelectorAll("section");
const mainNav = document.querySelector('nav');

function moveIndicator(element){
  const rect = element.getBoundingClientRect();
  const navRect = navList.getBoundingClientRect();
  indicator.style.width = rect.width + "px";
  indicator.style.left = rect.left - navRect.left + "px";
}

window.addEventListener("load", () => moveIndicator(activeLink));

links.forEach(link => {
  link.addEventListener("mouseenter", () => moveIndicator(link));
  link.addEventListener("mouseleave", () => moveIndicator(activeLink));
  link.addEventListener("click", (e) => { 
    setTimeout(() => {
        activeLink = e.target;
        moveIndicator(activeLink);
    }, 50);
  });
});

// Scroll Spy
function updateActiveLinkOnScroll() {
  let currentSectionId = '';
  const navHeight = mainNav.offsetHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 1;
    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute('id');
    }
  });

  const newActiveLink = navList.querySelector(`a[href="#${currentSectionId}"]`);
  if (newActiveLink && newActiveLink !== activeLink) {
    links.forEach(link => link.classList.remove('active'));
    newActiveLink.classList.add('active');
    activeLink = newActiveLink;
    moveIndicator(activeLink);
  }
}
window.addEventListener('scroll', updateActiveLinkOnScroll);

// Certificate Carousel
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let currentIndex = 0;

function showSlide(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Auto slide every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalItems;
  showSlide(currentIndex);
}, 5000);

// Arrow buttons
document.querySelector('.left-arrow').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  showSlide(currentIndex);
});
document.querySelector('.right-arrow').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalItems;
  showSlide(currentIndex);
});
