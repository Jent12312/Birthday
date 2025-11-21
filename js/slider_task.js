export class SliderTask {
    constructor(onWinCallback) {
        this.onWin = onWinCallback;
        this.modal = document.getElementById('task7-modal');
        this.img = document.getElementById('slider-img');
        this.counter = document.getElementById('slide-counter');
        this.prevBtn = document.getElementById('prev-slide');
        this.nextBtn = document.getElementById('next-slide');
        
        this.input = document.getElementById('task7-answer');
        this.submitBtn = document.getElementById('task7-submit');
        this.close = document.getElementById('close-task7');
        this.error = document.getElementById('task7-error');

        this.currentIndex = 1;
        this.totalSlides = 18;

        this.init();
    }

    init() {
        this.close.addEventListener('click', () => this.modal.classList.add('hidden'));
        this.prevBtn.addEventListener('click', () => this.changeSlide(-1));
        this.nextBtn.addEventListener('click', () => this.changeSlide(1));
        this.submitBtn.addEventListener('click', () => this.check());
    }

    open() {
        this.currentIndex = 1;
        this.updateSlide();
        this.input.value = '';
        this.error.classList.add('hidden');
        this.modal.classList.remove('hidden');
    }

    changeSlide(dir) {
        this.currentIndex += dir;
        if (this.currentIndex < 1) this.currentIndex = this.totalSlides;
        if (this.currentIndex > this.totalSlides) this.currentIndex = 1;
        this.updateSlide();
    }

    updateSlide() {
        this.img.src = `assets/slider/${this.currentIndex}.png`;
        this.counter.innerText = `${this.currentIndex} / ${this.totalSlides}`;
    }

    check() {
        const val = this.input.value.trim();
        if (val === '35,274' || val === '35.274') {
            alert("Гениально! 🐪");
            this.modal.classList.add('hidden');
            if(this.onWin) this.onWin();
        } else {
            this.error.classList.remove('hidden');
        }
    }
}