import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: 3, // Customer default
    },
  });

  const selectedRole = watch("role_id");
  const password = watch("password");

  // 🔹 Fetch roles
  useEffect(() => {
    api.get("/roles")
      .then((res) => setRoles(res.data))
      .catch(() => setApiError("Roles could not be loaded"));
  }, []);

  // 🔹 Submit
  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    const payload =
      Number(data.role_id) === 2
        ? {
            name: data.name,
            email: data.email,
            password: data.password,
            role_id: data.role_id,
            store: {
              name: data.store_name,
              phone: data.phone,
              tax_no: data.tax_no,
              bank_account: data.bank_account,
            },
          }
        : {
            name: data.name,
            email: data.email,
            password: data.password,
            role_id: data.role_id,
          };

    try {
      await api.post("/signup", payload);
   


toast.info('You need to click link in email to activate your account!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});



       history.goBack();
    } catch (err) {
      setApiError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-25 md:mt-45">
      <h2 className="text-3xl font-montserrat text-dark-bg text-center font-bold mb-6">Sign Up</h2>

      {apiError && (
        <p className="text-red-500 text-sm mb-4">{apiError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col space-y-6">
        {/* NAME */}
        <input
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Min 3 characters" },
          })}
          className="input border hover:border-dark-bg border-second-text rounded-md px-4 py-1"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* EMAIL */}
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
          })}
          className="input border hover:border-dark-bg border-second-text rounded-md px-4 py-1"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
              message:
                "Min 8 chars, uppercase, lowercase, number & special char",
            },
          })}
          className="input border hover:border-dark-bg border-second-text rounded-md px-4 py-1"
        />
        {errors.password && (
          <p className="error">{errors.password.message}</p>
        )}

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          className="input border hover:border-dark-bg border-second-text rounded-md px-4 py-1"
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        {/* ROLE */}
        <select {...register("role_id")} className="input">
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        {/* STORE FIELDS */}
        {Number(selectedRole) === 2 && (
          <>
            <input
              placeholder="Store Name"
              {...register("store_name", {
                required: true,
                minLength: 3,
              })}
              className="input"
            />

            <input
              placeholder="Phone"
              {...register("phone", {
                pattern: {
                  value: /^(\+90|0)?5\d{9}$/,
                  message: "Invalid TR phone number",
                },
              })}
              className="input"
            />

            <input
              placeholder="Tax No"
              {...register("tax_no", {
                pattern: {
                  value: /^T\d{4}V\d{6}$/,
                  message: "Format: TXXXXVXXXXXX",
                },
              })}
              className="input"
            />

            <input
              placeholder="IBAN"
              {...register("bank_account", {
                pattern: {
                  value: /^TR\d{24}$/,
                  message: "Invalid IBAN",
                },
              })}
              className="input"
            />
          </>
        )}

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded flex justify-center"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
