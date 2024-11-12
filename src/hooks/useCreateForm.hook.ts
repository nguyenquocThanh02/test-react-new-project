import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

export const useCreateForm = (rule: any, defaultValues: any) => {
  const form = useForm<z.infer<typeof rule>>({
    resolver: zodResolver(rule),
    defaultValues: defaultValues,
  });

  return form;
};
