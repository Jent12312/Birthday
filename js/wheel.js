import { Confetti } from './confetti.js';
// Импортируем классы мини-игр
import { GuessGame } from './guess_game.js';
import { ArtGame } from './art_game.js';
import { PuzzleGame } from './puzzle_game.js';

export class Wheel {
    constructor() {
        // Элементы DOM
        this.wheel = document.getElementById('wheel');
        this.btn = document.getElementById('spin-btn');
        this.countSpan = document.getElementById('spin-count');
        this.msg = document.getElementById('game-msg');
        
        // Модальное окно "Финальный приз"
        this.prizeModal = document.getElementById('prize-modal');
        this.prizeText = document.getElementById('prize-text');
        this.closePrizeBtn = document.getElementById('close-prize-btn');

        // Эффекты
        this.confetti = new Confetti();
        
        // Инициализируем мини-игры.
        // В конструктор передаем функцию (callback), которая сработает ТОЛЬКО после победы в игре.
        // Эта функция вызывает this.claimPrize(), чтобы выдать награду.
        
        // 1. Книга (Сектор 0)
        this.guessGame = new GuessGame(() => this.claimPrize(0, "📖 КНИГА (Бесценно)"));
        
        // 2. Картина (Сектор 2)
        this.artGame = new ArtGame(() => this.claimPrize(2, "🖼️ ВАН ГОГ"));
        
        // 3. Граммофон (Сектор 4)
        this.puzzleGame = new PuzzleGame(() => this.claimPrize(4, "🎶 РЕТРО ГРАММОФОН"));

        // Состояние игры
        this.spins = 0;              // Текущее кол-во спинов (валюта)
        this.globalSpinCount = 0;    // Сколько раз всего крутили (история)
        this.isSpinning = false;     // Блокировка кнопки
        this.currentRotation = 0;    // Текущий угол поворота

        this.init();
    }

    init() {
        this.updateUI();
        this.btn.addEventListener('click', () => this.spin());
        this.closePrizeBtn.addEventListener('click', () => this.prizeModal.classList.add('hidden'));
    }

    // Метод вызывается из tasks.js, когда выполнено задание
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
        // Кнопка активна только если есть спины и колесо не крутится
        this.btn.disabled = this.spins <= 0 || this.isSpinning;
    }

    spin() {
        if (this.spins <= 0 || this.isSpinning) return;

        this.isSpinning = true;
        this.spins--;
        this.globalSpinCount++; // Увеличиваем счетчик попыток
        this.updateUI();

        // === ЛОГИКА ПОДКРУТКИ ===
        let targetIndex;
        let prizeType = "none"; // 'book', 'art', 'gramophone', 'none'

        // CSS Сектора (по часовой стрелке, 0 - сверху):
        // 0: Подарок (Книга)
        // 1: Ничего
        // 2: Просто подарок (Ван Гог)
        // 3: Ничего
        // 4: Супер приз (Граммофон)
        // 5: Ничего

        if (this.globalSpinCount === 3) {
            targetIndex = 0; 
            prizeType = 'book'; // Запустим игру "Угадай цену"
        } else if (this.globalSpinCount === 7) {
            targetIndex = 2;
            prizeType = 'art';  // Запустим игру "Подпиши картину"
        } else if (this.globalSpinCount === 10) {
            targetIndex = 4;
            prizeType = 'gramophone'; // Запустим игру "Пазл"
        } else {
            // Проигрыш (выбираем любой пустой сектор: 1, 3 или 5)
            const losers = [1, 3, 5];
            targetIndex = losers[Math.floor(Math.random() * losers.length)];
            prizeType = 'none';
        }

        // === МАТЕМАТИКА ВРАЩЕНИЯ ===
        const sectorArc = 60; // Размер сектора в градусах
        // Центр целевого сектора
        const targetAngleOnWheel = (targetIndex * sectorArc) + (sectorArc / 2);
        
        // Делаем 5 полных оборотов для красоты
        const extraSpins = 360 * 5;
        
        // Считаем, где сейчас колесо (округляем до полного круга)
        const currentCircle = Math.ceil(this.currentRotation / 360) * 360;
        
        // Формула: Текущий круг + Доп. обороты + (360 - Угол цели)
        // (360 - угол) нужно, чтобы этот угол оказался наверху (на 0 градусов)
        let nextRotation = currentCircle + extraSpins + (360 - targetAngleOnWheel);
        
        this.currentRotation = nextRotation;
        this.wheel.style.transform = `rotate(${this.currentRotation}deg)`;

        // Ждем окончания анимации (4 секунды, как в CSS transition)
        setTimeout(() => {
            this.isSpinning = false;
            this.updateUI();
            
            // === ЗАПУСК МИНИ-ИГР ИЛИ ПРОИГРЫШ ===
            if (prizeType === 'book') {
                this.guessGame.open(); // Открываем игру с ценой
            } else if (prizeType === 'art') {
                this.artGame.open();   // Открываем игру с Ван Гогом
            } else if (prizeType === 'gramophone') {
                this.puzzleGame.open(); // Открываем пазл
            } else {
                // Обычный проигрыш
                this.msg.innerText = "Пусто... Не расстраивайся, крути еще!";
                this.msg.style.color = "#ff4081";
            }
        }, 4000);
    }

    // Эта функция вызывается ТОЛЬКО когда игрок победил в мини-игре
    claimPrize(index, text) {
        // 1. Показать салют и окно победы
        this.showWin(text);
        // 2. Визуально "зачеркнуть" сектор на колесе
        this.markSectorAsClaimed(index);
        
        // Меняем сообщение
        this.msg.innerText = "Подарок получен! Продолжай играть!";
        this.msg.style.color = "#00e676";
    }

    // Делает сектор серым и пишет "Взято"
    markSectorAsClaimed(index) {
        const labels = document.querySelectorAll('.label');
        const targetLabel = labels[index];
        
        if (targetLabel) {
            targetLabel.classList.add('claimed');
            const span = targetLabel.querySelector('span');
            if (span) {
                span.innerHTML = 'Взято'; 
            }
        }
    }

    // Показывает финальную модалку с призом
    showWin(text) {
        this.confetti.start();
        this.prizeText.innerText = text;
        this.prizeModal.classList.remove('hidden');
    }
}