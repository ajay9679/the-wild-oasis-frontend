"use client";
import ReactDOM from "react-dom";


export default function SubmitButton({children, pendingLabel}){
    const { pending } = ReactDOM.useFormStatus();
    
    return <button type="submit" className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" disabled={pending} >
        {pending ? pendingLabel : children}
    </button>
}


