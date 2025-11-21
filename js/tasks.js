import { PokerGame } from './poker.js';
import { QrTask } from './qr_task.js';
import { CipherTask } from './cipher_task.js';
import { MathTask } from './math_task.js';
import { CaesarTask } from './caesar_task.js';
import { ChemistryTask } from './chemistry_task.js';
import { SliderTask } from './slider_task.js';
import { PhoneTask } from './phone_task.js';
import { GeoTask } from './geo_task.js';
import { FinalTask } from './final_task.js';

export class Tasks {
    constructor(spinSystem) {
        this.spinSystem = spinSystem;
        this.modal = document.getElementById('tasks-modal');
        this.grid = document.getElementById('tasks-grid');
        this.btn = document.getElementById('get-spins-btn');
        this.close = document.querySelector('#tasks-modal .close-modal');
        
        this.totalTasks = 10;
        // Массив состояний: false - не выполнено, true - выполнено
        this.tasksState = new Array(this.totalTasks).fill(false);
        
        // Инициализация классов игр.
        // Каждой игре передаем колбек (функцию), которая сработает при победе.
        this.games = [
            new PokerGame(() => this.completeTask(0)),      // Задание 1
            new QrTask(() => this.completeTask(1)),         // Задание 2
            new CipherTask(() => this.completeTask(2)),     // Задание 3
            new MathTask(() => this.completeTask(3)),       // Задание 4
            new CaesarTask(() => this.completeTask(4)),     // Задание 5
            new ChemistryTask(() => this.completeTask(5)),  // Задание 6
            new SliderTask(() => this.completeTask(6)),     // Задание 7
            new PhoneTask(() => this.completeTask(7)),      // Задание 8
            new GeoTask(() => this.completeTask(8)),         // Задание 9
            new FinalTask(() => this.completeTask(9))
        ];

        this.init();
    }

    init() {
        // Открытие списка заданий
        this.btn.addEventListener('click', () => this.modal.classList.remove('hidden'));
        // Закрытие списка заданий
        this.close.addEventListener('click', () => this.modal.classList.add('hidden'));
        
        this.render();
    }

    render() {
        this.grid.innerHTML = '';
        
        // Названия для кнопок
        const names = [
            "🃏 Покер",          // 1
            "🧩 Шифр QR",        // 2
            "🥞 Сырник",         // 3
            "❤️ Формула",        // 4
            "🌿 Венок",          // 5
            "⚗️ Химия",          // 6
            "🐫 Верблюды",       // 7
            "📞 Звонок",         // 8
            "📍 Координаты",     // 9
            "☮️ Знак"           // 10
        ];

        for (let i = 0; i < this.totalTasks; i++) {
            const btn = document.createElement('button');
            btn.className = 'task-btn';
            
            if (this.tasksState[i]) {
                // Если задание выполнено
                btn.innerText = `${names[i]}\n(Выполнено)`;
                btn.classList.add('done');
                btn.disabled = true;
            } else {
                // Если доступно
                btn.innerText = names[i];
                btn.onclick = () => this.startTask(i);
            }
            this.grid.appendChild(btn);
        }
    }

    startTask(index) {
        if (this.games[index]) {
            this.modal.classList.add('hidden'); // Скрываем меню выбора
            this.games[index].open();           // Запускаем игру
        }
    }

    completeTask(index) {
        // Отмечаем выполненным
        this.tasksState[index] = true;
        
        // Начисляем спин
        this.spinSystem.addSpins(10);
        
        // Перерисовываем кнопки (чтобы эта стала зеленой)
        this.render();
        
        // Возвращаем игрока в меню заданий
        this.modal.classList.remove('hidden');
    }
}