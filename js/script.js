// HAMBURGER MENU TOGGLE
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  hamburger.classList.toggle("active");
});

sidebar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// HERO SECTION
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // DAUN - geser ke kanan makin jauh
  const daun = document.querySelector('.daun');
  daun.style.transform = `translateX(${scrollY * 1.5}px)`;

  // BURUNG - gerak muter semi sirkular
  const burung = document.querySelector('.burung');
  const radius = 100;
  const angle = scrollY / 100;

  // posisi pusat orbit
  const centerX = window.innerWidth / 2 - 50;
  const centerY = 100;

  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  burung.style.transform = `translateX(${scrollY * 1.5}px)`;

  // JUDUL & BUTTON - turun pelan
  document.querySelector('.title').style.transform = `translateY(${scrollY * 0.8}px)`;
  document.querySelector('.btn-primary').style.transform = `translateY(${scrollY * 0.8}px)`;
});

//TOGGLE RAGAMBACA
function toggleLike(icon) {
  icon.classList.toggle('liked');
  icon.classList.toggle('bx-heart');
  icon.classList.toggle('bxs-heart');
}

// Modal trigger function
function openBookModal(title, imageUrl) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalImage').src = imageUrl;
  new bootstrap.Modal(document.getElementById('bookModal')).show();
}

// Slider logic
const slider = document.getElementById('bookSlider');
const button = document.getElementById('sliderBtn');

button.addEventListener('click', () => {
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  const isAtEnd = slider.scrollLeft >= maxScroll - 5;

  if (!isAtEnd) {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
  } else {
    slider.scrollTo({ left: 0, behavior: 'smooth' });
  }

  setTimeout(updateArrow, 300);
});

slider.addEventListener('scroll', updateArrow);

function updateArrow() {
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  const isAtEnd = slider.scrollLeft >= maxScroll - 5;
  button.innerHTML = isAtEnd ? '&#10146;' : '&#10148;';
}

// Drag scroll
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.cursor = 'grabbing';
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.style.cursor = 'grab';
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.style.cursor = 'grab';
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

slider.style.cursor = 'grab';
