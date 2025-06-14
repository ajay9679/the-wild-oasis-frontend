"use client";
import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


export default function Filter(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const activeFilter = searchParams.get('capacity') ?? 'all';
    // console.log(searchParams)
    function handleFilter(filter){
        const params = new URLSearchParams();
        // console.log(params)
        params.set("capacity",filter);
        router.replace(`${pathname}?${params.toString()}`,{scroll:false});
    }
    
    return <div className="border border-x-primary-800 flex">
        {/* <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handleFilter('all')}>All Cabins</button>
        <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handleFilter('small')}>1&mdash;3 guests</button>
        <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handleFilter('medium')}>4&mdash;7 guests</button>
        <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handleFilter('large')}>8&mdash;12 guests</button> */}
        <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>All cabins</Button>
        <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3 guests</Button>
        <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7 guests</Button>
        <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12 guests</Button>
    </div>
}

function Button({filter, handleFilter, activeFilter, children}){
    return <button  className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''}`} onClick={() => handleFilter(filter)}>{children}</button>
}
