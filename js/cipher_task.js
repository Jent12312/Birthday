export class CipherTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        this.modal = document.getElementById('task3-modal');
        this.input = document.getElementById('task3-answer');
        this.btn = document.getElementById('task3-submit');
        this.close = document.getElementById('close-task3');
        this.error = document.getElementById('task3-error');

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
        // Проверяем "сырник"
        if (val === 'сырник') {
            alert("Верно! Это вкусный код! 🥞");
            this.modal.classList.add('hidden');
            if(this.onWin) this.onWin();
        } else {
            this.error.classList.remove('hidden');
            this.input.style.border = "2px solid red";
        }
    }
}