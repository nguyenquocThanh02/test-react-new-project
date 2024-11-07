import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Hàm lấy pre-signed URL
const getPresignedUrl = async (fileName: string, fileType: string) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/generate-presigned-url",
      {
        params: {
          filename: fileName,
          contentType: fileType,
        },
      }
    );
    return response.data.url;
  } catch (error) {
    console.error("Error fetching pre-signed URL", error);
    throw new Error("Failed to get presigned URL");
  }
};

const UploadImgPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [cancelTokenSource, setCancelTokenSource] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    }
  };

  // Cập nhật tiến độ tải lên
  const updateProgress = (progressEvent: any, index: number) => {
    if (progressEvent.total) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      const updatedProgress = [...progress];
      updatedProgress[index] = percentCompleted;
      setProgress(updatedProgress);
    }
  };

  const handleCancel = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Upload canceled by user");
    }
  };

  const handleUpload = async () => {
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    try {
      // Bước 1: Lấy mảng các pre-signed URL cho tất cả các file
      const presignedUrls = await Promise.all(
        selectedFiles.map((file) => getPresignedUrl(file.name, file.type))
      );

      // Bước 2: Upload từng file lên S3 thông qua pre-signed URLs
      const uploadPromises = selectedFiles.map((file, index) => {
        return axios.put(presignedUrls[index], file, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: (progressEvent) =>
            updateProgress(progressEvent, index),
          cancelToken: source.token, // Thêm cancelToken vào mỗi yêu cầu
        });
      });

      // Bước 3: Chờ tất cả các file được upload
      await Promise.all(uploadPromises);
      console.log("All files uploaded successfully!");
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Upload canceled", error.message);
      } else {
        console.error("Error uploading files:", error);
      }
    } finally {
      setCancelTokenSource(null);
    }
  };

  return (
    <div>
      <Input type="file" multiple onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload Files</Button>
      <Button onClick={handleCancel}>Cancel Upload</Button>

      <div className="progress-bar">
        {progress.map((percent, index) => (
          <div key={index}>
            <span>{selectedFiles[index]?.name}</span>
            <div
              style={{
                width: "100%",
                backgroundColor: "#f3f3f3",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "10px",
                  backgroundColor: "#4caf50",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div>{percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImgPage;
