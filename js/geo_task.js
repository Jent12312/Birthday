export class GeoTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        this.modal = document.getElementById('task9-modal');
        this.input = document.getElementById('task9-answer');
        this.btn = document.getElementById('task9-submit');
        this.close = document.getElementById('close-task9');
        this.error = document.getElementById('task9-error');

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
        const val = this.input.value.trim();
        if (val === '4 20' || val === '4:20') {
            alert("Время пришло! 🌿");
            this.modal.classList.add('hidden');
            if(this.onWin) this.onWin();
        } else {
            this.error.classList.remove('hidden');
        }
    }
}