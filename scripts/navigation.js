document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navigation = document.querySelector('.navigation');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navigation.classList.toggle('active');
            this.textContent = navigation.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navigation.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navigation.classList.remove('active');
            if (hamburger) hamburger.textContent = '☰';
        }
    });
});
