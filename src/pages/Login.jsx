import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../redux/actions/clientActions";


const Login = () => {
   
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
   // if(data.remember === true) {}
    dispatch(
      loginUser(
        data,
        {
          ...history,
          location: { state: location.state },
        }
      )
    );
  };


  

  return (
    <div className="max-w-md mx-auto mt-20 p-6  md:mt-35">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="border border-dark-bg p-2 rounded"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="border border-dark-bg  p-2 rounded"
          {...register("password", { required: true })}
        />

        {/* REMEMBER ME */}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("remember")} />
          Remember me
        </label>

        <button className="bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
