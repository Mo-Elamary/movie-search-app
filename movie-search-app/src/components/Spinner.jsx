import React from 'react';

export default function Spinner() {
  return (
    <div className="spinner" role="status" aria-label="loading">
      <div className="dot one" />
      <div className="dot two" />
      <div className="dot three" />
    </div>
  );
}
