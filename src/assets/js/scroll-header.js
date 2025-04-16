function throttle(func, limit) {
   let inThrottle;
   return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
         func.apply(context, args);
         inThrottle = true;
         setTimeout(() => inThrottle = false, limit);
      }
   }
}

document.addEventListener('DOMContentLoaded', function () {

   const body = document.querySelector('body');
   const scrollThreshold = 100; // Keep it low for testing

   if (!body) {
      console.error("Error: Could not find body element!");
      return; // Stop if body isn't found
   }

   function handleScroll() {

      const htmlScroll = document.documentElement.scrollTop;
      const bodyScroll = document.body.scrollTop;
      const currentScroll = Math.max(htmlScroll, bodyScroll);


      if (currentScroll > scrollThreshold) {
         if (!body.classList.contains('scroll')) {
            body.classList.add('scroll');
         }
      } else {
         if (body.classList.contains('scroll')) {
            body.classList.remove('scroll');
         }
      }
   }

   handleScroll();

   const throttledScrollHandler = throttle(handleScroll, 50);
   body.addEventListener('scroll', throttledScrollHandler, { passive: true });


});

