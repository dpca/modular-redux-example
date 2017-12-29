import React from 'react';
import TodoList from './modules/todo-list';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Example Redux App</a>
      </nav>
      <div className="container-fluid" style={{ marginTop: 20 }}>
        <div className="row">
          <div className="col">
            Todos 1:
            <TodoList as="todos1" />
          </div>
          <div className="col">
            Todos 2:
            <TodoList as="todos2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
