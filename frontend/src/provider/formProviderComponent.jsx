import { FormProvider as Form } from "react-hook-form";

const FormProviderComponent = ({ children, onSubmit, methods }) => {
  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{
          margin: "auto",
        }}
      >
        {children}
      </form>
    </Form>
  );
};

export default FormProviderComponent;
