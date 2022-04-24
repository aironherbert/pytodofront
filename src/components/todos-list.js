import React, { useState, useEffect, useCallback } from 'react';
import TodoDataService from '../services/todos';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
const TodosList = props => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(loading)

    const retrieveTodos = useCallback(async () => {
        setLoading(true)
        props.token && await TodoDataService.getAll(props.token)
            .then(response => {
                setTodos(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        setLoading(false)
    }, [props.token])


    useEffect(() => {
        retrieveTodos();
    }, [retrieveTodos]);

    const deleteTodo = (todoId) => {
        TodoDataService.deleteTodo(todoId, props.token)
            .then(response => {
                retrieveTodos();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const completeTodo = (todoId) => {
        TodoDataService.completeTodo(todoId, props.token)
            .then(response => {
                retrieveTodos();
            })
            .catch(e => {
                console.log(e);
            })
    }

    if (!props.loading && !props.token) return props.history.push("/login")

    return (
        <Container>
            <div>
                <Link to={"/todos/create"}>
                    <Button variant="outline-info" className="mb-3">
                        Add To-do
                    </Button>
                </Link>
                {loading ? (
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : todos.map((todo) => {
                    return (
                        <Card key={todo.id} className="mb-3">
                            <Card.Body>
                                <div className={`${todo.completed ? "text-decoration-line-through" : ""}`}>
                                    <Card.Title>{todo.title}</Card.Title>
                                    <Card.Text><b>Memo:</b> {todo.memo}</Card.Text>
                                    <Card.Text>Date created: {(new Date(Date.parse(todo.created))).toLocaleString("pt-br")}</Card.Text>
                                </div>
                                {!todo.completed && (
                                    <Link to={{
                                        pathname: "/todos/" + todo.id,
                                        state: {
                                            currentTodo: todo
                                        }
                                    }}>
                                        <Button variant="outline-info" className="me-2">
                                            Edit
                                        </Button>
                                    </Link>
                                )}
                                <Button variant="outline-danger" className="me-2" onClick={() => deleteTodo(todo.id)} >
                                    Delete
                                </Button>
                                <Button variant="outline-success" onClick={() => completeTodo(todo.id)}>
                                    Complete
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </Container >
    );
}
export default TodosList;