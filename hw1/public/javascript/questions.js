document
  .querySelector('.wrapper__question')
  .addEventListener('click', (e) => {
    const element = e.target.closest('.number');
    if (element) {
      element.classList.toggle('hide-anser');
    }
  });
