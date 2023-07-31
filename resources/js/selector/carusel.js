$(document).ready(function() {
    const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Автоматическая смена слайдов каждые 3 секунды

// Показать первый слайд
showSlide(currentSlide);
})
