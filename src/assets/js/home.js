document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin();

  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let currentSlideIndex = 0;
  const duration = 5; // Seconds per slide

  // Initialize: Hide all slides except first
  gsap.set(slides, { opacity: 0, zIndex: 0 });
  gsap.set(slides[0], { opacity: 1, zIndex: 1 });

  // Initial text animation
  animateTextIn();

  // Start the progress bar
  gsap.to(".slider-progress-bar", {
    width: "100%",
    duration: duration,
    ease: "none",
    repeat: -1
  });

  // Carousel Logic
  function changeSlide() {
    const nextSlideIndex = (currentSlideIndex + 1) % totalSlides;

    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[nextSlideIndex];

    // Timeline for transition
    const tl = gsap.timeline();

    // 1. Reset Z-indexes
    tl.set(nextSlide, { zIndex: 1 })
      .set(currentSlide, { zIndex: 0 });

    // 2. Crossfade
    tl.fromTo(nextSlide,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.inOut" }
    )
      .to(currentSlide,
        { opacity: 0, duration: 1, ease: "power2.inOut" },
        "<" // Run at start of previous animation
      );

    // 3. Optional: Subtle Ken Burns Scale Effect on BG Image
    gsap.fromTo(nextSlide.querySelector('img'),
      { scale: 1.1 },
      { scale: 1, duration: duration, ease: "none" }
    );

    currentSlideIndex = nextSlideIndex;
    gsap.delayedCall(duration, changeSlide);
  }

  // Start Loop
  gsap.delayedCall(duration, changeSlide);

  // Function to animate text elements on load
  function animateTextIn() {
    gsap.from(".hero-title", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out"
    });
    gsap.from(".hero-sub", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.7,
      ease: "power3.out"
    });
    gsap.from(".hero-buttons", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      ease: "power3.out"
    });
  }
});
