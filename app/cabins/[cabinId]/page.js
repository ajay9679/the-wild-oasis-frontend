import React from "react";
import DateSelector from "@/app/_components/DateSelector";
import Reservation from "@/app/_components/Reservation";
import ReservationForm from "@/app/_components/ReservationForm";
import TextExpander from "@/app/_components/TextExpander";
import {getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";


export async function generateMetadata({params}){
    const {name} = await getCabin(params.cabinId);
    return {title:`Cabin ${name}`};
}

export async function generateStaticParams(){
    const cabins = await getCabins();
    const ids = cabins.map(cabin => ({cabinId:String(cabin.id)}));
    // console.log(ids)
    return ids;
}

// PLACEHOLDER DATA
/*const cabin = {
    id: 89,name: "001",maxCapacity: 2,regularPrice: 250,discount: 0,description:
    "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
    image:"https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
};*/

export default async function Page({params}){
    const cabin = await getCabin(params.cabinId);
    /*const settings = await getSettings();
    const bookedDates = await getBookedDatesByCabinId(params.cabinId);*/
    // const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;
    
    return <div className="max-w-6xl mx-auto mt-8">
        <Cabin cabin={cabin} />
        <div>
            <h2 className="text-5xl font-semibold text-center">
                Reserve {cabin.name} today. Pay on arrival.
            </h2>
            <React.Suspense fallback={<Spinner />}>
                <Reservation cabin={cabin} />
            </React.Suspense>
        </div>
    </div>
}


