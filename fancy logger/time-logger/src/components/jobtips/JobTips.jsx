import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Footer from './../footer/Footer';

const JobTips = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [newJobType, setNewJobType] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  useEffect(() => {
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

    fetchJobTypes();
  }, []);

  const handleAddJobType = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'jobTypes'), {
        name: newJobType
      });
      setJobTypes([...jobTypes, { id: docRef.id, name: newJobType }]);
      setNewJobType('');
    } catch (error) {
      console.error('Error adding job type:', error);
    }
  };

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };

  return (
    <div>
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Darbo tipai</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={newJobType}
            onChange={(e) => setNewJobType(e.target.value)}
            placeholder="Naujas darbo tipas"
            style={{ padding: '10px', flex: 1 }}
          />
          <button onClick={handleAddJobType} style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}>
            Pridėti
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <label htmlFor="jobTypeSelect" style={{ fontWeight: 'bold' }}>
            Pasirinkite darbo tipą:
          </label>
          <select
            id="jobTypeSelect"
            value={selectedJobType}
            onChange={handleJobTypeChange}
            style={{ padding: '10px', width: '100%' }}
          >
            <option value="">Pasirinkite</option>
            {jobTypes.map((jobType) => (
              <option key={jobType.id} value={jobType.name}>{jobType.name}</option>
            ))}
          </select>
        </div>
        
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default JobTips;
