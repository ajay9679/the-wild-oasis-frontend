import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";


export default async function Page({params}){
    const session = await auth();
    const {bookingId} = await params;
    const {numGuests, observations, cabinId, guestId} = await getBooking(bookingId);
    if(session.user.guestId !== guestId) throw new Error('You don\'t have permission to edit this reservation. 😊');
    const {maxCapacity} = await getCabin(cabinId);
    console.log(session.user.guestId, guestId)
    // CHANGE
    // const reservationId = 23;
    // const maxCapacity = 23;
    
    return <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Edit Reservation #{bookingId}
        </h2>
        
        <form action={updateBooking} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
            <input type="hidden" value={bookingId} name="bookingId" />
            <div className="space-y-2">
                <label htmlFor="numGuests">How many guests?</label>
                <select name="numGuests" defaultValue={numGuests} id="numGuests" className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm" required >
                    <option value="" key="">
                        Select number of guests...
                    </option>
                    {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                        <option value={x} key={x}>
                            {x} {x === 1 ? "guest" : "guests"}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="space-y-2">
                <label htmlFor="observations">
                    Anything we should know about your stay?
                </label>
                <textarea name="observations" defaultValue={observations} className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm" />
            </div>
            
            <div className="flex justify-end items-center gap-6">
                {/* <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
                    Update reservation
                </button> */}
                <SubmitButton pendingLabel="Updating..." >
                    Update Profile
                </SubmitButton>
            </div>
        </form>
    </div>
}
