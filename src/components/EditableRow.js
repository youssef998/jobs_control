import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a message..."
          name="message"
          value={editFormData.message}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <select
          required="required"
          name="status"
          onChange={handleEditFormChange}
          value={editFormData.status}
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Running">Running</option>
          <option value="Finished">Finished</option>
          <option value="Failed">Failed</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a result..."
          name="result"
          value={editFormData.result}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
