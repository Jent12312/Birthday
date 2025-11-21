export class ChemistryTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        this.modal = document.getElementById('task6-modal');
        this.inputX = document.getElementById('task6-x');
        this.inputY = document.getElementById('task6-y');
        this.inputReact = document.getElementById('task6-reaction');
        this.btn = document.getElementById('task6-submit');
        this.close = document.getElementById('close-task6');
        this.error = document.getElementById('task6-error');

        this.init();
    }

    init() {
        this.close.addEventListener('click', () => this.modal.classList.add('hidden'));
        this.btn.addEventListener('click', () => this.check());
    }

    open() {
        this.inputX.value = ''; this.inputY.value = ''; this.inputReact.value = '';
        this.error.classList.add('hidden');
        this.modal.classList.remove('hidden');
    }

    check() {
        const x = this.inputX.value.trim().toLowerCase();
        const y = this.inputY.value.trim().toLowerCase();
        const r = this.inputReact.value.trim().toLowerCase();

        if (x === 'свинец' && y === 'йод' && r === 'золотой дождь') {
            alert("Блестяще! ✨");
            this.modal.classList.add('hidden');
            if(this.onWin) this.onWin();
        } else {
            this.error.classList.remove('hidden');
        }
    }
}