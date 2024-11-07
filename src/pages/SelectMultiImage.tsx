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
import { useMutationHooks } from "@/hooks/useMutation.hook";

const formSchema = z.object({
  file: z
    .array(z.instanceof(File))
    .refine((files) => files.length > 0, {
      message: "Please select at least one file",
    })
    .refine((files) => files.every((file) => file.size < 7000000), {
      message: "Each file must be less than 7MB.",
    }),
});

const UploadImgPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: [],
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

 
  // Hàm submit form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Files submitted:", values);
    console.log("Selected files: ", selectedFiles);
    const result = await handleUpload();

    if (result) {
      // success
    } else{
        // loi
    }

    // sau khi lấy được mảng các selectedFiles thì tiến hành promiseAll để nhận arraykey
  }

  const mutation = useMutationHooks( );

  return (
    <div>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      
    </div>
  );
};

export default UploadImgPage;
