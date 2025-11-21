export class Auth {
    constructor(authScreenId, mainScreenId, btnId) {
        this.authScreen = document.getElementById(authScreenId);
        this.mainScreen = document.getElementById(mainScreenId);
        this.btn = document.getElementById(btnId);
        this.loginInput = document.getElementById('login-input');
        this.passInput = document.getElementById('pass-input');
        this.card = document.querySelector('.auth-card'); 

        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.checkLogin());
        
        this.passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkLogin();
        });
    }

    checkLogin() {
        const login = this.loginInput.value.trim();
        const pass = this.passInput.value.trim();

        if (login === 'StepanovaMira2005holimail.troll' && pass === '21112005') {
            
            // Успешный вход
            this.authScreen.style.opacity = '0';
            this.authScreen.style.transition = 'opacity 0.8s';
            
            setTimeout(() => {
                this.authScreen.classList.add('hidden');
                this.mainScreen.classList.remove('hidden');
            }, 800);

        } else {
            // Ошибка - Тряска карточки
            this.card.classList.add('shake');
            this.passInput.value = ''; 
            
            // Убираем класс, чтобы можно было потрясти снова
            setTimeout(() => {
                this.card.classList.remove('shake');
            }, 500);
        }
    }
}