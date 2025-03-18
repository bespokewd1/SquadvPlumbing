document.addEventListener("DOMContentLoaded", () => {
   const observer = new MutationObserver((mutationsList, observer) => {
      const adminEl = document.getElementById("nc-root");

      if (adminEl) {
         const decapLogo = adminEl.querySelector("span.exus10f2");
         const loginButton = adminEl.querySelector("button.exus10f1");

         if (decapLogo && loginButton) {
            // Check if both elements are now found
            decapLogo.setAttribute("style", "display:none");
            loginButton.innerText = "Admin Login";

            observer.disconnect(); // Stop observing once changes are made
         }
      }
   });

   const ncRootElement = document.getElementById("nc-root");
   if (ncRootElement) {
      observer.observe(ncRootElement, { childList: true, subtree: true }); // Observe child elements and their descendants
   } else {
      console.log("nc-root element not found initially!"); // Optional log
   }
});
