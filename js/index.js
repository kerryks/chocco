// document.querySelector('.hamburger-menu').onclick = function(){
//   this.classList.toggle('hamburger-menu--active')
// }

// меню для тел и гамбургер меню

const button = document.querySelector('#ham-menu');
const menu = document.querySelector('#menu');
const body = document.querySelector('body');
function toggleMenu() {
  button.classList.toggle('hamburger-menu--active');
  menu.classList.toggle('overlay-menu__wrap--active');
  body.classList.toggle('menu-open');
}
button.addEventListener('click', toggleMenu);

//

// let menuOpenBurger = (function (buttonClass, menuClass) {
//   let button = document.querySelector(buttonClass);
//   let menu = document.querySelector(menuClass);
//   let body = document.querySelector('body');
//   let _toggleMenu = function (e) {
//     button.classList.toggle('hamburger-menu--active');
//     menu.classList.toggle('overlay-menu__wrap--active');
//     body.classList.toggle('menu-open');
//   }

//   let addListeners = function () {
//     button.addEventListener('click', _toggleMenu);
//   }
//   return {
//     openMenu: addListeners
//   };

// }) ('#ham-menu','#menu')

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

// слайдер


const left = document.querySelector('#left');
const right = document.querySelector('#right');
const slider = document.querySelector('#slider');
const computed = getComputedStyle(slider);
const counterElement = document.querySelectorAll('.slider__item').length;
const maxWidth = (counterElement - 1) * parseInt(computed.width);
console.log(maxWidth)
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

// аккордеон секции отзывов

(function () {
  const items = document.querySelectorAll('.reviews__item');
  const revImg = document.querySelectorAll('.reviews__img');
  let active = 0;

  for (let i = 0; i < items.length; i++) {
    revImg[i].addEventListener('click', function (e) {
      e.preventDefault();
      items[i].classList.toggle('is-sctive');
      revImg[i].classList.toggle('is-active');

      revImg[active].classList.toggle('is-active');
      items[active].classList.toggle('is-active');
      active = i;
    })
  }
}());