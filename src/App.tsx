import { useState } from 'react'

function App() {
	const [count, setCount] = useState(0)

	const addManyImage = () => {
		const arrImages = []

		for (let i = 0; i < 25; i++) {
			arrImages.push(
				<div className={`row${i === 19 ? '' : ' mb-2'}`}>
					<img
						src='https://media.geeksforgeeks.org/wp-content/uploads/20190802021607/geeks14.png'
						className='rounded-circle'
						alt='Circular Image'
						width='200'
					/>
				</div>
			)
		}

		return arrImages
	}

	return (
		<>
			<div className='container-fluid vh-100'>
				<div className='row' style={{ height: 'calc(100vh - 80px)' }}>
					<div className='col-1 border-end border-primary border-opacity-50 py-2 mh-100 overflow-y-scroll'>
						{addManyImage()}
					</div>
					<div className='col-2 border-end border-primary border-opacity-50 p-2'>
						<div className='row p-3'>
							<button
								type='button'
								className='btn btn-primary lg'
								onClick={() => setCount(prev => prev + 1)}
							>
								dsadasdasd
							</button>
						</div>
						<div className='row p-3'>
							<button
								type='button'
								className='btn btn-primary lg'
								onClick={() => setCount(prev => prev + 1)}
							>
								dsadasdasd
							</button>
						</div>
					</div>
					<div className='col p-3'>
						<div className='row p-3'>
							<button
								type='button'
								className='btn btn-primary lg'
								onClick={() => setCount(prev => prev + 1)}
							>
								dsadasdas
							</button>
						</div>
						<div className='row p-3'>
							<h1>{count}</h1>
						</div>
					</div>
				</div>
				<div className='row' style={{ height: 80 }}>
					<nav className='navbar bg-dark border-top border-primary'>
						<div className='container-fluid'>
							<img
								src='https://media.geeksforgeeks.org/wp-content/uploads/20190802021607/geeks14.png'
								className='rounded-circle'
								alt='Circular Image'
								width='60'
							/>
							<a className='navbar-brand' href='#'>
								Фиксированный внизу
							</a>
							<div className='dropdown dropup'>
								<button
									className='btn btn-secondary dropdown-toggle'
									type='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Dropdown button
								</button>
								<ul className='dropdown-menu'>
									<li>
										<a className='dropdown-item' href='#'>
											Action
										</a>
									</li>
									<li>
										<a className='dropdown-item' href='#'>
											Another action
										</a>
									</li>
									<li>
										<a className='dropdown-item' href='#'>
											Something else here
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</>
	)
}

export default App
