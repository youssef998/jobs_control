import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
const App = () => {
  const [jobs, setJobs] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newResult, setNewResult] = useState("");
  const useCollectionRef = collection(db, "jobs");
  useEffect(() => {
    const getJobs = async () => {
      const data = await getDocs(useCollectionRef);
      console.log(data);
      setJobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getJobs();
  }, []);
  const createJob = async (e) => {
    e.preventDefault();
    await addDoc(useCollectionRef, {
      message: newMessage,
      status: newStatus,
      result: newResult,
    });
  };
  const [editFormData, setEditFormData] = useState({
    message: "",
    status: "",
    result: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      message: editFormData.message,
      status: editFormData.status,
      result: editFormData.result,
    };

    const newJobs = [...jobs];

    const index = jobs.findIndex((job) => job.id === editContactId);

    newJobs[index] = editedContact;

    setJobs(newJobs);
    const userDoc = doc(db, "jobs", editContactId);
    await updateDoc(userDoc, editedContact);
    setEditContactId(null);
  };

  const handleEditClick = (event, job) => {
    event.preventDefault();
    setEditContactId(job.id);

    const formValues = {
      message: job.message,
      status: job.status,
      result: job.result,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = async (contactId) => {
    const newJobs = [...jobs];
    const index = jobs.findIndex((job) => job.id === contactId);
    newJobs.splice(index, 1);

    setJobs(newJobs);
    const userDoc = doc(db, "jobs", contactId);
    await deleteDoc(userDoc);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>Status</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <Fragment>
                {editContactId === job.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    job={job}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Job</h2>
      <form>
        <input
          type="text"
          name="message"
          required="required"
          placeholder="Enter a message..."
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <select
          required="required"
          name="status"
          onChange={(event) => setNewStatus(event.target.value)}
        >
          <option>choose</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Running">Running</option>
          <option value="Finished">Finished</option>
          <option value="Failed">Failed</option>
        </select>
        <input
          type="text"
          name="result"
          required="required"
          placeholder="Enter a result..."
          onChange={(event) => setNewResult(event.target.value)}
        />
        <button onClick={createJob}>Add</button>
      </form>
    </div>
  );
};

export default App;
