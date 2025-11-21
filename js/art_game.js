export class ArtGame {
    constructor(onWin) {
        this.onWin = onWin;
        this.modal = document.getElementById('game-art-modal');
        this.input = document.getElementById('art-guess-input');
        this.btn = document.getElementById('art-guess-submit');
        this.msg = document.getElementById('art-guess-msg');
        
        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.check());
    }

    open() {
        this.input.value = '';
        this.msg.classList.add('hidden');
        this.modal.classList.remove('hidden');
    }

    check() {
        const val = this.input.value.trim().toLowerCase();
        if (val === 'vincent' || val === 'винсент') {
            alert("Шедевр подписан!");
            this.modal.classList.add('hidden');
            this.onWin();
        } else {
            this.msg.classList.remove('hidden');
            this.input.style.border = "2px solid red";
        }
    }
}