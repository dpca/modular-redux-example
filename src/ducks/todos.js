import uuid from 'uuid/v4';

// Actions

const ADD_TODO = 'redux-example-app/todos/ADD_TODO';
const TOGGLE_TODO = 'redux-example-app/todos/TOGGLE_TODO';

// Reducer

function individualReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo) => (
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      ));
    default:
      return state;
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_TODO:
    case TOGGLE_TODO:
      return {
        ...state,
        [action.as]: individualReducer(state[action.as], action),
      };
    default:
      return state;
  }
}

// Action Creators

export function addTodo(as, text) {
  return {
    type: ADD_TODO,
    id: uuid(),
    as,
    text,
  };
}

export function toggleTodo(as, id) {
  return {
    type: TOGGLE_TODO,
    as,
    id,
  };
}

// Selectors

export const getTodos = (state, { as }) => state[as] || [];
