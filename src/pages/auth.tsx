import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [variant, setVariant] = useState("login");

  /* A function that toggles the variant between login and register. */
  const toggleVariant = useCallback(() => {
    setVariant((current) => (current === "login" ? "register" : "login"));
  }, []);

  /* A function that is called when the user clicks the login button. It uses the next-auth library to
sign in the user and redirect */
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  /* A function that is called when the user clicks the register button. It uses the axios library to
make a POST request to the /api/register endpoint. If the request is successful, it calls the login
function to redirect the user */
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full md:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" height={100} width={200} />
        </nav>

        <div className="flex justify-center md:px-40 lg:px-0 ">
          <div className="bg-black/75 pt-[60px] px-16 pb-10 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="text-white font-netflix text-4xl font-semibold mb-7">
              {variant === "login" ? "Sign In" : "Create account"}
            </h2>

            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                id="email"
                type="text"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
                value={email}
              />
              {variant !== "login" && (
                <Input
                  label="Username"
                  id="username"
                  type="text"
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setUsername(e.currentTarget.value)
                  }
                  value={username}
                />
              )}
              <Input
                label="Password"
                id="password"
                type="password"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPassword(e.currentTarget.value)
                }
                value={password}
              />
            </div>

            <button
              className="bg-red-600 hover:bg-red-800 py-3 text-white w-full rounded-md mt-10 transition"
              onClick={variant === "login" ? login : register}
            >
              {variant === "login" ? "Login" : "Register"}
            </button>

            <button
              className="bg-slate-100 py-3 w-full rounded-md mt-3 flex justify-center items-center gap-3"
              onClick={() => signIn("google", { callbackUrl: "/profile" })}
            >
              Sign in with google
              <FcGoogle size={25} />
            </button>

            <p className="text-zinc-400 mt-12 text-sm">
              {variant === "login"
                ? "First time using MrPirate?"
                : "Already have an account?"}
              <span
                className="text-white hover:underline ml-1 cursor-pointer text-sm"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Create an account" : "Sign In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
