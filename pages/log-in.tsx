import { NextPage } from "next";
import Image from "next/image";
import { FieldErrors, useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";

interface LoginForm {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [login, { loading, data, error }] = useMutation("/api/users/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onValid = (data: LoginForm) => {
    if (loading) return;
    login(data);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="bg-tw-dark-gray rounded-2xl p-7 shadow-2xl">
        <h3 className="text-center">
          <Image
            src="/twitter-logo.png"
            width={50}
            height={40}
            alt="twitter logo"
          />
        </h3>
        <h3 className="text-3xl font-bold text-center">Sign in to Twitter</h3>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className="flex flex-col my-10">
            <div className="w-full border-2 border-white rounded-lg bg-white flex gap-2 items-center p-2 focus-within:border-tw-primary">
              <Image src="/arroba.png" width={24} height={24} />
              <input
                className="w-full bg-transparent outline-0 text-black"
                id="email"
                spellCheck={false}
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    notEmail: (value) =>
                      value.includes("@") || "this mail is not allowed",
                  },
                })}
              />
            </div>
            <span className="text-red-500">{errors.email?.message}</span>
            <div className="w-full border-2 border-white rounded-lg bg-white flex gap-2 items-center p-2 focus-within:border-tw-primary mt-6">
              <Image src="/padlock.png" width={24} height={24} />
              <input
                className="w-full bg-transparent outline-0 text-black"
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            <span className="text-red-500">{errors.password?.message}</span>
          </div>
          <div className="flex flex-col space-y-3">
            <button
              disabled={loading}
              className="w-full text-2xl font-medium border-2 border-tw-primary rounded-md bg-tw-primary py-2 hover:opacity-90 shadow-2xl"
            >
              {loading ? "Loading ... " : "Sign in"}
            </button>
            <button className="w-full text-2xl font-medium border-2 border-tw-gray rounded-md bg-tw-gray py-2 hover:opacity-90 shadow-2xl">
              Forgot password?
            </button>
          </div>
        </form>
        <div className="mt-2">
          Don't have an account
          <span className="text-tw-primary hover:cursor-pointer"> Sing Up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
