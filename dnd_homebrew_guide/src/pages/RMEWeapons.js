import React from "react";
import {weapons} from "../data/RME"

const RMEWeapons = () => {
	const [sortingBy,setSortingBy] = React.useState("group");
	const [sortingDir, setSortingDir] = React.useState(1);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [allWeapons,setAllWeapons] = React.useState([
		...weapons.ambushWeapons.map(weapon => ({...weapon, group: 'Ambush Weapons'})),
		...weapons.axes.map(weapon => ({...weapon, group: 'Axes'})),
		...weapons.bludgeons.map(weapon => ({...weapon, group: 'Bludgeons'})),
		...weapons.bowsAndSlings.map(weapon => ({...weapon, group: 'Bows and Slings'})),
		...weapons.combatBlades.map(weapon => ({...weapon, group: 'Combat Blades'})),
		...weapons.crossbows.map(weapon => ({...weapon, group: 'Crossbows'})),
		...weapons.duelingBlades.map(weapon => ({...weapon, group: 'Dueling Blades'})),
		...weapons.firearms.map(weapon => ({...weapon, group: 'Firearms'})),
		...weapons.flailsAndWhips.map(weapon => ({...weapon, group: 'Flails and Whips'})),
		...weapons.hammersAndPicks.map(weapon => ({...weapon, group: 'Hammers and Picks'})),
		...weapons.polearms.map(weapon => ({...weapon, group: 'Polearms'})),
		...weapons.spears.map(weapon => ({...weapon, group: 'Spears'})),
		...weapons.throwingWeapons.map(weapon => ({...weapon, group: 'Throwing Weapons'})),
	]);
	const [filteredWeapons,setFilteredWeapons] = React.useState([]);
	const [selectedWeapon,setSelectedWeapon] = React.useState(null);

	const sortWeaponsBy = (property) => {
		if (allWeapons[0][property] === undefined) {
			return;
		}

		if (sortingBy === property) {
			setSortingDir(sortingDir * (-1));
			console.log("Changed sortingdir");
			return;
		}

		setSortingBy(property);
	};

	React.useEffect(() => {
		const newWeapons = [...allWeapons];
		newWeapons.sort((a,b) => {
			if (a[sortingBy] > b[sortingBy]) {
				return sortingDir*1;
			}
			if (a[sortingBy] < b[sortingBy]) {
				return sortingDir*(-1);
			}
			if (a.name > b.name) {
				return sortingDir*1;
			}
			if (a.name < b.name) {
				return sortingDir*(-1);
			}

			return 0;
		});
		setAllWeapons(newWeapons);
	}, [sortingBy, sortingDir]);

	React.useEffect(() => {
		setTimeout(() => {
			if (searchQuery === "") {
				setFilteredWeapons([]);
				return;
			}

			setFilteredWeapons(allWeapons.filter(weapon => {
				return weapon.name.toLowerCase().includes(searchQuery);
			}));
		}, 500);
	}, [searchQuery]);

	const handleSearchOnChange = (event) => {
		setSearchQuery(event.target.value.toLowerCase());
	}

  return (
    <div className="flex justify-center">
      <div className="mt-5 w-[70%]">
				<input
					type="text"
					placeholder="Search..."
					className="mb-4 bg-slate-700 text-slate-50 px-2 py-1"
					value={searchQuery}
					onChange={handleSearchOnChange}
				/>
				<table className="table-fixed w-full">
					<tr className="cursor-pointer bg-slate-700 ">
						<th 
							className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
							onClick={() => sortWeaponsBy("name")}
						>
							Weapon
						</th>
						<th 
							className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
							onClick={() => sortWeaponsBy("group")}
						>
							Group
						</th>
						<th 
							className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out w-[60px]"
							onClick={() => sortWeaponsBy("gold")}
						>
							Cost
						</th>
						<th 
							className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out w-[60px]"
							onClick={() => sortWeaponsBy("weight")}
						>
							Weight
						</th>
						<th 
							className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
						>
							Damage type
						</th>
					</tr>
					<tbody>
						{
							(searchQuery.length > 0 ? filteredWeapons : allWeapons).map((weapon, ind) => (
								<>
									<tr className={`
										${ind % 2 === 0 ? 'bg-slate-500' : 'bg-slate-600'}
										${weapon.name === selectedWeapon ? 'bg-slate-400' : ''}
										hover:bg-slate-400
										cursor-pointer transition-colors duration-300 ease-in-out`}
										onClick={() => {
											if (selectedWeapon === weapon.name) {
												setSelectedWeapon(null);
											} else {
												setSelectedWeapon(weapon.name);
											}
										}}	
									>
										<td className='pl-3 py-2'>{weapon.name}</td>
										<td>{weapon.group}</td>
										<td>{weapon.gold} g</td>
										<td>{weapon.weight} lbs</td>
										<td>{[...weapon.damageTypes].join(' / ')}</td>
									</tr>
									<tr
										className={`
										${selectedWeapon === weapon.name ? '' : 'hidden'}
										${ind % 2 === 0 ? 'bg-slate-500' : 'bg-slate-600'}
										`}
									>
										<td
											colSpan={5}
										>
											<div
												className="grid grid-cols-3 gap-4 py-1 px-2"
											>
												<div>{weapon.description}</div>
												<div>
													<div className="py-1">
														Untrained: {[...weapon.untrained].join(', ')}
													</div>
													<div className="py-1 border-t">
														Basic: {[...weapon.basic].join(', ')}
													</div>
													<div className="py-1 border-t">
														Master: {[...weapon.master].join(', ')}
													</div>
													{
														weapon.meleeTable &&
														(<div  className="border-t py-1">
															<table>
																<thead>
																	<tr>
																		<th className="border-r border-b py-1 px-2">
																			Proficiency
																		</th>
																		<th className="border-b py-1 px-2">
																			Damage
																		</th>
																	</tr>	
																</thead>
																<tbody>
																	{Object.entries(weapon.meleeTable).map(meleeRow => (
																		<tr>
																			<td className="border-r py-1 px-2">{meleeRow[0]}</td>
																			<td className="py-1 px-2">{meleeRow[1]}</td>
																		</tr>
																	))}	
																</tbody>	
															</table>	
														</div>)
													}
												</div>
												<div><span className="block underline">Master Perk</span>{weapon.perk}</div>
											</div>
										</td>
									</tr>
								</>
							))
						}
					</tbody>
				</table>
			</div>
    </div>
  );
};

export default RMEWeapons;
