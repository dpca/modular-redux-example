import React from 'react';
import { connect } from 'react-redux';
import { getTodos, addTodo, toggleTodo } from '../../ducks/todos';
import AddTodo from './components/AddTodo';
import List from './components/List';

const mapStateToProps = (state, props) => ({ todos: getTodos(state, props) });
const mapDispatchToProps = { addTodo, toggleTodo };
const enhance = connect(mapStateToProps, mapDispatchToProps);

function TodoList({ as, todos, addTodo, toggleTodo }) {
  return (
    <div>
      <AddTodo as={as} addTodo={addTodo} />
      <List as={as} todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default enhance(TodoList);
