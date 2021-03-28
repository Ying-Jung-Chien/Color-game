import Component from './component.js';

import './mode_button.css';

export default class Easy extends Component {
    static getRootClass() {
        return '.easy';
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
        
        this.reset();
    }

    reset() {
        // do nothing
    }

    handleDomClick(e) {
        this.fire('click', 'easy');
    }

    select() {
        this.root.classList.add("selected")
    }
}

