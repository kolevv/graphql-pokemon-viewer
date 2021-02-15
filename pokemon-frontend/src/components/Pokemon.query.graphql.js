import { gql, TypedDocumentNode } from '@apollo/client/core'

export const HelloQuery: TypedDocumentNode<{ hello: Greeting }, Greeting> = gql`
    query HelloQuery($name: String, $greeting: String) {
        hello(name: $name, greeting: $greeting) {
            name
            greeting
        }
    }
`