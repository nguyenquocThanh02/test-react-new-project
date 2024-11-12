import { useCreateForm } from "@/hooks/useCreateForm.hook";
import FormComponent from "./Form.component";
import { emailValidator, requiredString } from "@/rules";
import { z } from "zod";

export const formSchema = z.object({
  firstName: requiredString("First name is required"),
  lastName: requiredString("Last name is required"),
  email: emailValidator(),
  phone: requiredString("Phone is required"),
});

export type typeFormValue = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
const FormPage = () => {
  const data = {
    firstName: "thanh",
    lastName: "nguyen",
    email: "thanh@gmail.com",
    phone: "+84779118898",
  };

  const form = useCreateForm(formSchema, {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  return (
    <div className="flex">
      <div className="flex-1">Avatar</div>
      <div className="flex-2">
        <FormComponent data={data} form={form} />
      </div>
    </div>
  );
};

export default FormPage;
