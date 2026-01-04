"use server"
import {signIn, signOut} from './auth';
import {auth} from '@/app/_lib/auth'
import {supabase} from '@/app/_lib/supabase'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {getBookings} from '@/app/_lib/data-service';



export async function signInAction(redirect){
	await signIn('google', {redirectTo:redirect || "/account"});
}

export async function signOutAction(){
	await signOut({redirectTo:'/'});
}

export async function updateGuest(formData){
	// console.log(formData)
	const session = await auth();
	if(!session) throw new Error('You must be logged in.');
	const nationalID = formData.get('nationalID');
	const [nationality, countryFlag] = formData.get('nationality').split('%');
	const updateData = {nationality, countryFlag, nationalID};
	const {data, error} = await supabase.from('guests')
		.update(updateData)
		.eq('id', session.user.guestId)
		.select()
		.single();
	if(error) throw new Error('Guest could not be updated');
	revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId){
	const session = await auth();
	if(!session) throw new Error('You must be logged in.');
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map(booking => booking.id);
	if(!guestBookingIds.includes(bookingId))
		throw new Error('Booking could not be deleted.');
}

export async function updateReservation(formData){
	const session = await auth();
	const bookingId = Number(formData.get('bookingId'));
	if(!session) throw new Error('You must be logged in.');
	console.log(formData)
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map(booking => booking.id);
	if(!guestBookingIds.includes(bookingId))
		throw new Error('Booking could not be updated.');
	const updateData = {
		numGuests:Number(formData.get('numGuests')),
		observations:formData.get('observations').slice(0,1000),
    
	};
	
	const { data, error } = await supabase
	    .from('bookings')
	    .update(updateData)
	    .eq('id', bookingId)
	    .select()
	    .single();
	if (error) {
    	console.error(error);
    	throw new Error('Booking could not be updated');
  	}
  	redirect('/account/reservations');
  	revalidatePath('/account/reservations');
  	revalidatePath(`/account/reservations/edit/${bookingId}`);
}

export async function createBooking(bookingData,formData){
	const session = await auth();
	if(!session) throw new Error('You must be logged in.');
	console.log(formData)
	const newBooking = {
		...bookingData,
		guestId:session.user.guestId,
		created_at:new Date().toISOString(),
		numGuests:Number(formData.get('numGuests')),
		observations: formData.get("observations").slice(0, 1000),
		extrasPrice:0,
		totalPrice:bookingData.cabinPrice,
		isPaid:false,
		status:"unconfirmed",
	};
	console.log(newBooking)
	const { error } = await supabase
    .from('bookings')
    .insert([newBooking])

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  // redirect('/cabins/thankyou');
  redirect("/cabins/thankyou");
}
