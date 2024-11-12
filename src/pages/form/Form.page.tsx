import FormComponent from "./Form.component";

const FormPage = () => {
  const data = {
    firstName: "thanh",
    lastName: "nguyen",
    email: "thanh@gmail.com",
    phone: "+84779118898",
  };
  return (
    <div className="flex">
      <div className="flex-1">Avatar</div>
      <div className="flex-2">
        <FormComponent data={data} />
      </div>
    </div>
  );
};

export default FormPage;
