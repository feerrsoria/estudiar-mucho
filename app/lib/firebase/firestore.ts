import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  DocumentData,
  QueryConstraint
} from "firebase/firestore";
import { db } from "./config";

export const createDocument = async (colName: string, data: any) => {
  const colRef = collection(db, colName);
  return await addDoc(colRef, data);
};

export const fetchDocuments = async (colName: string, constraints: QueryConstraint[] = []) => {
  const colRef = collection(db, colName);
  const q = query(colRef, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as (DocumentData & { id: string })[];
};

export const fetchDocumentById = async (colName: string, docId: string) => {
  const docRef = doc(db, colName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateDocument = async (colName: string, docId: string, data: any) => {
  const docRef = doc(db, colName, docId);
  return await updateDoc(docRef, data);
};

export const removeDocument = async (colName: string, docId: string) => {
  const docRef = doc(db, colName, docId);
  return await deleteDoc(docRef);
};
