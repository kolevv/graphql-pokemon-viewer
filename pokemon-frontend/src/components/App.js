import logo from './../logo.svg'
import '../styles/App.css'
import './Pokemon'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <poke-mon></poke-mon>
            </header>
        </div>
    )
}

export default App
