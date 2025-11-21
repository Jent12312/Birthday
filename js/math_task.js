export class MathTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        this.modal = document.getElementById('task4-modal');
        this.input = document.getElementById('task4-answer');
        this.btn = document.getElementById('task4-submit');
        this.close = document.getElementById('close-task4');
        this.error = document.getElementById('task4-error');

        this.init();
    }

    init() {
        this.close.addEventListener('click', () => this.modal.classList.add('hidden'));
        this.btn.addEventListener('click', () => this.check());
    }

    open() {
        this.input.value = '';
        this.error.classList.add('hidden');
        this.modal.classList.remove('hidden');
    }

    check() {
        const val = this.input.value.trim().toLowerCase();
        // Убираем лишние пробелы и знаки препинания для мягкой проверки
        // Можно просто проверить точную фразу
        if (val.includes('мы любим тебя')) {
            alert("Правильно мы тебя любим! ❤️");
            this.modal.classList.add('hidden');
            if(this.onWin) this.onWin();
        } else {
            this.error.classList.remove('hidden');
            this.input.style.border = "2px solid red";
        }
    }
}