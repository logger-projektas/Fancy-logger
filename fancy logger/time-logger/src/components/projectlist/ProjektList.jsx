import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firestore } from '../../firebase';
import './ProjektList.scss';
import Footer from '../footer/Footer';

const ProjectList = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    pavadinimas: '',
    aprasymas: '',
    vadovas: '',
    valandos: '',
  });
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editDocId, setEditDocId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProjects(currentUser.uid);
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

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setIsEditing(false);
      setFormData({
        pavadinimas: '',
        aprasymas: '',
        vadovas: '',
        valandos: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be signed in to add a project.');
      return;
    }
    try {
      if (isEditing) {
        const docRef = doc(firestore, 'projects', editDocId);
        await updateDoc(docRef, formData);
        setIsEditing(false);
        setEditDocId(null);
      } else {
        await addDoc(collection(firestore, 'projects'), {
          ...formData,
          userId: user.uid
        });
      }
      setFormData({
        pavadinimas: '',
        aprasymas: '',
        vadovas: '',
        valandos: '',
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      pavadinimas: project.pavadinimas,
      aprasymas: project.aprasymas,
      vadovas: project.vadovas,
      valandos: project.valandos
    });
    setIsFormVisible(true);
    setIsEditing(true);
    setEditDocId(project.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'projects', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <div>
      <button onClick={toggleFormVisibility}>
        {isFormVisible ? 'Paslėpti' : 'Pridėti projektą'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Projekto pavadinimas</label>
            <input type="text" id="pavadinimas" name="pavadinimas" value={formData.pavadinimas} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Aprašymas</label>
            <textarea id="aprasymas" name="aprasymas" value={formData.aprasymas} onChange={handleInputChange} required></textarea>
          </div>
          <div>
            <label>Projekto vadovas</label>
            <input type="text" id="vadovas" name="vadovas" value={formData.vadovas} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Valandų skaičius</label>
            <input type="number" id="valandos" name="valandos" value={formData.valandos} onChange={handleInputChange} required />
          </div>
          <button type="submit">{isEditing ? 'Atnaujinti' : 'Pridėti'}</button>
        </form>
      )}
      <div className="project-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.pavadinimas}</h3>
            <p>{project.aprasymas}</p>
            <p><strong>Vadovas:</strong> {project.vadovas}</p>
            <p><strong>Valandos:</strong> {project.valandos}</p>
            <button onClick={() => handleEdit(project)}>Redaguoti</button>
            <button onClick={() => handleDelete(project.id)}>Ištrinti</button>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default ProjectList;