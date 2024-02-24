
import RegisterForm from '@components/auth/RegisterForm';
import Link from 'next/link';

export default async function Page() {

  return  (
    <div className="flex min-h-[100vh] flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-xl">
        
            <RegisterForm />

            <p className="mt-10 text-center text-sm text-gray-500">
                You have account?
                <Link href="/auth/login" className="font-semibold leading-6 text-[#713f12] hover:text-indigo-500">Login</Link>
            </p>
        </div>
    </div>
  )
  
  

}
