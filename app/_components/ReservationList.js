"use client";
import React from 'react';
import ReservationCard from './ReservationCard';
import { deleteReservation } from '../_lib/actions';


export default function ReservationList({bookings}){
    const [optimisticBookings, optimisticDelete] = React.useOptimistic(bookings, (currBookings, bookingId) => currBookings.filter(booking => booking.id !== bookingId));
    async function handleDelete(bookingId){
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }

    return <ul className="space-y-6">
        {optimisticBookings.map((booking) => (
            <ReservationCard booking={booking} onDelete={handleDelete} key={booking.id} />
        ))}
    </ul>
}



