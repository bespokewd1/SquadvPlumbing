document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin();

  const slides = document.querySelectorAll(".slide");
  const progressBar = document.querySelector(".slider-progress-bar");
  const totalSlides = slides.length;
  let currentIndex = 0;
  let isAnimating = false;
  let autoPlayTimer;
  const slideDuration = 5; // Seconds

  // Initial Setup
  gsap.set(slides, { opacity: 0, zIndex: 0 });
  gsap.set(slides[0], { opacity: 1, zIndex: 1 });

  // Initial Animations
  animateTextIn();
  startAutoPlay();

  // --- Navigation Event Listeners ---
  document.getElementById("nextSlide").addEventListener("click", () => {
    if (isAnimating) return;
    goToSlide(currentIndex + 1);
  });

  document.getElementById("prevSlide").addEventListener("click", () => {
    if (isAnimating) return;
    goToSlide(currentIndex - 1);
  });

  // --- Core Slide Logic ---
  function goToSlide(newIndex) {
    isAnimating = true;

    // Calculate correct index (handles wrap-around)
    let nextIndex = newIndex;
    if (nextIndex >= totalSlides) nextIndex = 0;
    if (nextIndex < 0) nextIndex = totalSlides - 1;

    const currentSlide = slides[currentIndex];
    const nextSlideEl = slides[nextIndex];

    // 1. Reset Z-indexes to prepare for crossfade
    gsap.set(nextSlideEl, { zIndex: 1 });
    gsap.set(currentSlide, { zIndex: 0 });

    // 2. Animate Slides
    const tl = gsap.timeline({
      onComplete: () => {
        currentIndex = nextIndex;
        isAnimating = false;
      }
    });

    tl.fromTo(nextSlideEl,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.inOut" }
    )
      .to(currentSlide,
        { opacity: 0, duration: 1, ease: "power2.inOut" },
        "<" // Start at same time
      );

    // 3. Optional: Reset Ken Burns effect on the new slide image
    const nextImg = nextSlideEl.querySelector('img');
    gsap.fromTo(nextImg,
      { scale: 1.1 },
      { scale: 1, duration: slideDuration + 1, ease: "none" } // +1 to ensure it keeps moving during transition
    );

    // 4. Reset AutoPlay Timer (Interaction resets the clock)
    resetAutoPlay();
  }

  // --- Auto Play Logic ---
  function startAutoPlay() {
    // Animate Progress Bar
    gsap.to(progressBar, {
      width: "100%",
      duration: slideDuration,
      ease: "none"
    });

    // Trigger slide change
    autoPlayTimer = gsap.delayedCall(slideDuration, () => {
      goToSlide(currentIndex + 1);
    });
  }

  function resetAutoPlay() {
    // Kill existing timer
    if (autoPlayTimer) autoPlayTimer.kill();
    // Kill progress bar animation and reset
    gsap.killTweensOf(progressBar);
    gsap.set(progressBar, { width: "0%" });

    // Restart
    startAutoPlay();
  }

  // --- Text Animation Helper ---
  function animateTextIn() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-title", { y: 30, opacity: 0, duration: 1, delay: 0.5 })
      .from(".hero-sub", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
      .from(".hero-buttons", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
      .from(".slider-nav", { y: 20, opacity: 0, duration: 1 }, "-=0.8");
  }
});
