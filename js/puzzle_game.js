export class PuzzleGame {
    constructor(onWin) {
        this.onWin = onWin;
        this.modal = document.getElementById('game-puzzle-modal');
        this.container = document.getElementById('puzzle-container');
        this.resetBtn = document.getElementById('puzzle-reset');
        
        // === ИЗМЕНЕНИЯ ЗДЕСЬ ===
        this.size = 4;       // Сетка 4x4
        this.tileSize = 75;  // Размер плитки (300px / 4 = 75px)
        // =======================

        this.tiles = []; 
        
        this.init();
    }

    init() {
        this.resetBtn.addEventListener('click', () => this.shuffle());
    }

    open() {
        this.modal.classList.remove('hidden');
        this.start();
    }

    start() {
        // Создаем массив [0, 1, ... 15]
        this.tiles = Array.from({length: this.size * this.size}, (_, i) => i);
        this.shuffle();
    }

    shuffle() {
        // Делаем много случайных ходов (увеличил до 200, чтобы лучше мешалось)
        let emptyIdx = this.tiles.indexOf(this.size * this.size - 1);
        
        for(let i = 0; i < 200; i++) {
            const neighbors = this.getNeighbors(emptyIdx);
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            this.swap(emptyIdx, randomNeighbor);
            emptyIdx = randomNeighbor;
        }
        this.render();
    }

    getNeighbors(idx) {
        const neighbors = [];
        const row = Math.floor(idx / this.size);
        const col = idx % this.size;

        if (row > 0) neighbors.push(idx - this.size); // Верх
        if (row < this.size - 1) neighbors.push(idx + this.size); // Низ
        if (col > 0) neighbors.push(idx - 1); // Лево
        if (col < this.size - 1) neighbors.push(idx + 1); // Право
        
        return neighbors;
    }

    swap(idx1, idx2) {
        [this.tiles[idx1], this.tiles[idx2]] = [this.tiles[idx2], this.tiles[idx1]];
    }

    render() {
        this.container.innerHTML = '';
        this.tiles.forEach((tileNum, index) => {
            const div = document.createElement('div');
            div.className = 'puzzle-tile';
            
            // Визуальные координаты
            const row = Math.floor(index / this.size);
            const col = index % this.size;
            
            div.style.top = `${row * this.tileSize}px`;
            div.style.left = `${col * this.tileSize}px`;

            // Пустая плитка (последняя, номер 15)
            if (tileNum === this.size * this.size - 1) {
                div.classList.add('empty');
            } else {
                // Координаты картинки
                const bgRow = Math.floor(tileNum / this.size);
                const bgCol = tileNum % this.size;
                
                div.style.backgroundPosition = `-${bgCol * this.tileSize}px -${bgRow * this.tileSize}px`;
                div.onclick = () => this.handleClick(index);
            }
            
            this.container.appendChild(div);
        });
        
        this.checkWin();
    }

    handleClick(index) {
        const emptyIdx = this.tiles.indexOf(this.size * this.size - 1);
        const neighbors = this.getNeighbors(emptyIdx);
        
        if (neighbors.includes(index)) {
            this.swap(index, emptyIdx);
            this.render();
        }
    }

    checkWin() {
        const isWin = this.tiles.every((val, idx) => val === idx);
        if (isWin) {
            setTimeout(() => {
                alert("Граммофон собран! Музыка играет! 🎶");
                this.modal.classList.add('hidden');
                this.onWin();
            }, 300);
        }
    }
}