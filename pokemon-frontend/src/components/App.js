import '../styles/App.css'
import './Pokemon'
import '@apollo-elements/components/apollo-client'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <apollo-client uri="http://localhost:5000">
                    <poke-mon></poke-mon>
                </apollo-client>
            </header>
        </div>
    )
}

export default App
