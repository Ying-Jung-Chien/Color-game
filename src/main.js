import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);

        this.mode = 1;
        this.timeout;
        this.blink;
        this.blinkTime = 0;
        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.on('easy', this.handleEasyClick.bind(this));
        this.navbar.on('hard', this.handleHardClick.bind(this));
        this.navbar.on('nightmare', this.handleNightmareClick.bind(this));

        this.deck = new Deck(root.querySelector('.deck'));
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleResetClick.bind(this));
    }

    handleEasyClick(firer) {
        clearTimeout(this.timeout);
        clearInterval(this.blink);
        this.mode = 0;
        this.root.style.backgroundColor = "#232323";
        this.navbar.select(0);
        this.deck.reset(0);
        this.board.reset(this.deck.getPickedColor(), 0);
        this.reset.reset(0);
    }

    handleHardClick(firer) {
        clearTimeout(this.timeout);
        clearInterval(this.blink);
        this.mode = 1;
        this.root.style.backgroundColor = "#232323";
        this.navbar.select(1);
        this.deck.reset(1);
        this.board.reset(this.deck.getPickedColor(), 1);
        this.reset.reset(1);
    }

    handleNightmareClick(firer) {
        clearTimeout(this.timeout);
        clearInterval(this.blink);
        this.blinkTime = 0;
        this.timeout = setTimeout(this.isTimeOut.bind(this), 5000);
        this.blink = setInterval(this.isBlink.bind(this), 100);
        this.mode = 2;
        this.root.style.backgroundColor = "#232323";
        this.navbar.select(2);
        this.deck.reset(1);
        this.board.reset(this.deck.getPickedColor(), 2);
        this.reset.reset(2);
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage(this.mode);
    }

    handleDeckRightClick(firer, pickedColor) {
        clearTimeout(this.timeout);
        clearInterval(this.blink);
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
    }

    handleResetClick(firer) {
        this.root.style.backgroundColor = "#232323";

        this.deck.reset(this.mode);
        this.board.reset(this.deck.getPickedColor(), this.mode);
        firer.reset(this.mode);
        if(this.mode == 2){
            this.blinkTime = 0;
            this.timeout = setTimeout(this.isTimeOut.bind(this), 5000);
            this.blink = setInterval(this.isBlink.bind(this), 100);
        } 
    }

    isTimeOut() {
        clearInterval(this.blink);
        this.root.style.backgroundColor = this.deck.getPickedColor();
        this.reset.showPlayAgain();
        this.deck.timeOut();
    }
    isBlink() {
        this.blinkTime++;
        if(this.blinkTime % 10 === 0) this.root.style.backgroundColor = "#fff";
        else this.root.style.backgroundColor = "#232323";
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
