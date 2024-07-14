import React, { useState, useEffect } from "react";
import { firestore } from "../../../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import fetchProjects from "../../../services/projectServices";
import fetchJobTypes from "../../../services/jobTypesServices";

const AddJobForm = (props) => {
  const {
    setFormVisible,
    formData,
    setFormData,
    isEditing,
    setIsEditing,
    editDocId,
    setEditDocId,
  } = props;
  const [projects, setProjects] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProjects(currentUser.uid, setProjects);
        fetchJobTypes(setJobTypes);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (isEditing) {
        // Update the existing entry in Firestore
        const docRef = doc(firestore, "workEntries", editDocId);
        await updateDoc(docRef, formData);
        setIsEditing(false);
        setEditDocId(null);
      } else {
        // Add a new entry to Firestore
        await addDoc(collection(firestore, "workEntries"), {
          ...formData,
          userId: user.uid,
        });
      }
      setFormData({
        workType: "",
        project: "",
        description: "",
        startTime: "",
        endTime: "",
      });
      setFormVisible(false);
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Darbo tipas:</label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            required
          >
            <option value="">Pasirinkite darbo tipą</option>
            {jobTypes.map((jobType) => (
              <option key={jobType.id} value={jobType.id}>
                {jobType.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Projektas:</label>
          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
          >
            <option value="">Pasirinkite projektą</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.pavadinimas}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Aprašymas:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pradžios laikas:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pabaigos laikas:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? "Išsaugoti" : "Pridėti"}</button>
      </form>
    </div>
  );
};

export default AddJobForm;
