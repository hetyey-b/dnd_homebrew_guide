import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();

	return(
		<div
			className='flex justify-center'
		>
			<div
				className='mt-5 w-[70%]'
			>
		 		<Button 
					text="Revised Martial Equipment"
					additionalCSS="w-full"
					onClick={() => {navigate('/dnd_homebrew_guide/rme')}}
				/>
			</div>
		</div>
		)
}

export default Home;