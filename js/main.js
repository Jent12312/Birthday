import { Auth } from './auth.js';
import { Book } from './card.js';
import { Wheel } from './wheel.js';
import { Tasks } from './tasks.js';
import { PrankButton } from './prank.js';
import { Memories } from './memories.js'; // Подключаем новый модуль галереи

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Логика входа (Login / Password)
    new Auth('auth-screen', 'main-screen', 'login-btn');

    // 2. Логика 3D Открытки-Книги
    new Book();
    
    // 3. Колесо Фортуны (содержит логику мини-игр: Угадай число, Ван Гог, Пазл)
    const wheel = new Wheel();

    // 4. Система заданий (10 штук)
    // Передаем wheel, чтобы при выполнении задания добавлялись спины
    new Tasks(wheel);

    // 5. Кнопка "Выход" (Пранк)
    new PrankButton('exit-btn');

    // 6. Галерея воспоминаний
    new Memories();

    // 7. Логика простого окна "О нас"
    // (Оно слишком простое для отдельного файла, опишем тут)
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');

    if (aboutBtn && aboutModal) {
        const closeAbout = aboutModal.querySelector('.close-modal');

        // Открыть
        aboutBtn.addEventListener('click', () => {
            aboutModal.classList.remove('hidden');
        });

        // Закрыть по крестику
        closeAbout.addEventListener('click', () => {
            aboutModal.classList.add('hidden');
        });

        // Закрыть по клику на фон
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.add('hidden');
            }
        });
    }
});