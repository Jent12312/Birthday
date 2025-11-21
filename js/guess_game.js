export class GuessGame {
    constructor(onWin) {
        this.onWin = onWin;
        this.modal = document.getElementById('game-book-modal');
        this.input = document.getElementById('book-guess-input');
        this.btn = document.getElementById('book-guess-submit');
        this.msg = document.getElementById('book-guess-msg');
        
        this.target = 389;
        
        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.check());
    }

    open() {
        this.input.value = '';
        this.msg.innerText = '';
        this.modal.classList.remove('hidden');
    }

    check() {
        const val = parseInt(this.input.value);
        if (isNaN(val)) return;

        if (val === this.target) {
            this.msg.style.color = "green";
            this.msg.innerText = "В точку! Это цена!";
            setTimeout(() => {
                this.modal.classList.add('hidden');
                this.onWin(); // Выдаем подарок
            }, 1000);
        } else if (val < this.target) {
            this.msg.style.color = "#ff4081";
            this.msg.innerText = "Маловато будет... Бери выше! ⬆️";
        } else {
            this.msg.style.color = "#ff4081";
            this.msg.innerText = "Ого! Многовато... Бери ниже! ⬇️";
        }
    }
}