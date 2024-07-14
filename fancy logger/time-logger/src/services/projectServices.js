import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { firestore } from "../firebase";

const fetchProjects = (userId, setStateFunction) => {
  // setStateFunction yra parametras reikalaujantis argumento, kuris yra useState,pvz.: const [projectData, setProjectData] = useState([])
  // t.y. i setStateFunction vieta reikia ideti setProjectData is pvz. virsuj, kai savo komponente callini fetchProjects
  const q = query(
    collection(firestore, "projects"),
    where("userId", "==", userId)
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const projectsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStateFunction(projectsData);
  });
  return () => unsubscribe();
};

export default fetchProjects;
