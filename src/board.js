import Component from  './component.js';

import './board.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }

    constructor(root, color) {
        super(root);

        this.myTimer;
        this.time = 5;
        this.colorDisplay = root.querySelector('.color-picked');
        this.messageDisplay = root.querySelector('.message');
        this.reset(color);
    }

    reset(color, mode) {
        this.colorDisplay.textContent = color;
        this.time = 5;
        clearInterval(this.myTimer);
        if (mode == 2) {
            this.messageDisplay.textContent = "What's the Color? " + this.time;
            this.myTimer = setInterval(this.timer.bind(this), 1000);
        }
        else this.messageDisplay.textContent = "What's the Color?";
    }

    showColor(color) {
        this.colorDisplay.textContent = color;
    }

    showCorrectMessage() {
        clearInterval(this.myTimer);
        this.messageDisplay.textContent = "Correct!";
    }

    showWrongMessage(mode) {
        if (mode == 2) this.messageDisplay.textContent = "Try Again " + this.time;
        else this.messageDisplay.textContent = "Try Again";
    }

    timer() {
        if (this.time > 1){
            this.time--;
            if(/Try/.test(this.messageDisplay.textContent)) this.messageDisplay.textContent = "Try Again " + this.time;
            else this.messageDisplay.textContent = "What's the Color? " + this.time;
        }
        else{
            if(this.time > 0) this.time--;
            this.messageDisplay.textContent = "TIMEOUT";
        }
    }
}
