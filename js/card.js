export class Book {
    constructor() {
        this.book = document.getElementById('book');
        this.gameSection = document.getElementById('game-section');
        this.nav = document.getElementById('top-nav');
        this.scrollBtn = document.getElementById('scroll-down-btn');
        this.opened = false;
        this.init();
    }

    init() {
        // Клик по книге только открывает её
        this.book.addEventListener('click', () => {
            if (!this.opened) {
                this.book.classList.add('open');
                this.opened = true;

                // Показываем контент ниже, но НЕ скроллим сами
                setTimeout(() => {
                    this.gameSection.classList.remove('hidden');
                    this.nav.classList.remove('hidden');
                }, 600);
            }
        });

        // Отдельная кнопка для скролла
        this.scrollBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Чтобы клик не прошел на книгу (хотя не критично)
            this.gameSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}