import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Alert({ show, msg, type, onClose }) {
  if (!show) return null;

  return (
    <div className={`alert alert-${type}`}>
      <FontAwesomeIcon icon={type === 'danger' ? faCircleExclamation : faCircleCheck} />
      {msg}
      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
}

export default Alert;
