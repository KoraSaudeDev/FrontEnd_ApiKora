import { cookies } from "next/headers";
import { redirect } from 'next/navigation'; 

export default async function Home() {
    const cookieStore = cookies();
    const userCookie = (await cookieStore).get('user');
  
    if (!userCookie) {
      redirect('/login');
    }


    if (userCookie) {
        redirect('/inicio');
      }
    return (
        <div className="bg-[#f3f7fc] flex justify-center items-center w-full h-screen flex-col gap-10"></div>
    )
}