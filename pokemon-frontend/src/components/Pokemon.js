import { ApolloQuery, html } from '@apollo-elements/lit-apollo'
import { css } from 'lit-element'
import { gql } from '@apollo/client/core'
import './Attack'

export class Pokemon extends ApolloQuery {
    constructor() {
        super()
        this.counter = 1
        this.maxId = 151
        this.minId = 1
        this.variables = {
            pokemon_id: this.formatPokemonId(this.counter),
            //TODO: Why doesn't this work when setting counter attribute in App.js?
        }
    }
    static get styles() {
        //TODO: Media query to re-order images for smaller screens:
        // https://www.webcomponents.org/element/lit-media-query
        return css`
            .pokemon-container {
            }
            .flex-container {
                display: flex;
                padding-bottom: 1em;
            }
            .preview {
                height: 500px;
                width: 500px;
                object-fit: fill;
            }
            .stats {
                max-height: 500px;
                padding: 0.5em;
                white-space: nowrap;
                overflow-x: hidden;
                overflow-y: auto;
                display: block;
                text-align: left;
            }
            .attacks {
                display: flex;
                border: 1px solid #6f7788;
                max-width: 100%;
                justify-content: space-evenly;
            }
        `
    }

    static get properties() {
        return {
            maxId: { attribute: true, type: Number },
            minId: { attribute: true, type: Number },
            counter: { attribute: true, type: Number },
        }
    }
    query = gql`
        query GetPokemon($pokemon_id: String) {
            pokemon(id: $pokemon_id) {
                image
                name
                number
                attacks {
                    fast {
                        name
                        type
                        damage
                    }
                    special {
                        name
                        type
                        damage
                    }
                }
                resistant
                weaknesses
            }
        }
    `

    get _decButton() {
        return this.shadowRoot.querySelector('#dec-button')
    }
    get _incButton() {
        return this.shadowRoot.querySelector('#inc-button')
    }

    formatPokemonId(id) {
        return btoa('Pokemon:' + String(id).padStart(3, '0'))
    }

    render() {
        const name = this.data?.pokemon?.name ?? 'oops!'
        const image = this.data?.pokemon?.image
        const numericId = this.data?.pokemon.number ?? 'error'
        const resistances = this.data?.pokemon?.resistant ?? ['none']
        const weaknesses = this.data?.pokemon?.weaknesses ?? ['none']
        const fastAttacks = this.data?.pokemon?.attacks.fast ?? ['none']
        const specialAttacks = this.data?.pokemon?.attacks.special ?? ['none']

        return html`
            <div class="pokemon-container">
                <div><h3 id="name">${name}</h3></div>
                <div class="flex-container">
                    <div class="stats">
                        <span>Resistances:</span>
                        <ul>
                            ${resistances.map((item) => html`<li>${item}</li>`)}
                        </ul>
                    </div>
                    <img class="preview" src=${image} />
                    <div class="stats">
                        <span>Weaknesses:</span>
                        <ul>
                            ${weaknesses.map((item) => html`<li>${item}</li>`)}
                        </ul>
                    </div>
                </div>
                <div class="attacks">
                <div>
                Fast Attacks
                ${fastAttacks.map(
                    (item) =>
                        html`<pokemon-attack
                            name=${item.name}
                            type=${item.type}
                            damage=${item.damage}
                        ></pokemon-attack>`
                )}
                </div>
                <div>
                Special Attacks
                ${specialAttacks.map(
                    (item) =>
                        html`<pokemon-attack
                            name=${item.name}
                            type=${item.type}
                            damage=${item.damage}
                        >
                        </pokemon-attack>`
                )}
                </div>
                </div>
                    <style>
                        button,
                        p {
                            display: inline-block;
                        }
                    </style>
                    <button
                        id="dec-button"
                        @click="${() => this.decrement()}"
                        aria-label="decrement"
                        disabled="true"
                    >
                        <=
                    </button>
                    <span id="numeric id:"> ${numericId}</span>
                    <button
                        id="inc-button"
                        @click="${() => this.increment()}"
                        aria-label="increment"
                    >
                        =>
                    </button>
                </div>
            </div>
        `
    }
    decrement() {
        if (this._incButton.disabled) {
            this._incButton.disabled = false
        }
        this.counter--
        if (this.counter <= this.minId) {
            this._decButton.disabled = true
        }
        this.variables = { pokemon_id: this.formatPokemonId(this.counter) }
    }

    increment() {
        if (this._decButton.disabled) {
            this._decButton.disabled = false
        }
        this.counter++
        if (this.counter >= this.maxId) {
            this._incButton.disabled = true
        }
        this.variables = { pokemon_id: this.formatPokemonId(this.counter) }
    }
}
customElements.define('poke-mon', Pokemon)
