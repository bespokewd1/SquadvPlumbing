
// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
// Select ALL toggle buttons within the navigation header
const CShamburgerMenus = document.querySelectorAll("#cs-navigation .cs-toggle");
const csUL = document.querySelector('#cs-expanded'); // Select the UL once

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
    // No need to re-select csUL here, use the one from outside
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}

// Loop through each toggle button found
CShamburgerMenus.forEach(CShamburgerMenu => {
    // Add the click listener to the current button in the loop
    CShamburgerMenu.addEventListener('click', function () {
        // 'this' refers to the specific button that was clicked
        this.classList.toggle("cs-active");
        CSnavbarMenu.classList.toggle("cs-active");
        CSbody.classList.toggle("cs-open");
        // run the function to check the aria-expanded value
        ariaExpanded();
    });
});


// --- Keep your other JS (FAQ, Carousel) below ---

const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
for (const item of faqItems) {
    const onClick = () => {
        item.classList.toggle('active')
    }
    item.addEventListener('click', onClick)
}


// Make sure jQuery is loaded before this line if you are using it
// Also ensure the element with id="carouselHacked" exists
if (typeof $ !== 'undefined' && $('#carouselHacked').length) {
    $('#carouselHacked').carousel();
} else {
    // console.warn("jQuery not loaded or #carouselHacked not found.");
}
