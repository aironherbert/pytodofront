/* eslint-disable no-unused-vars */
import { Link, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTodo from './components/add-todo';
import TodosList from './components/todos-list';
import Login from './components/login';
import Signup from './components/signup';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar'
import { useState } from 'react';
import TodoDataService from './services/todos';

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  async function login(user = null) {
    TodoDataService.login(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        setError('');
      })
      .catch(e => {
        console.log('login', e);
        setError(e.toString());
      });
  }

  async function logout() {
    setToken('');
    setUser('');
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }

  async function signup(user = null) {
    TodoDataService.signup(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      })
      .catch(e => {
        console.log(e);
        setError(e.toString());
      })
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to={"/todos"}>Todos</Link>
              {user ? (
                <Link className="nav-link" onClick={logout}>Logout ({user})</Link>
              ) : (
                <>
                  <Link className="nav-link" to={"/login"}>Login</Link>
                  <Link className="nav-link" to={"/signup"}>Sign Up</Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>
      <Switch>
        <Route exact path={["/", "/todos"]}>
          <TodosList token={token} />
        </Route>
        <Route path="/todos/create">
          <AddTodo token={token} />
        </Route>
        <Route path="/todos/:id/" render={(props) => <AddTodo {...props} token={token} />} />
        <Route path="/login" >
          <Login login={login} />
        </Route>
        <Route path="/signup">
          <Signup signup={signup} />
        </Route>
      </Switch>
      <footer className="text-center text-lg-start
bg-light text-muted mt-4">
        <div className="text-center p-4">
          © Copyright - <a
            target="_blank"
            rel="noreferrer"
            className="text-reset fw-bold text-decoration-none"
            href="https://www.linkedin.com/in/airon-herbert/"
          >
            Airon Herbert
          </a>
        </div>
      </footer>
    </div>
  );
}
export default App;