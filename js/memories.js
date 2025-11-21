export class Memories {
    constructor() {
        this.btn = document.getElementById('memories-btn');
        this.modal = document.getElementById('memories-modal');
        this.closeBtn = document.getElementById('close-memories');
        this.grid = document.getElementById('gallery-grid');
        
        // Лайтбокс
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxClose = document.querySelector('.close-lightbox');

        // НАСТРОЙКА: Сколько у тебя фото в папке assets/memories/
        this.totalPhotos = 74; 

        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.modal.classList.add('hidden'));
        
        // Закрытие лайтбокса
        this.lightboxClose.addEventListener('click', () => this.lightbox.classList.add('hidden'));
        this.lightbox.addEventListener('click', (e) => {
            if(e.target === this.lightbox) this.lightbox.classList.add('hidden');
        });

        this.renderGallery();
    }

    open() {
        this.modal.classList.remove('hidden');
    }

    renderGallery() {
        this.grid.innerHTML = '';
        
        // Генерируем фото (предполагаем имена 1.jpg, 2.jpg ...)
        for (let i = 1; i <= this.totalPhotos; i++) {
            const div = document.createElement('div');
            div.className = 'photo-item';
            
            const img = document.createElement('img');
            img.src = `assets/memories/${i}.jpg`;
            img.alt = `Memory ${i}`;
            
            // Обработка ошибок (если фото нет, покажем заглушку)
            img.onerror = () => {
                img.src = ''; 
                div.style.background = '#333';
                div.innerHTML = '<span style="color:white; display:flex; justify-content:center; align-items:center; height:100%;">Фото нет</span>';
            };

            // Клик по фото -> Открыть лайтбокс
            div.addEventListener('click', () => {
                this.lightboxImg.src = `assets/memories/${i}.jpg`;
                this.lightbox.classList.remove('hidden');
            });

            div.appendChild(img);
            this.grid.appendChild(div);
        }
    }
}