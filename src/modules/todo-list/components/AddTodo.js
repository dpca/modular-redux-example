import React from 'react';
import { withState } from 'recompose';

const enhance = withState('inputText', 'setInputText', '');

function AddTodo({ as, addTodo, inputText, setInputText }) {
  const onSubmit = (event) => {
    event.preventDefault();
    if (inputText === '') {
      return;
    }
    addTodo(as, inputText);
    setInputText('');
  };

  return (
    <div>
      <form
        className="form-inline mb-sm-2"
        onSubmit={onSubmit}
      >
        <div className="form-group mr-sm-2">
          <input value={inputText} onChange={(event) => setInputText(event.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default enhance(AddTodo);
