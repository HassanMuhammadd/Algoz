import React from 'react'
import '../App.css';

export default function Box({number,type}) {

    return (
		<div className={` ${type===0?"box":"bfsBox"} px-2 pb-0 m-1 `}>
			<p className='p-0 m-0'>{number}</p>
		</div>
    )
}
