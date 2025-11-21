export class PhoneTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        this.modal = document.getElementById('task8-modal');
        this.input = document.getElementById('task8-answer');
        this.btn = document.getElementById('task8-submit');
        this.close = document.getElementById('close-task8');
        this.error = document.getElementById('task8-error');

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
        if (val === 'эдрамбрн' || val === 'xdmajbmk') {
            alert("Связь установлена! 📡");
            this.modal.classList.add('hidden');
            if(this.onWin) this.onWin();
        } else {
            this.error.classList.remove('hidden');
        }
    }
}