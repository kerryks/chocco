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
