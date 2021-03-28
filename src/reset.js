import Component from './component.js';

import './reset.css';

/*
 * [Event name: params]
 * click: this
 */
export default class Reset extends Component {
    static getRootClass() {
        return '.reset';
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
        this.resetDisplay = root.querySelector(".reset span");
        this.reset();
    }

    reset(mode) {
        if (mode == 2) this.root.style.visibility = "hidden";
        else this.root.style.visibility = "visible";
        this.resetDisplay.textContent = "New Color";
    }

    showPlayAgain() {
        this.root.style.visibility = "visible";
        this.resetDisplay.textContent = "Play Again";
    }

    handleDomClick(e) {
        this.fire('click');
    }
}
