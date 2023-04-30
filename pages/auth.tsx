import Input from "@/components/Input";
import { useCallback, useState } from "react";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login")

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "signup" : "login"));
  }, []);

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
              <button className="bg-red-600 text-white rounded-md py-3 w-full hover:bg-red-700 transition">
                {variant === "login" ? "Login" : "Sign Up"}
              </button>
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