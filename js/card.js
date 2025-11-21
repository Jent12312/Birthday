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
        this.book.addEventListener('click', () => {
            if (!this.opened) {
                this.book.classList.add('open');
                this.opened = true;

                setTimeout(() => {
                    this.gameSection.classList.remove('hidden');
                    this.nav.classList.remove('hidden');
                }, 600);
            }
        });

        this.scrollBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            this.gameSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}