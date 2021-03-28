import Component from './component.js';
// import Mode from  './mode_button.js';
import Easy from './easy.js';
import Hard from './hard.js';
import Nightmare from './nightmare.js';

import './navbar.css';
/*
 * [Event name: params]
 * none
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.brand = root.querySelector('.brand');
        this.easy = root.querySelector('.easy');
        this.hard = root.querySelector('.hard');
        this.nightmares = root.querySelector('.nightmares');

        const easys = root.querySelectorAll(Easy.getRootClass());
        for (let easy of easys){
            const easy_button = new Easy(easy);
            easy_button.on('click', this.handleModeClick.bind(this));
        }
        
        const hards = root.querySelectorAll(Hard.getRootClass());
        for (let hard of hards){
            const hard_button = new Hard(hard);
            hard_button.on('click', this.handleModeClick.bind(this));
        }

        const nightmares = root.querySelectorAll(Nightmare.getRootClass());
        for (let nightmare of nightmares){
            const nightmare_button = new Nightmare(nightmare);
            nightmare_button.on('click', this.handleModeClick.bind(this));
        }

        this.reset();
    }

    reset() {
        // do nothing
    }

    handleModeClick(firer, mode) {
        this.fire(mode);
    }

    select(mode) {
        // console.log(mode)
        var easyButton = document.querySelector("#Easy");
        var hardButton = document.querySelector("#Hard");
        var nightmareButton = document.querySelector("#Nightmare");
        if (mode === 0) {
            easyButton.classList.add("selected");
            if (hardButton.classList.contains("selected")) hardButton.classList.remove("selected");
            if (nightmareButton.classList.contains("selected")) nightmareButton.classList.remove("selected");
            }
        else if (mode === 1) {
            if (easyButton.classList.contains("selected")) easyButton.classList.remove("selected");
            hardButton.classList.add("selected");
            if (nightmareButton.classList.contains("selected")) nightmareButton.classList.remove("selected");
        }
        else {
            if (easyButton.classList.contains("selected")) easyButton.classList.remove("selected");
            if (hardButton.classList.contains("selected")) hardButton.classList.remove("selected");
            nightmareButton.classList.add("selected");
        }
    }
}
