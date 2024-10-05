export const images = [
  "./assets/images/hero-background1.webp",
  "./assets/images/hero-background2.webp",
  "./assets/images/hero-background3.webp",
  "./assets/images/hero-background4.webp",
  "./assets/images/hero-background5.webp",
];

let currentImageIndex = 0;

export function changeBackgroundImage(heroSection) {
  heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}

export function startCarousel(component, interval = 15000) {
  const heroSection = component.querySelector(".hero");
  changeBackgroundImage(heroSection);
  setInterval(() => changeBackgroundImage(heroSection), interval);
}
