let slideIndex = 1;
let bikeSlideIndex = 1;

function showSlide(index) {
  if (index > slides.length) {
    slideIndex = 1
  } else if (index < 1) {
    slideIndex = slides.length;
  }
  else {
    slideIndex = index;
  }
  slides[slideIndex-1].classList.remove('d-none');
}

function showBikesSlide(index, nodes) {
  nodes.forEach(element => {
    element.classList.add('d-sm-none');
  })
  nodes[index].classList.remove('d-sm-none');
}

function setFilterState(element, options=false) {
  bikefilters.forEach(elem => elem.classList.remove('selected'));
  if (!options) {
    element.classList.add('selected');
  }
}

function filterBikes(id) {
  bikeSlides.forEach(elem => {
    if (elem.classList.contains(id)) {
      elem.classList.remove('d-none');
    } else {
      elem.classList.add('d-none');
    }
  })
}

function getCurrentTerrainSlides() {
  const terrain = document.querySelector('.bikes-list__slide:not(.d-none)');
  return terrain.querySelectorAll('.bike__item');
}

showSlide(slideIndex);
prevArrow.addEventListener('click', () => {
  slides[slideIndex-1].classList.add('d-none');
  showSlide(slideIndex - 1);
});
nextArrow.addEventListener('click', () => {
  slides[slideIndex-1].classList.add('d-none');
  showSlide(slideIndex + 1);
});

prevArrowMobile.addEventListener('click', () => {
  slides[slideIndex-1].classList.add('d-none');
  showSlide(slideIndex - 1);
});
nextArrowMobile.addEventListener('click', () => {
  slides[slideIndex-1].classList.add('d-none');
  showSlide(slideIndex + 1);
});

bikefilters.forEach(element => {
  element.addEventListener('click', () => {
    filterBikes(element.getAttribute('id'));
    setFilterState(element);
  });
});

selectBikeOptions.addEventListener('change', (event) => {
  filterBikes(event.target.value);
  setFilterState(event.target.value, true);
})

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark'){
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}

(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
  } else {
    setTheme('theme-light');
  }
})();

themeSwitcher.addEventListener('click', toggleTheme);
themeSwitcherMobile.addEventListener('click', toggleTheme);

menuLinks.forEach(element => {
  element.addEventListener('click', () => {
    menuInput['checked'] = false;
  })
});

bikeDots.forEach(element => {
  element.addEventListener('click', () => {
    showBikesSlide(element.getAttribute('data-id'), getCurrentTerrainSlides());
  })
})