import {getCabins} from "@/app/_lib/data-service.js"
import CabinCard from "@/app/_components/CabinCard";


export default async function CabinList({filter}){
	// CHANGE
 	const cabins = await getCabins();

 	if(!cabins.length) return null;
    let displayedCabins;
    if(filter === 'all') displayedCabins = cabins;
    if(filter === 'small') displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 3);
    if(filter === 'medium') displayedCabins = cabins.filter(cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
    if(filter === 'medium') displayedCabins = cabins.filter(cabin => cabin.maxCapacity >= 8);
    console.log(displayedCabins)

	return <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
       	{displayedCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
    </div>
}

