import { progressStore } from "@/store/progress.store";
import axios from "axios";

export const uploadFile = async (file: File, signal: AbortSignal) => {
  const { setProgress, uploadSize, totalSize, setUploadSize } = progressStore();

  try {
    const response = await axios.post(
      "https://BE/generate-single-presigned-url",
      { fileName: file.name, fileType: file.type },
      { signal }
    );
    const { url } = response.data;

    const uploadResponse = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (event) => {
        if (event.total) {
          const newSize = uploadSize + event.loaded;
          setUploadSize(newSize);
          setProgress(Math.round(newSize / totalSize) * 100);
        }
      },
      signal,
    });

    console.log(uploadResponse);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Upload canceled");
    } else {
      console.error("Error uploading file", error);
    }
    throw error;
  }
};
