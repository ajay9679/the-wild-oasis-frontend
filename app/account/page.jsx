import {auth} from '@/app/_lib/auth'


export const metadata = {
    title:"Account"
};

export default async function Page(){
	const session = await auth();
	return <div className="font-semibold text-2xl text-accent-400 mb-7">
		<h2>Welcome, {session?.user?.name}</h2>
	</div>
}