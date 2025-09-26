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

// --- Navbar Logic ---
const navList = document.getElementById("nav-links");
const links = navList.querySelectorAll("a");
const indicator = document.querySelector(".indicator");
let activeLink = navList.querySelector("a.active");
const sections = document.querySelectorAll("section");
const mainNav = document.querySelector('nav');

// Function to move the indicator
function moveIndicator(element){
  const rect = element.getBoundingClientRect();
  const navRect = navList.getBoundingClientRect();
  indicator.style.width = rect.width + "px";
  indicator.style.left = rect.left - navRect.left + "px";
}

// Initial position on page load
window.addEventListener("load", () => moveIndicator(activeLink));

// Move indicator on hover and click
links.forEach(link => {
  link.addEventListener("mouseenter", () => moveIndicator(link));
  link.addEventListener("mouseleave", () => moveIndicator(activeLink));
  link.addEventListener("click", (e) => { 
    // Small delay to allow scroll to start before updating active link
    setTimeout(() => {
        activeLink = e.target;
        moveIndicator(activeLink);
    }, 50);
  });
});

// --- Scroll Spy ---
function updateActiveLinkOnScroll() {
  let currentSectionId = '';
  const navHeight = mainNav.offsetHeight; // Get navbar height for offset

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 1; // Subtract navbar height and 1px buffer
    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute('id');
    }
  });

  const newActiveLink = navList.querySelector(`a[href="#${currentSectionId}"]`);

  // Update only if the active link has changed
  if (newActiveLink && newActiveLink !== activeLink) {
    links.forEach(link => link.classList.remove('active'));
    newActiveLink.classList.add('active');
    activeLink = newActiveLink;
    moveIndicator(activeLink);
  }
}

// Listen for scroll events to run the function
window.addEventListener('scroll', updateActiveLinkOnScroll);