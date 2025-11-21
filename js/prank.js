export class PrankButton {
    constructor(btnId) {
        this.btn = document.getElementById(btnId);
        this.resetTimer = null;
        this.init();
    }

    init() {
        this.btn.addEventListener('mouseover', () => {
            if (this.resetTimer) clearTimeout(this.resetTimer);

            const maxX = window.innerWidth - this.btn.offsetWidth - 20;
            const maxY = window.innerHeight - this.btn.offsetHeight - 20;
            
            const randomX = Math.max(0, Math.random() * maxX);
            const randomY = Math.max(0, Math.random() * maxY);
            
            this.btn.style.position = 'fixed';
            this.btn.style.left = randomX + 'px';
            this.btn.style.top = randomY + 'px';
            this.btn.style.bottom = 'auto';
            this.btn.style.right = 'auto';

            this.resetTimer = setTimeout(() => {
                this.resetPosition();
            }, 1500);
        });

        this.btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Сегодня без выхода! Только веселье!');
        });
    }

    resetPosition() {
        this.btn.style.position = 'fixed';
        this.btn.style.left = 'auto';
        this.btn.style.top = 'auto';
        this.btn.style.bottom = '20px';
        this.btn.style.right = '20px';
    }
}