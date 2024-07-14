import { firestore } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const fetchWorkEntries = (userId, setStateFunction) => {
  // setStateFunction yra parametras reikalaujantis argumento, kuris yra useState,pvz.: const [jobsDone, setJobsDone] = useState([])
  // t.y. i setStateFunction vieta reikia ideti setJobsDone is pvz. virsuj, kai savo komponente callini fetchProjects
  const q = query(
    collection(firestore, "workEntries"),
    where("userId", "==", userId)
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const workEntriesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStateFunction(workEntriesData);
  });
  return () => unsubscribe();
};

export const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(firestore, "workEntries", id));
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};


