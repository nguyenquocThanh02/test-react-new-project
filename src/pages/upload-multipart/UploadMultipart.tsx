"use client";

import React, { useState } from "react";
import axios from "axios";
import { Progress } from "@/components/ui/progress";

export default function UploadMultipart() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);

      if (file.size < 10000000) {
        const response = await axios.post(
          "https://nmbst2kzbr.ap-south-1.awsapprunner.com/generate-single-presigned-url",
          {
            fileName: file.name,
          }
        );
        const { url } = response.data;

        const uploadResponse = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        console.log("🚀 ~ handleUpload ~ uploadResponse:", uploadResponse);

        if (uploadResponse.status === 200) {
          alert("File uploaded successfully.");
        } else {
          alert("Upload failed.");
        }

        setIsUploading(false);
      } else {
        const response = await axios.post(
          "https://nmbst2kzbr.ap-south-1.awsapprunner.com/start-multipart-upload",
          {
            fileName: file.name,
            contentType: file.type,
          }
        );

        const { uploadId } = response.data;
        console.log("UploadId- ", uploadId);

        const totalSize = file.size;
        const chunkSize = 10000000;
        const numChunks = Math.ceil(totalSize / chunkSize);

        // generate presigned urls
        const presignedUrls_response = await axios.post(
          "https://nmbst2kzbr.ap-south-1.awsapprunner.com/generate-presigned-url",
          {
            fileName: file.name,
            uploadId: uploadId,
            partNumbers: numChunks,
          }
        );

        const presigned_urls = presignedUrls_response?.data?.presignedUrls;

        console.log("Presigned urls- ", presigned_urls);

        const parts = [];
        const uploadPromises = [];

        for (let i = 0; i < numChunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(start + chunkSize, totalSize);
          const chunk = file.slice(start, end);
          const presignedUrl = presigned_urls[i];

          uploadPromises.push(
            axios.put(presignedUrl, chunk, {
              headers: {
                "Content-Type": file.type,
              },
            })
          );
        }

        const uploadResponses = await Promise.all(uploadPromises);

        uploadResponses.forEach((response, i) => {
          // existing response handling

          parts.push({
            etag: response.headers.etag,
            PartNumber: i + 1,
          });
        });

        console.log("Parts- ", parts);

        // make a call to multipart complete api
        const complete_upload = await axios.post(
          "https://nmbst2kzbr.ap-south-1.awsapprunner.com/complete-multipart-upload",
          {
            fileName: file.name,
            uploadId: uploadId,
            parts: parts,
          }
        );

        console.log("Complete upload- ", complete_upload.data);

        // if upload is successful, alert user
        if (complete_upload.status === 200) {
          alert("File uploaded successfully.");
        } else {
          alert("Upload failed.");
        }
        setIsUploading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1 className="flex justify-center items-center">Multipart Upload</h1>
      <br></br>
      <input type="file" onChange={handleFileChange} name="file" id="myFile" />
      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
