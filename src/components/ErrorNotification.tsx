import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../utils/enums';

type Props = {
  error: ErrorType | null,
  onError(type: ErrorType | null): void,
};

export const ErrorNotification: React.FC<Props> = ({ error, onError }) => {
  useEffect(() => {
    setTimeout(() => onError(null), 3000);
  }, [error]);

  function getErrorMessage(er: ErrorType | null) {
    switch (er) {
      case ErrorType.Get:
        return 'Unable to load a todo';

      case ErrorType.Post:
        return 'Unable to add a todo';

      case ErrorType.Delete:
        return 'Unable to delete a todo';

      case ErrorType.Patch:
        return 'Unable to update a todo';

      case ErrorType.isEmpty:
        return 'Title can\'t be empty';

      default:
        return '';
    }
  }

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden: !error,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => onError(null)}
      >
        .
      </button>
      {getErrorMessage(error)}
    </div>
  );
};
