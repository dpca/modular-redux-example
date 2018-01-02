# Modular Redux Example App

https://dancahoon.com/modular-redux-example/

This repo is an example of one way to structure large single page apps built
with React and Redux. The app itself is a simple todo list app, with two list
instances to demonstrate how to create modular, reusable components.

## Mounting Components

Modular components built in this fashion are usable in the following manner:

```JavaScript
import TodoList from './modules/todo-list';

function Component() {
  return (
    <div>
      <TodoList as="todos1" />
      <TodoList as="todos2" />
    </div>
  );
}
```

The `as` prop is used as a unique key indicating where each `TodoList` should
keep its state in the Redux store.

## Folder Structure

```
src
├── index.js
├── index.css
├── ducks
│   └── todos.js
└── modules
    └── todo-list
        ├── index.js
        └── components
            ├── AddTodo.js
            ├── List.js
            └── Todo.js
```

`src/index.js` exports the whole app to be mounted at a root node. Redux root
reducer and store setup can happen here, or be extracted into separate files.
Redux parts are separated in `src/ducks` bundles following the
[ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) pattern,
rather than adding separate files for actions, action types, and reducers.
Components are split into modules in `src/modules`, which can be thought of as
widgets (basically things you'd want to reuse throughout the app). This ends up
scaling more easily than grouping components by type.

## Redux Structure

To allow multiple instances of the same component to be tied to different parts
of the state, store the state for each under an object with unique keys.  This
can be achieved by creating an "individual reducer" that acts on individual
instances of the state, and call it with the pertinent part of the state in
the main reducer. In the following example, the unique key is contained under
`action.key`.

```JavaScript
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
    default:
      return state;
  }
}

function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        [action.key]: individualReducer(state[action.key], action),
      };
    default:
      return state;
  }
}
```

To connect a component instance to its part of the store without coupling it to
the state shape, a selector like the following can be used:

```JavaScript
// src/ducks/todos.js
export const getTodos = (state, props) => state[props.key] || [];

// src/modules/todo-list/index.js
const mapStateToProps = (state, props) => ({ todos: getTodos(state, props) });
```

## Component Module Structure

Export default the connected component from an `index.js` file in the module.
Optionally export the unconnected component if needed for testing. It's best to
break up the module/widget into multiple smaller components, which can be added
to a nested `components` folder within the module.

## Acknowledgements

This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).
