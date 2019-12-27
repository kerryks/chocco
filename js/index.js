// document.querySelector('.hamburger-menu').onclick = function(){
//   this.classList.toggle('hamburger-menu--active')
// }

// меню для тел и гамбургер меню

// const button = document.querySelector('#ham-menu');
// const menu = document.querySelector('#menu');
// const body = document.querySelector('body');
// function toggleMenu() {
//   button.classList.toggle('hamburger-menu--active');
//   menu.classList.toggle('overlay-menu__wrap--active');
//   body.classList.toggle('menu-open');
// }
// button.addEventListener('click', toggleMenu);

//

const sections = $('.section');
const display = $('.maincontent');
let inScroll = false;

const mb = new MobileDetect(window.navigator.userAgent);
const isMobile = mb.mobile();

const changeFixedMenuActiveItem = () => {
  $('.fixed-menu__item')
    .eq(sectionEq)
    .addClass('active')
    .siblings()
    .removeClass('active');
};

const perfomTransition = sectionEq => {
  if (inScroll) return;
  inScroll = true;

  const transitionIsOver = 1000;
  const mouseInertionIsOver = 300;
  const position = sectionEq * -100;

  if (isNaN(position)) console.error('передано не верное значение в perfomTransition')

  sections
    .eq(sectionEq)
    .addClass('active')
    .siblings()
    .removeClass('active');

  display.css({
    transform: `translateY(${position}%)`
  });

  setTimeout(() => {
    inScroll = false;
    changeFixedMenuActiveItem();
  }, transitionIsOver + mouseInertionIsOver);
};



const scroller = () => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) perfomTransition(nextSection.index());
    },
    prev() {
      if (prevSection.length) perfomTransition(prevSection.index());
    }
  }

  $(window).on('wheel', e => {
    const deltaY = e.originalEvent.deltaY

    if (deltaY > 0) {
      scroller('next');
    }

    if (deltaY < 0) {
      scroller('prev');
    }
  });
};

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === 'input' || tagName === 'texterea';
  const windowScroller = scroller

  if (userTypingInInputs) return

  switch (e.keyCode) {
    case 38:
      windowScroller.prev()
      break;
    case 40:
      windowScroller.next()
      break;
  }
});

$('[data-scroll-to').on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');

  perfomTransition(target);
});

if (isMobile) {
  window.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
    },
    { passive: false }
  );

  $("body").swipe({
    swipe: function (
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      let scrollDirecrion = direction === 'up' ? 'next' : 'prev';
      scrollToSection(scrollDirecrion);
    }
  });
}

//меню телефон

let menuOpen = (function (options) {
  let button = document.querySelector(options.button);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');
  let _toggleMenu = function (e) {
    button.classList.toggle('hamburger-menu--active');
    menu.classList.toggle('overlay-menu__wrap--active');
    body.classList.toggle('menu-open');
  }

  let addListeners = function () {
    button.addEventListener('click', _toggleMenu);

    menu.addEventListener('click', function (e) {
      target = e.target;
      if (target.className === 'overlay-menu__link') {
        console.log(target)
        _toggleMenu();
      }
    });
  }
  return {
    openMenu: addListeners
  };

})({
  button: '#ham-menu',
  menu: '#menu'
});

menuOpen.openMenu();

// слайдер


const left = document.querySelector('#left');
const right = document.querySelector('#right');
const slider = document.querySelector('#slider');
const computed = getComputedStyle(slider);
const counterElement = document.querySelectorAll('.slider__item').length;
const maxWidth = (counterElement - 1) * parseInt(computed.width);

right.addEventListener("click", function (e) {
  e.preventDefault();
  let currentRight = parseInt(computed.right);

  if (!currentRight) {
    currentRight = 0;
  }

  if (currentRight < maxWidth) {
    slider.style.right = currentRight + parseInt(computed.width) + "px";
  }
});

left.addEventListener("click", function (e) {
  e.preventDefault();

  let currentRight = parseInt(computed.right);

  if (!currentRight) {
    currentRight = 0;
  }

  if (currentRight > 0) {
    slider.style.right = currentRight - parseInt(computed.width) + "px";
  }
});



// аккордеон для секции с командой

let teamAccoJS = () => {
  let team = document.querySelector('.team-acco');
  team.addEventListener('click', function (e) {
    e.preventDefault();
    const link = e.target;

    if (link.classList.contains('team-acco__name')) {
      let active = team.querySelector('.team-acco__man.is-active');

      if (active) {
        let activeText = active.querySelector('.team-acco__content')
        activeText.style.height = '0px';
        active.classList.remove('is-active');
      }

      if (!active || active.querySelector('.team-acco__name') !== link) {
        let current = link.closest('.team-acco__man');
        current.classList.add('is-active');
        let currentText = current.querySelector('.team-acco__content');
        currentText.style.height = currentText.scrollHeight + 'px';
      }
    }
  })
};
teamAccoJS();

// аккордеон меню

let verticalAcco = () => {
  let links = document.querySelectorAll('.menu-acco__trigger');
  let body = document.querySelector('body');
  let button = document.querySelector('.menu-close')

  let calculateWidth = () => {
    let windowWidth = window.innerWidth;
    let linksWidth = links[0].offsetWidth;
    let reqWidth = windowWidth - linksWidth * links.length;
    return reqWidth > 550 ? 550 : reqWidth;
  }
  function closeItem(activeElement) {
    let activeText = activeElement.querySelector('.menu-acco__content');
    activeText.style.width = '0px';
    activeElement.classList.remove('is-active');
  }

  links.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
      e.preventDefault();
      let link = e.target;
      let active = document.querySelector('.menu-acco__item.is-active');
      if (active) {
        let activeText = active.querySelector('.menu-acco__content');
        activeText.style.width = '0px';
        active.classList.remove('is-active');
      }

      if (!active || active.querySelector('.menu-acco__trigger') !== e.target) {
        let current = link.closest('.menu-acco__item');
        current.classList.add('is-active');
        let currentText = current.querySelector('.menu-acco__content');
        if (body.offsetWidth > 480) {
          currentText.style.width = calculateWidth() + 'px';
        } else {
          currentText.style.width = '100%';
        }
        widthEl = calculateWidth();
        console.log(widthEl)
      }
    })
  })

  document.addEventListener('click', e => {
    let activePerson = document.querySelector('.menu-acco__item.is-active');
    const target = e.target;
    if (!target.closest('.menu-acco') && activePerson) {
      closeItem(activePerson);
      console.log(target)
    }
  });
  button.addEventListener('click', e => {
    let activePerson = document.querySelector('.menu-acco__item.is-active');
    const target = e.target;
    if (!target.closest('.menu-acco') && activePerson) {
      closeItem(activePerson);
      console.log(target)
    }
  });

};
verticalAcco();

// аккордеон секции отзывов

(function () {
  const items = document.querySelectorAll('.reviews__item');
  const revImg = document.querySelectorAll('.reviews__img');
  let active = 0;

  for (let i = 0; i < items.length; i++) {
    revImg[i].addEventListener('click', function (e) {
      e.preventDefault();
      items[i].classList.toggle('is-active');
      revImg[i].classList.toggle('is-active');
      console.log(active)
      revImg[active].classList.toggle('is-active');
      items[active].classList.toggle('is-active');
      active = i;
    })
  }
}());

// плеер

let video;
let durationControl;
let soundControl;
let intervalId;

$().ready(function () {

  video = document.getElementById('player');

  video.addEventListener('click', playStop);

  let playButtons = document.querySelectorAll('.play');
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
  }

  let micControls = document.getElementById('mic');
  micControls.addEventListener('click', soundOf);

  durationControl = document.getElementById('durationLevel');
  durationControl.addEventListener('mousedown', stopInterval);
  durationControl.addEventListener('mouseup', setVideoDuration);

  durationControl.min = 0;
  durationControl.value = 0;

  soundControl = document.getElementById('micLevel');
  soundControl.addEventListener('mouseup', changeSoundVolume);

  soundControl.min = 0;
  soundControl.max = 10

  video.addEventListener('ended', function () {
    document.querySelector('.video__player-img').classList.toggle('video__player-img--active');
    video.currentTime = 0;

  }, false);
});

function playStop() {

  document.querySelector('.video__player-img').classList.toggle('video__player-img--active');
  durationControl.max = video.duration;

  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 66);

  } else {
    // video.pause();
    // clearInterval(intervalId);
    stopInterval();
  }
};

function stopInterval() {
  video.pause();
  clearInterval(intervalId);
};

function setVideoDuration() {
  video.currentTime = durationControl.value;
  intervalId = setInterval(updateDuration, 1000 / 66);

  if (video.paused) {
    video.play();
    document.getElementsByClassName('video__player-img')[0].classList.add('video__player-img--active');
  }
};

function updateDuration() {
  durationControl.value = video.currentTime;
};

function soundOf() {
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
};

function changeSoundVolume(){
  video.volume = soundControl.value/10;
}

// отправка формы

const myForm = document.querySelector('#myForm');
const send = document.querySelector('#send')

// send.addEventListener('click', event => {
//   event.preventDefault();

var ajaxForm = function (form) {

  let formData = new FormData();
  formData.appendChild('name', myForm.elements.name.value);
  formData.appendChild('phone', myForm.elements.phone.value);
  formData.appendChild('comment', myForm.elements.comment.value);
  formData.appendChild('to', 'kerryks@ya.ru');

  let url = 'https://webdev-api.loftschool.com/sendmail/';

  //   if (validateForm(myForm)) {
  // const data = {
  //   name:myForm.elements.nxame.value,
  //   phone:myForm.elements.phone.value,
  //   comment:myForm.elements.comment.value
  // };
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(formData);

  return xhr;
};

// });

function validateForm(form) {
  let valid = true;

  if (!validateFiled(form.elements.name)) {
    valid = false;
  }
  if (!validateFiled(form.elements.phone)) {
    valid = false;
  }
  if (!validateFiled(form.elements.comment)) {
    valid = false;
  }

  return valid;
}

function validateFiled(field) {
  field.nextElementSibling.textContent = field.validationMessage
  return field.checkValidity();
}


// модальное окно


const overlay = (function () {
  let body = document.querySelector('body');
  let link = document.createElement('a'); // создать ссылку

  link.classList.add('modal-win__close');
  link.setAttribute('href', '#');

  let openOverlay = function (modalId, content) { // передается id модального окна и содержимое
    let overlay = document.querySelector(modalId);
    let innerOverlay = overlay.querySelector('.modal-win__inner');

    if (content) { // если передан необязательный параметр, то вставить содержимое в блок и добавить ссылку закрытия
      innerOverlay.innerHTML = content;
    }
    innerOverlay.appendChild(link);

    overlay.classList.add('is-active'); // добавляется класс и показывается модальное окно
    body.classList.add('locked');

    link.addEventListener('click', (e) => { // обработка клика на крестик
      e.preventDefault();
      closeOverlay(modalId);
    })

    overlay.addEventListener('click', (e) => { // обработка клика вне модалки
      e.preventDefault();
      if (e.target === overlay) {
        closeOverlay(modalId);
      }
    })
  }
  document.addEventListener('keydown', function (e) {
    if (e.keycode == 27) closeOverlay(modalId) // закрытие при нажатии esc 
  });

  let closeOverlay = function (modalId) {
    let overlay = document.querySelector(modalId)
    let innerOverlay = overlay.querySelector('.modal-win__inner');
    // здесь я должна закрыть форму
    // if(content){
    //   innerOverlay.innerHTML = content;
    //   innerOverlay.appendChild(link);
    // }
  }

  return {
    open: openOverlay,
    close: closeOverlay
  }
})();
//overlay.open('#modal', 'dfsfdsf')
// const openButton = document.querySelector("#openOverlay");
// const overlayElement = document.querySelector(".modal-win");
// const closeElement = overlayElement.querySelector(".close");

// openButton.addEventListener("click", function () {
//   overlayElement.style.display = "flex";
// });


// closeElement.addEventListener("click", function (e) {
//   e.preventDefault();
//   overlayElement.style.display = "none";
// });

// overlayElement.addEventListener("click", function (e) {
//   if (e.target === overlayElement) {
//     closeElement.click();
//   }
// });


// const sections = document.querySelector('.sextion');
// const display = document.querySelector('.wrapper')

// $(window).on('wheel', e => {
//   const deltaY = e.originalEvent.deltaY;

//   if (deltaY > 0) {
//     console.log('next');
//   }
//   if (deltaY < 0) {
//     console.log('prev');
//   }

// });

// карта

ymaps.ready(init);

let placemarks = [
  {
    latitude: 55.75785403,
    longitude: 37.58241240,
    hintContent: '<div class="map__hint">Новинский бул., 31</div>',
    balloonContent: [
      '<div class="map__balloon">',
      'CHOCCO',
      '</div>'
    ]
  },
  {
    latitude: 55.74293209,
    longitude: 37.58042220,
    hintContent: '<div class="map__hint">Новинский бул., 31</div>',
    balloonContent: [
      '<div class="map__balloon">',
      '<img class="map__img" src="" alt=""/>',
      'CHOCCO',
      '</div>'
    ]
  },
  {
    latitude: 55.74898385,
    longitude: 37.60398272,
    hintContent: '<div class="map__hint">Новинский бул., 31</div>',
    balloonContent: [
      '<div class="map__balloon">',
      'CHOCCO',
      '</div>'
    ]
  },
  {
    latitude: 55.75709173,
    longitude: 37.61913184,
    hintContent: '<div class="map__hint">Новинский бул., 31</div>',
    balloonContent: [
      '<div class="map__balloon">',
      'CHOCCO',
      '</div>'
    ]
  }
];
geoObjects = [];

function init() {
  let map = new ymaps.Map('map', {
    center: [55.74, 37.59],
    zoom: 13,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  });

  for (let i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
      {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent.join('')
      },
      {
        iconLayout: 'default#image',
        iconImageHref: '../img/map/logo.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
      });
  }

  let clusterer = new ymaps.Clusterer({
    clusterIcons: [
      {
        href: '../img/map/logo.png',
        size: [100, 100],
        offset: [-50, -50]
      }
    ],
    clusterIconContentLayout: null
  });

  map.geoObjects.add(clusterer);
  clusterer.add(geoObjects);
};