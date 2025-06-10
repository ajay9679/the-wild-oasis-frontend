"use client";
import React from 'react'


export default function TextExpander({children}){
    const [isExpanded, setIsExpanded] = React.useState(false);
    const displayText = isExpanded ? children : children.split(' ').slice(0, 20).join(' ') + '...';
    // console.log(displayText);
    
    return <span>
        {displayText}
        <button className='text-primary-700 border-b border-primary-700 pb-1 leading-3' onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : 'Show More'}
        </button>
    </span>
}


