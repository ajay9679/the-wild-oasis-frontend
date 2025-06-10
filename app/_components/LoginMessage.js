"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function LoginMessage(){
    const pathName = usePathname();
    
    return <div className='grid bg-primary-800 '>
        <p className='text-center text-xl py-12 self-center'>
            Please{' '}
            <Link href={`/login?redirect=${pathName}`} className='underline text-accent-500'>
                login
            </Link>{' '}
            to reserve this
            <br /> cabin right now
        </p>
    </div>
}


