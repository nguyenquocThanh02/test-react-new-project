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

// Định nghĩa schema kiểm tra file size bằng Zod
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

const UploadImgPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: [],
      username: "",
    },
  });

  // Hàm xử lý sự kiện khi người dùng chọn file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      // Gộp các file cũ với các file mới (chứ không thay thế)
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  //   Hàm xử lý presign cho từng file
  const getPresignedUrl = async (fileName: string, fileType: string) => {
    try {
      //   const response = await axios.get(
      //     "http://localhost:3000/generate-presigned-url",
      //     {
      //       params: {
      //         filename: fileName,
      //         contentType: fileType,
      //       },
      //     }
      //   );
      //   return response.data.url;
    } catch (error) {
      console.error("Error fetching pre-signed URL", error);
      throw new Error("Failed to get presigned URL");
    }
  };

  //   const handleUpload = async () => {
  //     try {
  //       const presignedUrls = await Promise.all(
  //         selectedFiles.map((file) => getPresignedUrl(file.name, file.type)) //for
  //       );
  //       const uploadPromises = selectedFiles.map((file, index) => {
  //         return axios.put(presignedUrls[index], file, {
  //           headers: {
  //             "Content-Type": file.type,
  //           },
  //         });
  //       });
  //       await Promise.all(uploadPromises);
  //       console.log("All files uploaded successfully!");
  //     } catch (error) {
  //       console.error("Error uploading files:", error);
  //     }
  //     return true;
  //   };

  // Hàm submit form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Files submitted:", values);
    console.log("Selected files: ", selectedFiles[0]);
    const blob = new Blob([selectedFiles[0]], { type: selectedFiles[0].type });
    console.log("blob: ", blob);

    // const result = await handleUpload();

    // if (result) {
    //   // success
    // } else {
    //   // loi
    // }

    // sau khi lấy được mảng các selectedFiles thì tiến hành promiseAll để nhận arraykey
  }

  return (
    <div className="l-container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      // Cập nhật giá trị vào react-hook-form
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

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {/* Hiển thị các file đã chọn */}
      {selectedFiles.length > 0 &&
        selectedFiles.map((item, index) => (
          <img
            key={index}
            src={URL.createObjectURL(item)}
            className="size-20"
          />
        ))}

      <div className="full-w-custom bg-slate-400 h-5">vuowtj</div>
    </div>
  );
};

export default UploadImgPage;
