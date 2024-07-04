import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  age: z.number({ invalid_type_error: "Age is required" }).min(3),
});
type FormData = z.infer<typeof schema>;
function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log("onSubmit");
    console.log(data);
  };

  return (
    <>
      <h1>User Information</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          <label htmlFor="age">Age</label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            id="age"
            className="form-control"
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default UserForm;
