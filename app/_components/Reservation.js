import React from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import { auth } from '../_lib/auth';
import LoginMessage from './LoginMessage';


export default async function Reservation({cabin}){
    // console.log(cabin)
    const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)]);
    const session = await auth();
    // console.log('Booked Dates', bookedDates);
    
    return <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] mb-10 text-accent-400">
        <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
        {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
    </div>
}
