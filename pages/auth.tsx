import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login")

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "signup" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const rergister = useCallback(async () => {
    try {
      const res = await axios.post("/api/register", {
        username,
        email,
        password,
      });
      const data = await res.data;
      login();
    } catch (error) {
      console.log(error);
    }
  }, [username, email, password]);

  return (
    <div className="h-full w-full bg-[url('/images/background.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-90">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Login" : "Sign Up"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "signup" && (
                <Input
                  id="username"
                  label="Username"
                  value={username}
                  onChange={(e: any) => setUsername(e.target.value)}
                />
              )}
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <button
                className="bg-red-600 text-white rounded-md py-3 w-full hover:bg-red-700 transition"
                onClick={variant === "login" ? login : rergister}
              >
                {variant === "login" ? "Login" : "Sign Up"}
              </button>
              <div className="flex flex-grow items-center gap-4 mt-8 justify-center">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor--pointer hover:opacity-80 transition"
                >
                  <FcGoogle size={24} />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor--pointer hover:opacity-80 transition"
                >
                  <FaGithub size={24} />
                </div>
              </div>
              <p className="text-white text-center mt-2">
                {variant === "login" ? "Don't have an account?" : "Already have an account?"}
                <span
                  className="text-red-600 ml-1 hover:underline cursor-pointer"
                  onClick={toggleVariant}
                >
                  {variant === "login" ? "Sign Up" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Auth;