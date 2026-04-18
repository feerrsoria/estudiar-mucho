import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase/config";

export interface FileInterface {
  upload(file: File): Promise<string | null>;
}

class FileService implements FileInterface {
  async upload(file: File): Promise<string | null> {
    try {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  }
}

const fileService = new FileService();
export default fileService;
