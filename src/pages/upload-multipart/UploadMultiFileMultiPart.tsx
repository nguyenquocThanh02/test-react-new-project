import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  file: z
    .array(z.instanceof(File))
    .refine((files) => files.length > 0, {
      message: "Please select at least one file",
    })
    .refine((files) => files.every((file) => file.size < 5000000), {
      message: "Each file must be less than 7MB.",
    }),
  username: z.string(),
});

type partType = {
  etag: string;
  PartNumber: number;
};

const UploadMultipartMultifile = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: [],
      username: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleCancel = () => {
    if (controller) {
      controller.abort();
      setIsUploading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Files submitted:", values);
    console.log("Selected files: ", selectedFiles);
    // const blob = new Blob([selectedFiles[0]], { type: selectedFiles[0].type });
    // console.log("blob: ", blob);

    const newController = new AbortController();
    setController(newController);
    const signal = newController.signal;

    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    let uploadSize = 0;

    setIsUploading(true);

    for (const file of selectedFiles) {
      if (!file) continue;

      try {
        if (file.size < 10000000) {
          const response = await axios.post(
            "https://BE/generate-single-presigned-url",
            { fileName: file.name }
          );
          const { url } = response.data;

          const uploadResponse = await axios.put(url, file, {
            headers: {
              "Content-Type": file.type,
            },
            onUploadProgress: (event) => {
              if (event.total) {
                uploadSize += event.loaded;
                setProgress(Math.round(uploadSize / totalSize) * 100);
              }
            },
            signal,
          });

          console.log("🚀 ~ handleUpload ~ uploadResponse:", uploadResponse);
        } else {
          const response = await axios.post(
            "https://BE/start-multipart-upload",
            {
              fileName: file.name,
              contentType: file.type,
            },
            { signal }
          );

          const { uploadId } = response.data;
          console.log("🚀 ~ onSubmit ~ uploadId:", uploadId);

          const totalSize = file.size;
          const chunkSize = 10000000;
          const numChunks = Math.ceil(totalSize / chunkSize);

          const presignedUrls_response = await axios.post(
            "https://BE/generate-presigned-url",
            {
              fileName: file.name,
              uploadId: uploadId,
              partNumbers: numChunks,
            },
            { signal }
          );

          const presigned_urls = presignedUrls_response?.data?.presignedUrls;
          console.log("🚀 ~ onSubmit ~ presigned_urls:", presigned_urls);

          const parts: partType[] = [];
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
                onUploadProgress: (event) => {
                  if (event.total) {
                    uploadSize += event.loaded;
                    setProgress(Math.round(uploadSize / totalSize) * 100);
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

          console.log("Parts- ", parts);

          const complete_upload = await axios.post(
            "https://BE/complete-multipart-upload",
            {
              fileName: file.name,
              uploadId: uploadId,
              parts: parts,
            }
          );

          console.log("Complete upload- ", complete_upload.data);
        }
      } catch (fileError) {
        console.error("File upload failed", fileError);
        alert("File upload failed.");
      }
    }
  }

  return (
    <div className="l-container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel>Upload Files</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    onChange={(event) => {
                      handleFileChange(event);
                      onChange(
                        event.target.files ? Array.from(event.target.files) : []
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isUploading ? (
            <Button type="button" variant={"secondary"} onClick={handleCancel}>
              Cancel
            </Button>
          ) : (
            <Button type="submit">Upload</Button>
          )}
        </form>
      </Form>

      {isUploading && (
        <Progress value={progress} className="w-40 bg-slate-300 mt-10" />
      )}

      <div className="flex justify-center items-center gap-5 mt-10">
        {selectedFiles.length > 0 &&
          selectedFiles.map((item, index) => (
            <img
              key={index}
              src={URL.createObjectURL(item)}
              className="size-32"
            />
          ))}
      </div>
    </div>
  );
};

export default UploadMultipartMultifile;
