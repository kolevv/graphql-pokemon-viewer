import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo'
import { gql, ApolloClient, InMemoryCache } from '@apollo/client/core'
// import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:5000',
    cache: new InMemoryCache(),
})
class PokemonQueryElement extends ApolloQuery {
    // query = gql`
    //     query GetPokemon {
    //         pokemon(name: "Bulbasaur") {
    //             id
    //             name
    //         }
    //     }
    // `

    variables = {
        id: 'Howdy',
        name: 'Partner',
    }

    render() {
        client
            .query({
                query: gql`
                    query GetPokemon {
                        pokemon(name: "Bulbasaur") {
                            id
                            image
                        }
                    }
                `,
            })
            .then((result) => console.log(result))
        const greeting = this.data?.hello?.greeting ?? 'hello'
        const name = this.data?.hello?.name ?? 'world'
        return html` <span id="hello"> ${greeting}, ${name}! </span> `
    }
}
customElements.define('poke-mon', PokemonQueryElement)
