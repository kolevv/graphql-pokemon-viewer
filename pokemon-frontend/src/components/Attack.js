import { LitElement, html, css } from 'lit-element'
export class Attack extends LitElement {
    constructor() {
        super()
        this.name = 'Power Whip'
        this.type = 'Grass'
        this.damage = '70'
        this.atkBackground = '#285467'
    }

    static get properties() {
        return {
            name: { type: String },
            type: { type: String },
            damage: { type: Number },
            atkBackground: { type: String },
        }
    }

    //TODO: Set container background based on attack type
    set atkBackground(value) {
        this.style.setProperty('--atkBackground', value)
    }

    get atkBackground() {
        return this.style.getPropertyValue('--atkBackground')
    }

    static get styles() {
        return css`
            .attack-container {
                border-radius: 1em;
                min-width: 0.25em;
                min-height: 0.5em;
                background: var(--atkBackground);
                margin: 0.5em;
                font-size: medium;
                padding: 0.5em;
            }
            .damage {
                color: black;
                padding-left: 0.25em;
            }
            .name-dmg {
                display: flex;
                justify-content: space-around;
            }
        `
    }

    render() {
        return html`
            <div class="attack-container">
                <div class="name-dmg">
                    <b>${this.name}</b>
                    <span class="damage">${this.damage}</span>
                </div>
                <div class="type">${this.type}</div>
            </div>
        `
    }
}

customElements.define('pokemon-attack', Attack)
