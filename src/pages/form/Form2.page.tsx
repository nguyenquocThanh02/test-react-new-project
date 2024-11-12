import Form2Component from "./Form2.component";

const Form2Page = () => {
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
        <Form2Component data={data} />
      </div>
    </div>
  );
};

export default Form2Page;
