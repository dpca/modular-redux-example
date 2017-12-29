import React from 'react';
import Todo from './Todo';

function List({ as, todos, toggleTodo }) {
  return (
    <ul>
      {
        todos.map((todo) => (
          <Todo key={todo.id} {...todo} onClick={() => toggleTodo(as, todo.id)} />
        ))
      }
    </ul>
  );
}

export default List;
