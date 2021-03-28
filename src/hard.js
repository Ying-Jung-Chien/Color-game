import Component from './component.js';

import './mode_button.css';

export default class Hard extends Component {
    static getRootClass() {
        return '.hard';
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
        this.fire('click', 'hard');
    }
}

