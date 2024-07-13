import React, { useState, useEffect } from 'react';
import { firestore } from '../../../firebase';
import { collection, getDocs, addDoc, onSnapshot, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const JobDone = () => {
  const [workEntries, setWorkEntries] = useState([]);
  const [formData, setFormData] = useState({
    workType: '',
    project: '',
    description: '',
    startTime: '',
    endTime: ''
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDocId, setEditDocId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProjects(currentUser.uid);
        fetchJobTypes();
        fetchWorkEntries(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProjects = (userId) => {
    const q = query(collection(firestore, 'projects'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    });
    return () => unsubscribe();
  };

  const fetchJobTypes = async () => {
    try {
      const jobTypesCollection = collection(firestore, 'jobTypes');
      const jobTypesSnapshot = await getDocs(jobTypesCollection);
      const jobTypesList = jobTypesSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setJobTypes(jobTypesList);
    } catch (error) {
      console.error('Error fetching job types:', error);
    }
  };

  const fetchWorkEntries = (userId) => {
    const q = query(collection(firestore, 'workEntries'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const workEntriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkEntries(workEntriesData);
    });
    return () => unsubscribe();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (isEditing) {
        // Update the existing entry in Firestore
        const docRef = doc(firestore, 'workEntries', editDocId);
        await updateDoc(docRef, formData);
        setIsEditing(false);
        setEditDocId(null);
      } else {
        // Add a new entry to Firestore
        await addDoc(collection(firestore, 'workEntries'), {
          ...formData,
          userId: user.uid
        });
      }
      setFormData({
        workType: '',
        project: '',
        description: '',
        startTime: '',
        endTime: ''
      });
      setFormVisible(false);
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setIsEditing(true);
    setEditDocId(entry.id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'workEntries', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
    setIsEditing(false);
    setFormData({
      workType: '',
      project: '',
      description: '',
      startTime: '',
      endTime: ''
    });
  };

  return (
    <div>
      <h1>Atliktas darbas</h1>
      <button onClick={toggleFormVisibility}>
        {isFormVisible ? 'Atšaukti' : 'Pridėti naują darbą'}
      </button>

      {isFormVisible && (
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
                <option key={jobType.id} value={jobType.name}>{jobType.name}</option>
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
          <button type="submit">{isEditing ? 'Išsaugoti' : 'Pridėti'}</button>
        </form>
      )}

      <h2>Įvesti darbai</h2>
      <ul>
        {workEntries.map((entry, index) => (
          <li key={index}>
            <p><strong>Darbo tipas:</strong> {entry.workType}</p>
            <p><strong>Projektas:</strong> {projects.find(p => p.id === entry.project)?.pavadinimas}</p>
            <p><strong>Aprašymas:</strong> {entry.description}</p>
            <p><strong>Pradžios laikas:</strong> {entry.startTime}</p>
            <p><strong>Pabaigos laikas:</strong> {entry.endTime}</p>
            <button onClick={() => handleEdit(entry)}>Redaguoti</button>
            <button onClick={() => handleDelete(entry.id)}>Ištrinti</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobDone;
