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
import { Progress } from "@/components/ui/progress";
import { progressStore } from "@/store/progress.store";
import { uploadFile } from "@/hooks";
import { uploadMultipart } from "@/hooks/uploadMultipartFC.hook";

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

const UploadMultipartMultifile = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const { progress, setTotalSize } = progressStore();
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

    const newTotalSize = selectedFiles.reduce(
      (acc, file) => acc + file.size,
      0
    );
    setTotalSize(newTotalSize);
    setIsUploading(true);

    for (const file of selectedFiles) {
      if (!file) continue;

      try {
        if (file.size < 10000000) {
          await uploadFile(file, signal);
        } else {
          await uploadMultipart(file, signal);
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
