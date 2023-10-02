import { query,collection, getDocs} from "firebase/firestore";
import { database } from "./firebaseConfig";
import { TProducts } from "../../types/data.types";

export const getProductsInfo = async (): Promise<TProducts> => {
    const collectionRef = collection(database, "categories");

    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const productsData = querySnapshot.docs.reduce((acc: any, docInfo) => {
      const { title, categories } = docInfo.data();
      acc[title.toLowerCase()] = categories;
      return acc
    }, {})
    return productsData;
  };