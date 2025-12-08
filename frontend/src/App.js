import logo from './logo.svg';
import './App.css';

function Register() {
  <img className="register" />
  return (
    <button> Register </button>
  );
}

//login component
function Login() {
  return (
    <button> Login </button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Login />
          <Register />
          <h1> Skill Forge </h1>
          <h2> Hi Welcome..!! </h2>
          <h2> Lets START Learning </h2>

          <button> Get Started ➡️ </button>

        </div>
      </header>
    </div>
  );
}

export default App;
