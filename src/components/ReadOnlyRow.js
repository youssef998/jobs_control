import React from "react";

const ReadOnlyRow = ({ job, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{job.message}</td>
      <td>{job.status}</td>
      <td>{job.result}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, job)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(job.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
