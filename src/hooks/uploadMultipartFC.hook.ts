import axios from "axios";
import { progressStore } from "@/store/progress.store";

type PartType = {
  etag: string;
  PartNumber: number;
};

export const uploadMultipart = async (file: File, signal: AbortSignal) => {
  const { setProgress, uploadSize, totalSize, setUploadSize } = progressStore();

  try {
    const response = await axios.post(
      "https://BE/start-multipart-upload",
      {
        fileName: file.name,
        contentType: file.type,
      },
      { signal }
    );

    const { uploadId, key } = response.data;
    console.log("🚀 ~ uploadId:", uploadId);

    const totalFileSize = file.size;
    const chunkSize = 10000000;
    const numChunks = Math.ceil(totalFileSize / chunkSize);

    const parts: PartType[] = [];
    const uploadPromises = [];

    for (let i = 0; i < numChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, totalFileSize);
      const chunk = file.slice(start, end);

      const presignedUrlResponse: { url: string } = await axios.post(
        "https://BE/generate-presigned-url",
        {
          key: key,
          uploadId: uploadId,
          partNumbers: i + 1,
        },
        { signal }
      );

      uploadPromises.push(
        axios.put(presignedUrlResponse?.url, chunk, {
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
        })
      );
    }

    const uploadResponses = await Promise.all(uploadPromises);

    uploadResponses.forEach((response, i) => {
      parts.push({
        etag: response.headers.etag,
        PartNumber: i + 1,
      });
    });

    console.log("Parts: ", parts);

    const completeUploadResponse = await axios.post(
      "https://BE/complete-multipart-upload",
      {
        key: key,
        uploadId: uploadId,
        parts: parts,
      }
    );

    console.log("Complete upload: ", completeUploadResponse.data);
  } catch (error) {
    console.error("Error during multipart upload:", error);
    throw error;
  }
};
