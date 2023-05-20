import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../base";
import { Impression } from "./impressionHandler";

enum CatalogueTags {
  ECOMMERCE = "E-Commerce",
  FORUM = "Forum",
  NEWS = "News",
  FINANCE = "Finance",
  OTHERS = "Others",
}

export interface Catalogue extends Impression {
  tag: CatalogueTags;
  createdByUsername: string;
}

export const getCatalogues = async (): Promise<Catalogue[]> => {
  try {
    let catalogues: Catalogue[] = [];
    const catalogueCollectionRef = collection(db, "catalogue");
    const q = query(catalogueCollectionRef);
    const snap = await getDocs(q);
    snap.forEach((doc) => {
      catalogues.push(doc.data() as Catalogue);
    });
    return catalogues;
  } catch (e) {
    console.error(e);
    throw new Error("There was an error getting Catalogue at this time!");
  }
};
