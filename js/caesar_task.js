export class CaesarTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        this.modal = document.getElementById('task5-modal');
        this.input = document.getElementById('task5-answer');
        this.btn = document.getElementById('task5-submit');
        this.close = document.getElementById('close-task5');
        this.error = document.getElementById('task5-error');

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
        // Ответ: Фунтик
        if (val === 'фунтик') {
            alert("Это Фунтик! 🌿");
            this.modal.classList.add('hidden');
            if(this.onWin) this.onWin();
        } else {
            this.error.classList.remove('hidden');
            this.input.style.border = "2px solid red";
            
            // Пасхалка, если введут "цезарь"
            if (val === 'цезарь') {
                alert("Цезарь - это ключ, а не ответ!");
            }
        }
    }
}