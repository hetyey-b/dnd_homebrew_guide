import React from 'react'
import { properties } from '../data/RME';

const RMEProperties = () => {
	return(
		<div className="flex justify-center">
      <div className='mt-5 w-[70%]'>
				<div
					className='
						font-bold
						text-center
						mb-4
						bg-slate-700
						py-3
					'
				>
					Weapon DC = 8 + Proficiency + Ability mod used to attack + any magical enhancement
				</div>
				<table className="table-auto w-full">
					<thead>
						<tr className="bg-slate-700 ">
							<th
								className="py-2"
							>
								Property
							</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{
							properties.map((property, ind) => (
								<tr
									className={`
										${ind % 2 === 0 ? 'bg-slate-500' : 'bg-slate-600'}
									`}
								>
									<td className='font-bold'>{property.name}</td>
									<td>{property.description}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default RMEProperties;