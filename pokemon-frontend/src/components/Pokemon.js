import { ApolloQuery, html } from '@apollo-elements/lit-apollo'

import { gql } from '@apollo/client/core'

class Pokemon extends ApolloQuery {
    constructor() {
        super()
        this.counter = 1
        this.variables = {
            pokemon_id: this.formatPokemonId(this.counter),
        }
    }
    static get properties() {
        return {
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

    formatPokemonId(id) {
        return btoa('Pokemon:' + String(id).padStart(3, '0'))
    }

    render() {
        const name = this.data?.pokemon?.name ?? 'oops!'
        const image = this.data?.pokemon?.image
        const numericId = this.data?.pokemon.number ?? 'no!'
        return html`
            <apollo-client uri="http://localhost:5000"></apollo-client>
            <div>
                <span id="name"> ${name}</span>
                <img src=${image} />
                <span id="numeric id:"> ${numericId}</span>
                <span id="attacks: "> ${this.data?.pokemon.resistant}</span>
            </div>
            <div>
                <style>
                    button,
                    p {
                        display: inline-block;
                    }
                </style>
                <button
                    @click="${() => this.decrement()}"
                    aria-label="decrement"
                >
                    -
                </button>
                <p>${this.variables.pokemon_id}</p>
                <p>Counter: ${this.counter}</p>
                <button
                    @click="${() => this.increment()}"
                    aria-label="increment"
                >
                    +
                </button>
            </div>
        `
    }
    decrement() {
        this.counter--
        this.variables = { pokemon_id: this.formatPokemonId(this.counter) }
        // this._valueChanged()
    }

    increment() {
        this.counter++
        this.variables = { pokemon_id: this.formatPokemonId(this.counter) }
    }
}
customElements.define('poke-mon', Pokemon)
