export class FinalTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        this.modal = document.getElementById('task10-modal');
        this.input = document.getElementById('task10-answer');
        this.btn = document.getElementById('task10-submit');
        this.close = document.getElementById('close-task10');
        this.error = document.getElementById('task10-error');

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
        if (val === 'мир') {
            alert("Мир! ☮️\nТы выполнил все задания!");
            this.modal.classList.add('hidden');
            if(this.onWin) this.onWin();
        } else {
            this.error.classList.remove('hidden');
        }
    }
}