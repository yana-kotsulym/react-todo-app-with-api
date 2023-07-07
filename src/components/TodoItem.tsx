/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { KeyboardEvent, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onClose(todoId: number[]): void;
  processedTodos: number[];
  onToggle(todoId: number[], completed: boolean): void;
  onChange(value: string, todoId: number): void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onClose,
  processedTodos,
  onToggle,
  onChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(todo.title);

  const handleFormDisplay = (value: boolean) => {
    setIsEditMode(value);
  };

  const handleFormSubmit = (value: boolean) => {
    onChange(inputValue, todo.id);
    handleFormDisplay(value);
  };

  const handleCancelEditing = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleFormDisplay(false);
    }
  };

  return (
    <div
      className={classNames(
        'todo',
        {
          completed: todo.completed,
        },
      )}
    >
      <label
        htmlFor="toggle"
        className="todo__status-label"
        onClick={() => onToggle([todo.id], !todo.completed)}
      >
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      {isEditMode
        ? (
          <form
            onSubmit={() => handleFormSubmit(false)}
            onBlur={() => handleFormSubmit(false)}
          >
            <input
              type="text"
              className={`todo__title-field todo__title-field-${todo.id}`}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => handleCancelEditing(e)}
            />
          </form>
        )
        : (
          <>
            <span
              className="todo__title"
              onDoubleClick={() => handleFormDisplay(true)}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              onClick={() => onClose([todo.id])}
            >
              ×
            </button>
          </>
        )}

      <div className={classNames('modal', 'overlay', {
        'is-active': todo.id === 0 || processedTodos.includes(todo.id),
      })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
