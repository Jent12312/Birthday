export class QrTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;

        this.modal = document.getElementById('qr-modal');
        this.closeBtn = document.getElementById('close-qr');
        this.submitBtn = document.getElementById('qr-submit-btn');
        this.input = document.getElementById('qr-answer');
        this.errorMsg = document.getElementById('qr-error');
        
        // Элементы подсказки
        this.hintBtn = document.getElementById('qr-hint-btn');
        this.tooltip = document.getElementById('qr-tooltip');

        this.isHintActive = false; // Статус лампочки

        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.modal.classList.add('hidden'));
        
        // Проверка ответа
        this.submitBtn.addEventListener('click', () => this.checkAnswer());
        
        // Логика подсказки
        this.hintBtn.addEventListener('click', () => this.handleHintClick());
        this.hintBtn.addEventListener('mouseenter', () => this.handleHover(true));
        this.hintBtn.addEventListener('mouseleave', () => this.handleHover(false));
    }

    open() {
        // Сброс состояния при открытии
        this.input.value = '';
        this.errorMsg.classList.add('hidden');
        
        // Возвращаем лампочку
        this.isHintActive = false;
        this.hintBtn.innerText = '💡';
        this.tooltip.classList.remove('visible');
        
        this.modal.classList.remove('hidden');
    }

    checkAnswer() {
        const val = this.input.value.trim().toLowerCase();
        
        if (val === 'game') {
            alert("Правильно! Это была игра! 🎮");
            this.modal.classList.add('hidden');
            if (this.onWin) this.onWin();
        } else {
            this.errorMsg.classList.remove('hidden');
            // Тряска поля ввода
            this.input.style.border = "2px solid red";
            setTimeout(() => this.input.style.border = "1px solid #ccc", 1000);
        }
    }

    handleHintClick() {
        if (!this.isHintActive) {
            // 1. Открываем сайт с лампочками
            window.open('https://kaz.saturn.net/catalog/lampi/', '_blank');
            
            // 2. Меняем иконку
            this.hintBtn.innerText = '❓';
            this.isHintActive = true;
        }
    }

    handleHover(isHovering) {
        // Тултип показываем ТОЛЬКО если лампочка уже стала вопросом
        if (this.isHintActive) {
            if (isHovering) {
                this.tooltip.classList.add('visible');
            } else {
                this.tooltip.classList.remove('visible');
            }
        }
    }
}