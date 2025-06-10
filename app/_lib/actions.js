"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function signInAction(redirect){
    await signIn('google',{redirectTo:redirect || '/account'});
}

export async function signOutAction(){
    await signOut({redirectTo:"/"});
}

export async function updateGuest(formData){
    // console.log(formData)
    const session = await auth();
    // const session = null;
    if(!session) throw new Error('You must be logged in 😊');
    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');
    const updateData = {nationality, countryFlag, nationalID};
    // console.log(updateData)
    const { data, error } = await supabase.from('guests').update(updateData).eq('id', session.user.guestId);
    if(error) throw new Error('Booking could not be updated');
    revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId){
    const session = await auth();
    if(!session) throw new Error('You must be logged in 😊');
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map(booking => booking.id);
    if(!guestBookingIds.includes(bookingId))
        throw new Error('You are not allowed to Delete 🤣')
    const { error } = await supabase.from('bookings').delete().eq('id',bookingId);
    if(error) throw new Error('Booking could not be deleted');
    revalidatePath('/account/reservations');
}

export async function updateBooking(formData){
    const bookingId = Number(formData.get('bookingId'));
    const session = await auth();
    if(!session) throw new Error('You must be logged in 😊');
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map(booking => booking.id);
    if(!guestBookingIds.includes(bookingId))
        throw new Error('You are not allowed to Update this booking 🤣');
    const updateData = {
        numGuests:Number(formData.get('numGuests')),
        observations:formData.get('observations').slice(0,100),
    };
    const { error } = await supabase.from('bookings').update(updateData).eq('id',bookingId).select().single();
    if(error) throw new Error('Booking could not be updated');
    revalidatePath('/account/reservations');
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    redirect('/account/reservations')
}

export async function createBooking(bookingData, formData){
    const session = await auth();
    if(!session) throw new Error('You must be logged in 😊');
    const newBooking = {
        ...bookingData,
        guestId:session.user.guestId,
        numGuests:Number(formData.get('numGuests')),
        observations:formData.get('observations').slice(0,100),
        extrasPrice:0,
        totalPrice:bookingData.cabinPrice,
        isPaid:false,
        hasBreakfast:false,
        status:"unconfirmed",
    };
    console.log(newBooking)
    const { error } = await supabase.from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select().single();
    if(error) throw new Error('Booking could not be created');
    revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect('/cabins/thankyou');
}


