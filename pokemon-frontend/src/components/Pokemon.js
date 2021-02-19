import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo'
import { gql, ApolloClient, InMemoryCache } from '@apollo/client/core'

const client = new ApolloClient({
    uri: 'http://localhost:5000',
    cache: new InMemoryCache(),
})
class Pokemon extends ApolloQuery {
    constructor() {
        super()
        this.id = '1'
        this.variables = {
            id: btoa('Pokemon:' + String(this.id).padStart(3, '0')),
        }
    }
    static get properties() {
        return {
            id: { attribute: true, type: String },
        }
    }
    variables = {
        // id: btoa('Pokemon:' + String(this.id).padStart(3, '0')),
        // id: 'Pokemon00' + this.getAttributeNames(),
    }
    query = gql`
        query GetPokemon($id: String) {
            pokemon(id: $id) {
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

    render() {
        console.log(this.getAttribute('id'))
        const name = this.data?.pokemon?.name ?? 'oops!'
        const image = this.data?.pokemon?.image
        const numericId = this.data?.pokemon.number ?? 'no!'
        console.log(this.data?.pokemon.attacks)
        return html`
            <span id="hello"> ${name}</span>
            <img src=${image} />
            <span id="numeric id:"> ${numericId}</span>
            <span id="attacks: "> ${this.data?.pokemon.resistant}</span>
        `
    }
}
customElements.define('poke-mon', Pokemon)
