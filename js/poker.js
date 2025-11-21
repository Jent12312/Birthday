export class PokerGame {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        
        this.modal = document.getElementById('poker-modal');
        this.balanceEl = document.getElementById('poker-balance');
        this.cardsContainer = document.getElementById('poker-cards');
        this.dealBtn = document.getElementById('poker-deal-btn');
        this.statusEl = document.getElementById('poker-status');
        this.closeBtn = document.getElementById('close-poker');

        this.suits = ['♠', '♥', '♦', '♣'];
        this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        this.balance = 500;
        this.target = 1000;
        this.bet = 50; // Снизим ставку, чтобы дольше играть
        
        this.deck = [];
        this.hand = [];     // Текущие карты (объекты)
        this.held = [];     // Индексы карт, которые оставляем [true, false, ...]
        
        this.gameState = 'start'; // 'start', 'deal', 'draw'

        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.modal.classList.add('hidden'));
        this.dealBtn.addEventListener('click', () => this.handleBtnClick());
        this.updateUI();
    }

    open() {
        this.balance = 500;
        this.gameState = 'start';
        this.updateUI();
        this.cardsContainer.innerHTML = `
            <div class="card-slot"></div><div class="card-slot"></div>
            <div class="card-slot"></div><div class="card-slot"></div>
            <div class="card-slot"></div>
        `;
        this.statusEl.innerText = "Цель: 1000. Жми Сдача!";
        this.dealBtn.innerText = `Сдача (Ставка ${this.bet})`;
        this.dealBtn.disabled = false;
        this.modal.classList.remove('hidden');
    }

    updateUI() {
        this.balanceEl.innerText = this.balance;
        
        if (this.balance < this.bet && this.balance > 0) {
             this.statusEl.innerText = "Не хватает на ставку! Держи бонус +200!";
             this.balance += 200;
             setTimeout(() => this.updateUI(), 1000);
        } else if (this.balance <= 0) {
            this.statusEl.innerText = "Банкрот! +300 от заведения!";
            this.balance = 300;
            setTimeout(() => this.updateUI(), 1000);
        }
    }

    // Генерация новой колоды
    createDeck() {
        this.deck = [];
        for (let s of this.suits) {
            for (let v of this.values) {
                this.deck.push({ suit: s, value: v });
            }
        }
        // Перемешиваем (алгоритм Фишера-Йейтса)
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    handleBtnClick() {
        if (this.gameState === 'start' || this.gameState === 'result') {
            this.firstDeal();
        } else if (this.gameState === 'deal') {
            this.secondDeal();
        }
    }

    // 1. Первая раздача (списание ставки)
    firstDeal() {
        if (this.balance < this.bet) return;

        this.balance -= this.bet;
        this.updateUI();
        this.createDeck();
        
        this.hand = [];
        this.held = [false, false, false, false, false]; // Сброс удержаний

        // Берем 5 карт
        for(let i=0; i<5; i++) {
            this.hand.push(this.deck.pop());
        }

        this.renderCards(true); // true = можно кликать
        this.statusEl.innerText = "Выберите карты, которые оставить (HOLD)";
        this.statusEl.style.color = "#fff";
        
        this.dealBtn.innerText = "МЕНЯТЬ КАРТЫ 🔄";
        this.dealBtn.classList.replace('btn-primary', 'btn-small'); // Визуально меняем кнопку (опционально)
        this.gameState = 'deal';
    }

    // 2. Замена карт
    secondDeal() {
        // Меняем те, которые НЕ held
        for(let i=0; i<5; i++) {
            if (!this.held[i]) {
                this.hand[i] = this.deck.pop(); // Берем новую из колоды
            }
        }

        this.renderCards(false); // false = нельзя кликать
        this.checkWin();
        
        this.dealBtn.innerText = `Сдача (Ставка ${this.bet})`;
        this.dealBtn.classList.replace('btn-small', 'btn-primary');
        this.gameState = 'result';
    }

    renderCards(interactive) {
        this.cardsContainer.innerHTML = '';
        this.hand.forEach((card, index) => {
            const el = document.createElement('div');
            const isRed = card.suit === '♥' || card.suit === '♦';
            el.className = `poker-card ${isRed ? 'red' : 'black'}`;
            if (this.held[index]) el.classList.add('held'); // Если была выбрана
            
            el.innerHTML = `<div style="font-size:30px">${card.value}</div><div>${card.suit}</div>`;
            
            // Клик по карте (только в фазе выбора)
            if (interactive) {
                el.onclick = () => {
                    this.held[index] = !this.held[index]; // Переключаем
                    el.classList.toggle('held');
                };
            }

            this.cardsContainer.appendChild(el);
        });
    }

    checkWin() {
        const counts = {};
        this.hand.forEach(c => counts[c.value] = (counts[c.value] || 0) + 1);
        const vals = Object.values(counts);
        
        // Определяем комбинацию
        let win = 0;
        let name = "Пусто";

        
        if (vals.includes(5)) { name = "5 одинаковых"; win = 1000; }
        else if (vals.includes(4)) { name = "Каре"; win = 500; }
        else if (vals.includes(3) && vals.includes(2)) { name = "Фулл Хаус"; win = 300; }
        else if (vals.includes(3)) { name = "Тройка"; win = 150; }
        else {
            const pairs = vals.filter(v => v === 2).length;
            if (pairs === 2) { name = "Две пары"; win = 100; } // x2
            else if (pairs === 1) { 
                // В настоящем покере пара валетов и выше, у нас - любая пара возвращает ставку
                name = "Пара"; win = 50; // Возврат ставки
            }
        }

        if (win > 0) {
            this.balance += win;
            this.statusEl.innerHTML = `<span style="color:#00e676; font-size:20px">WIN! ${name} (+${win})</span>`;
        } else {
            this.statusEl.innerText = "Ничего не совпало...";
            this.statusEl.style.color = "#ccc";
        }

        this.updateUI();

        // Проверка победы в задании
        if (this.balance >= this.target) {
            this.dealBtn.disabled = true;
            setTimeout(() => {
                alert("🎉 ПОЗДРАВЛЯЮ! Ты заработал 1000 монет!");
                this.modal.classList.add('hidden');
                if (this.onWin) this.onWin();
            }, 500);
        }
    }
}