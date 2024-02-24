import LoginForm from "@components/auth/LoginForm"
import Link from "next/link";

export default function Page() {
  return (

      <div className="flex min-h-[100vh] flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          
          <LoginForm />

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link href="/auth/register" className="font-semibold leading-6 text-[#713f12] hover:text-indigo-500">Create account</Link>
          </p>
        </div>
      </div>

  );
}
