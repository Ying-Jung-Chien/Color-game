import Component from './component.js';
import Card from './card.js';
import Card_6 from './card_6.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.cards = [];
        this.card3s = [];
        this.card6s = [];
        const els = root.querySelectorAll(Card.getRootClass());
        for (let el of els) {
            const card = new Card(el);
            card.on('click', this.handleCardClick.bind(this));
            this.card3s.push(card);
        }
        for (let c of this.card3s) this.cards.push(c);

        const card6s = root.querySelectorAll(Card_6.getRootClass());
        for (let card6 of card6s) {
            // card6.style.display = "none";
            const _card = new Card_6(card6);
            _card.on('click', this.handleCardClick.bind(this));
            
            this.card6s.push(_card);
        }
        for (let c of this.card6s) this.cards.push(c);
        // console.log(this.card6s.length)
        // console.log(this.cards.length)
        this.pickedColor = this.pickColor();
    }

    reset(m) {
        this.gameOver = false;
        //console.log(m)
        this.cards = []
        if (m) {
            for (let card of this.card3s) this.cards.push(card);
            for (let card of this.card6s){
                card.display(1);
                this.cards.push(card);
            } 
        }
        else{
            for (let card of this.card6s) card.display(0);
            for (let card of this.card3s) this.cards.push(card);
        } 
        //console.log(this.cards.length)
        for (let card of this.cards)
            card.reset();
        this.pickedColor = this.pickColor();
    }

    getPickedColor() {
        return this.pickedColor;
    }

    handleCardClick(firer, color) {
        if (this.gameOver)
            return;

        if (color === this.pickedColor) {
            for (let card of this.cards)
                card.fadeIn("#FFF");
            this.gameOver = true;
            this.fire('rightClick', this.pickedColor);
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }
    }

    pickColor() {
        const random = Math.floor(Math.random() * this.cards.length);
        return this.cards[random].getColor();
    }

    timeOut() {
        this.gameOver = true;
        for (let card of this.cards)
            card.fadeIn("#FFF");
    }
}
