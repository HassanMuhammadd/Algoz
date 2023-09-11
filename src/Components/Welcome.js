import React from 'react'
import {Link} from 'react-router-dom'

export default function Welcome() {
    return (
		<div className='d-flex flex-column justify-content-center align-items-center text-white text-center mt-5'>
			Welcome, Choose a searching Algorithm to start learning!
			<div className="d-flex flex-md-row flex-column justify-content-between mt-5 w-50">
				<Link to='/linear'>
					<button className='searchButton w-100  px-3 py-2 fw-bold text-dark'>Linear Search</button>
				</Link>
				<Link to='/binary'>
					<button className='searchButton w-100 my-5 my-md-0 px-3 py-2 fw-bold text-dark'>Binary Search</button>
				</Link>
				<Link to='/bfs'>
					<button className='searchButton w-100 px-3 py-2 fw-bold text-dark'>BFS</button>
				</Link>
			</div>
		</div>
    )
}
