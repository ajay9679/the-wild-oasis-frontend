'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


function LoginMessage(){
  const pathname = usePathname();
  
  return (
    <div className='grid bg-primary-800 '>
      <p className='text-center text-xl py-12 self-center'>
        Please{' '}
        <Link href={`/login?redirectTo=${pathname}`} className='underline text-accent-500'>
          login
        </Link>{' '}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
