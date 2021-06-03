"use strict"
class CardSort {
    constructor({
        obj,
        wrap,
        qty
    }) {
        this.obj = obj;
        this.wrap = document.querySelector(wrap);
        this.toShow = qty - 1;
    }

    init() {

        this.cardToShow();
        this.elemForSort();
    }

    cardToShow() {

        for (let i = 0; i <= this.toShow; i++) {
            let card = document.createElement('div');
            card.classList.add('card')
            card.innerHTML = `
            <div class="card__img"><img src="" alt="cat"></div>
            <div class="card__content">
            <h2 class="card__title">Кот полосатый</h2>
            <div class="card__info">
                <p class="card__subTitle">Коричневый окрас</p>
                <p class="card__age"><span class="card__num">2</span><br>Возраст</p>
                <p class="card__qty"><span class="card__num">4</span><br>Кол-во лап</p>
            </div>
                <div class="card__price">
                    <span></span>
                </div>
            </div>
                <input class="input input_main button button_blue button_card" type="button" value="Купить"></input>
            `
            this.wrap.appendChild(card);
        }

        this.addText()
    }


    addText() {

        const cards = document.querySelectorAll('.card');

        for (let i = 0; i < cards.length; i++) {

            const img = cards[i].querySelector('img');
            const ageGroup = cards[i].querySelector('.card__age > .card__num');
            const cardPrice = cards[i].querySelector('.card__price');

            let { foto, age, price, discount, sold, like } = this.obj[i];
            img.src = foto;
            ageGroup.textContent = `${age} мес.`;
            cardPrice.textContent = `${this.numberWithSpaces(price)} руб.`;

            this.addHeart(cards[i], like);

            if (discount) {
                this.addDiscount(discount, cards[i]);
            }

            if (sold) {
                this.addSoldItem(cards[i])
            }
        }
        this.notify()
    }

    addHeart(card, like) {
        if (!like) {
            card.innerHTML += `
            <div class="heart heart_main">
                <div class="heart__wrap"><img src="./img/main/Vector.png" alt="heart"></div>
            </div>
            `
        } else {
            card.innerHTML += `
            <div class="heart heart_main">
                <div class="heart__wrap"><img src="./img/main/Vector_white.png" alt="heart"></div>
            </div>
            `
        }
    }

    notify() {
        const hearts = document.querySelectorAll('.heart');

        hearts.forEach((heart, index) => {

            heart.addEventListener('click', (e) => {

                if (!this.obj[index].like) {
                    this.obj[index].like = true;
                    e.target.src = "./img/main/Vector_white.png";
                } else {

                    e.target.src = "./img/main/Vector.png";
                    this.obj[index].like = false;
                }
            })
        })
    }

    addSoldItem(card) {

        let button = card.querySelector('.button');

        button.classList.add('button_black');
        button.value = "Продан";
    }

    addDiscount(disc, card) {

        card.innerHTML += `<div class="discount discount_card">${disc}</div>`
    }

    delDiscountAndSold() {

        const buttons = document.querySelectorAll('.button_black');
        const discounts = document.querySelectorAll('.discount');

        buttons.forEach(button => {

            button.classList.remove('button_black')
        })
        discounts.forEach(discount => {

            discount.remove();
        })
    }

    delHeart() {

        const hearts = document.querySelectorAll('.heart');

        hearts.forEach(heart => {
            heart.remove();
        })
    }

    elemForSort() {
        let dropMenus = document.querySelectorAll('.dropmenu');

        dropMenus.forEach(dropMenu => {

            dropMenu.addEventListener('click', (e) => {

                if (dropMenu.matches('[data-item="price"]')) {

                    this.sortingPriceMaxToLow()
                } else if (dropMenu.matches('[data-item="age"]')) {

                        this.sortingAgeLowToMax()
                    }
            })
        })
    }

    sortingPriceMaxToLow() { //сортировка массива по убыванию
        this.obj.sort(function (a, b) {

            return b.price - a.price;
        })
        this.delDiscountAndSold();
        this.delHeart();
        this.addText();
    }
    sortingAgeLowToMax() { //сортировка массива по возрастанию
        this.obj.sort(function (a, b) {

            return a.age - b.age;
        })
        this.delDiscountAndSold();
        this.delHeart();
        this.addText();
    }

    numberWithSpaces(x) {
        
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
};
const scrollUp = document.querySelector('.scrollup');

window.addEventListener('scroll', () => {
    if (pageYOffset > 450) {
        scrollUp.style.display = "block";
    } else {
        scrollUp.style.display = "none";
    }
});

scrollUp.addEventListener('click', () => {
    window.scrollTo(pageYOffset, 0);
});

const obj = [{
    title: 'Кот полосатый',
    foto: './img/main/cat1.png',
    price: 30000,
    age: 3,
    paws: 4,
    discount: '-41%',
    sold: false,
    like: false
}, 
{    
    title: 'Кот полосатый',
    foto: './img/main/cat2.png',
    price: 40000,
    age: 4,
    paws: 4,
    discount: false,
    sold: true,
    like: false
}, 
{
    title: 'Кот полосатый',
    foto: './img/main/cat3.png',
    price: 20000,
    age: 2,
    paws: 4,
    discount: false,
    sold: false,
    like: false   
},
{
    title: 'Кот полосатый',
    foto: './img/main/cat1.png',
    price: 25000,
    age: 2,
    paws: 4,
    discount: false,
    sold: false,
    like: false
}, 
{    
    title: 'Кот полосатый',
    foto: './img/main/cat2.png',
    price: 30000,
    age: 2,
    paws: 4,
    discount: '-41%',
    sold: false,
    like: false
}, 
{
    title: 'Кот полосатый',
    foto: './img/main/cat3.png',
    price: 10000,
    age: 1,
    paws: 4,
    discount: false,
    sold: true,
    like: false   
}];

const card = new CardSort({
    obj: obj,
    wrap: '.main__center',
    qty: 6
});

card.init();