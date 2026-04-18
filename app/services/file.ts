
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabasePublishableKey);

export interface FileInterface {
  upload(file: File): Promise<string | null>;
}

class FileService implements FileInterface {
  async upload(file: File): Promise<string | null> {
    try {
      const { data, error } = await supabase.storage
        .from("estudiar-mucho")
        .upload(file.name, file);
      if (error) {
        throw error;
      }
      return data ? data.path : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const fileService = new FileService();
export default fileService;
