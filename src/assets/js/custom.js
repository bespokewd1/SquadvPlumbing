document.addEventListener("DOMContentLoaded", () => {
  function togglePlayButton() {
    // Select all elements with the .cs-picture class
    const pictures = document.querySelectorAll('#hero-1800 .cs-video-wrapper');

    // Add a click event listener to each .cs-picture element
    pictures.forEach(picture => {
      picture.addEventListener('click', () => {
        // Select all elements with the .cs-play class
        const playButtons = document.querySelectorAll('#hero-1800 .cs-play');

        // Toggle the .cs-hide class on each .cs-play element
        playButtons.forEach(button => {
          button.classList.toggle('cs-hide');
        });
      });
    });
  }

  // Call the function to activate the event listeners
  togglePlayButton();

  function toggleVideoPlayback() {
    // Select the video element
    const video = document.querySelector('#hero-1800 video');

    // Add a click event listener to the video
    video.addEventListener('click', () => {
      // Check if the video is paused
      if (video.paused) {
        video.play(); // Play the video if it is paused
      } else {
        video.pause(); // Pause the video if it is playing
      }
    });
  }

  // Call the function to activate the event listener
  toggleVideoPlayback();

})
