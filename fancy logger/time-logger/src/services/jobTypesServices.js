import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
const fetchJobTypes = async (setStateFunction) => {
  // setStateFunction yra parametras reikalaujantis argumento, kuris yra useState,pvz.: const [jobTypeData, setJobTypeData] = useState([])
  // t.y. i setStateFunction vieta reikia ideti setJobTypetData is pvz. virsuj, kai savo komponente callini fetchProjects
  try {
    const jobTypesCollection = collection(firestore, "jobTypes");
    const jobTypesSnapshot = await getDocs(jobTypesCollection);
    const jobTypesList = jobTypesSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    setStateFunction(jobTypesList);
  } catch (error) {
    console.error("Error fetching job types:", error);
  }
};

export default fetchJobTypes;
