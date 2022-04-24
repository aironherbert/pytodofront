/* eslint-disable no-unused-vars */
import { Link, Redirect, Route, Switch } from 'react-router-dom';
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
import { capitalizeInitials } from './utils/format-string';

function App() {

  const [user, setUser] = useState(localStorage.getItem('user'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(user = null) {
    setLoading(true)
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
    setLoading(false)
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
          <Navbar.Brand>Todo APP</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to={"/todos"}>Todos</Link>
              {token ? (
                <Link className="nav-link" onClick={logout} to={""}>Logout ({capitalizeInitials(user)})</Link>
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
      <div style={{ minHeight: "72vh", padding: "10px" }}>
        <Switch>
          <Route exact path={["/", "/todos"]} render={(props) => <TodosList {...props} loading={loading} token={token} />} />
          <Route path="/todos/create" render={(props) => <AddTodo {...props} token={token} />} />
          <Route path="/todos/:id/" render={(props) => <AddTodo {...props} token={token} />} />
          <Route path="/login" render={(props) => <Login {...props} token={token} login={login} />} />
          <Route path="/signup" render={(props) => <Signup {...props} signup={signup} />} />
          <Route render={() => <Redirect from="*" to="/" />} />
        </Switch>
      </div>
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