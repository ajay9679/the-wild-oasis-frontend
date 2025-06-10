"use client";
import React from 'react';


export const ReservationContext = React.createContext();

const initialState = {from:undefined,to:undefined};

export default function ReservationProvider({children}){
    const [range, setRange] = React.useState(initialState);
    const resetRange = () => setRange(initialState);

    return <ReservationContext.Provider value={{range, setRange, resetRange}}>
        {children}
    </ReservationContext.Provider>
}

export function useReservation(){
    const context = React.useContext(ReservationContext);
    if(context === undefined) throw new Error('Context was used outside provider');
    return context;
}

