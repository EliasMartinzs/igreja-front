import { LoginForm } from "./LoginForm";

export function Login() {
  return (
    <div className="w-full h-svh center flex-col gap-y-8 overflow-hidden">
      <div className="text-center mt-32">
        <div className="w-64 h-64 bg-gray-500 mx-auto mb-2 rounded-lg"></div>
        <h3 className="text-3xl font-semibold mt-5">Login</h3>
      </div>
      <div className="w-full h-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
