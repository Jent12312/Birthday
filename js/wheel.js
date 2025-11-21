import { Confetti } from './confetti.js';

export class Wheel {
    constructor() {
        this.wheel = document.getElementById('wheel');
        this.btn = document.getElementById('spin-btn');
        this.countSpan = document.getElementById('spin-count');
        this.msg = document.getElementById('game-msg');
        
        this.prizeModal = document.getElementById('prize-modal');
        this.prizeText = document.getElementById('prize-text');
        this.closePrizeBtn = document.getElementById('close-prize-btn');

        this.confetti = new Confetti();
        
        this.spins = 0; 
        this.globalSpinCount = 0;
        this.isSpinning = false;
        this.currentRotation = 0; 

        this.init();
    }

    init() {
        this.updateUI();
        this.btn.addEventListener('click', () => this.spin());
        this.closePrizeBtn.addEventListener('click', () => this.prizeModal.classList.add('hidden'));
    }

    addSpins(amount) {
        this.spins += amount;
        this.updateUI();
        if(this.spins > 0) {
            this.msg.style.color = "#00e676";
            this.msg.innerText = "Отлично! Жми кнопку 'Крутить'!";
        }
    }

    updateUI() {
        this.countSpan.innerText = this.spins;
        this.btn.disabled = this.spins <= 0 || this.isSpinning;
    }

    spin() {
        if (this.spins <= 0 || this.isSpinning) return;

        this.isSpinning = true;
        this.spins--;
        this.globalSpinCount++; 
        this.updateUI();

        // --- ЛОГИКА ВЫИГРЫША ---
        let targetIndex;
        let prizeName = "";
        let isWin = false;

        if (this.globalSpinCount === 3) {
            targetIndex = 0; // Индекс 0 (Подарок)
            prizeName = "🎁 ТАЙНЫЙ ПОДАРОК!";
            isWin = true;
        } else if (this.globalSpinCount === 7) {
            targetIndex = 2; // Индекс 2 (Просто подарок)
            prizeName = "✨ ПРОСТО ПОДАРОК!";
            isWin = true;
        } else if (this.globalSpinCount === 10) {
            targetIndex = 4; // Индекс 4 (Супер приз)
            prizeName = "🏆 ГЛАВНЫЙ СУПЕР ПРИЗ!";
            isWin = true;
        } else {
            // Проигрыш (выбираем из секторов 1, 3, 5)
            const losers = [1, 3, 5];
            targetIndex = losers[Math.floor(Math.random() * losers.length)];
            isWin = false;
        }

        // --- ВРАЩЕНИЕ (Математика центрирования) ---
        const sectorArc = 60;
        // Центр сектора
        const targetAngleOnWheel = (targetIndex * sectorArc) + (sectorArc / 2);
        const extraSpins = 360 * 5;
        
        const currentCircle = Math.ceil(this.currentRotation / 360) * 360;
        let nextRotation = currentCircle + extraSpins + (360 - targetAngleOnWheel);
        
        this.currentRotation = nextRotation;
        this.wheel.style.transform = `rotate(${this.currentRotation}deg)`;

        setTimeout(() => {
            this.isSpinning = false;
            this.updateUI();
            
            if (isWin) {
                this.showWin(prizeName);
                // УБИРАЕМ ПОДАРОК С ПОЛЯ
                this.markSectorAsClaimed(targetIndex);
            } else {
                this.msg.innerText = "Пусто... Не расстраивайся, крути еще!";
                this.msg.style.color = "#ff4081";
            }
        }, 4000);
    }

    // Новая функция: заменяет текст сектора
    markSectorAsClaimed(index) {
        // Находим все элементы с классом .label
        const labels = document.querySelectorAll('.label');
        // Берем нужный по индексу
        const targetLabel = labels[index];

        if (targetLabel) {
            // Добавляем класс для изменения стиля (серый цвет)
            targetLabel.classList.add('claimed');
            
            // Меняем текст внутри span
            const span = targetLabel.querySelector('span');
            if (span) {
                // Заменяем HTML на "Взято"
                span.innerHTML = 'Пусто'; 
            }
        }
    }

    showWin(text) {
        this.confetti.start();
        this.prizeText.innerText = text;
        this.prizeModal.classList.remove('hidden');
    }
}