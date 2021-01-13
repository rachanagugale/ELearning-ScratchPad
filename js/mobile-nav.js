const navSlide = () => {
    const burger = document.querySelector('.hamburger-menu-icon');
    const nav = document.querySelector('nav');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}

navSlide();
