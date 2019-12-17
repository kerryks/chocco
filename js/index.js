// document.querySelector('.hamburger-menu').onclick = function(){
//   this.classList.toggle('hamburger-menu--active')
// }

const button = document.querySelector ('#ham-menu');
const menu = document.querySelector ('#menu');
const body = document.querySelector ('body');
function toggleMenu() {
  button.classList.toggle('hamburger-menu--active');
  menu.classList.toggle('overlay-menu__wrap--active');
  body.classList.toggle('menu-open');
}
button.addEventListener('click', toggleMenu);

// let menuOpen = (function (button, menu) {
//   let button = document.querySelector('#ham-menu');
//   let menu = document.querySelector('#menu');
//   let body = document.querySelector('body');

//   let _toggleMenu = function () {
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
  
// })('#ham-menu', '#menu');

// menuOpen.openMenu();

let teamAccoJS = () => {
  let team = document.querySelector('.team-acco');
  team.addEventListener('click', function(e) {
    e.preventDefault();
    const link = e.target;
    if(link.classList.contains('.team-acco__name')){
      let active = team.querySelector('.team-acco__man.is-active');

      if (active){
        let activeText = active.querySelector('.team-acco__content')
        activeText.style.height = '0rem';
        active.classList.remove('is-active');
      }
      if(!active || active.querySelector('.team-acco__name') !== link){
        let current = link.closest('.team-acco__man');
        current.classList.add('is-active');
        let currentText = current.querySelector('.team-acco__content');
        currentText.style.height = currentText.scrollHeight +'rem';
      }
    }
  })
};

teamAccoJS();


///////
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const slider = document.querySelector('#slider')