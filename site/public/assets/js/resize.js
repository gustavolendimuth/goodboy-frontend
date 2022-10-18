// First we get the viewport height and we multiple it by 1% to get a value for a vh unit

function resizeWindow() {
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

resizeWindow();

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  resizeWindow();
});
