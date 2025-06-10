"use client";
import { signInAction } from "../_lib/actions";
import { useSearchParams } from "next/navigation";


export const metadata = { title:"Login" };

export default function SignInButton(){
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || "";
    const signInActionFunc = signInAction.bind(null, redirect);

    return <form action={signInActionFunc} >
        <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
            <img src='https://authjs.dev/img/providers/google.svg' alt='Google logo' height='24' width='24'/>
            <span>Continue with Google</span>
        </button>
    </form>
}


