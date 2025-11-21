import { Auth } from './auth.js';
import { Book } from './card.js';
import { Wheel } from './wheel.js';
import { Tasks } from './tasks.js';
import { PrankButton } from './prank.js';

document.addEventListener('DOMContentLoaded', () => {
    new Auth('auth-screen', 'main-screen', 'login-btn');
    new Book();
    
    const wheel = new Wheel();
    new Tasks(wheel);
    new PrankButton('exit-btn');

    // Логика Модальных окон (О нас, Воспоминания)
    setupModal('memories-btn', 'memories-modal');
    setupModal('about-btn', 'about-modal');
});

function setupModal(btnId, modalId) {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    const close = modal.querySelector('.close-modal');

    btn.addEventListener('click', () => modal.classList.remove('hidden'));
    close.addEventListener('click', () => modal.classList.add('hidden'));
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
}