import React from "react";
import {weapons, properties} from "../data/RME"

import {AiOutlineClose} from 'react-icons/ai';
import {GoTriangleDown, GoTriangleUp} from 'react-icons/go';

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
	const [checkedProperties, setCheckedProperties] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [simpleOnly, setSimpleOnly] = React.useState(false);
	const [nonHeavyOnly, setNonHeavyOnly] = React.useState(false);

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
			if (searchQuery === "" && checkedProperties.length === 0 && !simpleOnly) {
				setFilteredWeapons([]);
				setLoading(false);
				return;
			}

			setFilteredWeapons(allWeapons.filter(weapon => {
				const searchQueryMatch = weapon.name.toLowerCase().includes(searchQuery);
				const checkedPropertiesMatch = checkedProperties.every((property) => {
					return [...weapon.untrained, ...weapon.basic, ...weapon.master].some(weaponProperty => weaponProperty.includes(property.toLowerCase()));
				});

				if (simpleOnly && weapon.untrained.includes('awkward')) {
					return false;
				}

				if (nonHeavyOnly && [...weapon.untrained, ...weapon.basic, weapon.master].every(weaponProperty => !weaponProperty.includes('heavy'))) {
					return false;
				}

				return searchQueryMatch && checkedPropertiesMatch;
			}));
			setLoading(false);
		}, 500);
	}, [allWeapons, searchQuery, checkedProperties, simpleOnly, nonHeavyOnly]);

	const handleSearchOnChange = (event) => {
		setLoading(true);
		setSearchQuery(event.target.value.toLowerCase());
	}

  return (

    <div className="flex justify-center">
			<div
				className={`
					absolute w-[500px]
					bg-slate-600
					top-[35%]
					rounded border-slate-50 border-2
					text-center
					p-4 z-10
					${loading ? '' : 'hidden'}
				`}
			>
				Loading...
			</div>
      <div className={`mt-5 w-[70%] ${loading ? 'opacity-40' : ''}`}>
				<input
					type="text"
					placeholder="Search..."
					className="mb-4 bg-slate-700 text-slate-50 px-2 py-1 w-[300px]"
					value={searchQuery}
					onChange={handleSearchOnChange}
				/>
				<button
					className="ml-[-20px]"
					onClick={() => setSearchQuery('')}
				>
					<AiOutlineClose />
				</button>
				<label className="mx-2 inline-block cursor-pointer">
					<input 
						className="bg-slate-700"
						type="checkbox"
						defaultChecked={simpleOnly}
						onChange={() => {
							setLoading(true);
							setSimpleOnly(!simpleOnly);
						}}
					/>
					<span className="ml-1">
						Simple Only
					</span>
				</label>
				<label className="mx-2 inline-block cursor-pointer">
					<input 
						className="bg-slate-700"
						type="checkbox"
						defaultChecked={nonHeavyOnly}
						onChange={() => {
							setLoading(true);
							setNonHeavyOnly(!nonHeavyOnly);
						}}
					/>
					<span className="ml-1">
						Non-Heavy Only
					</span>
				</label>
				<div
					className="block mb-2"
				>
					{
						properties.map((property) => (
							<label className="mx-2 inline-block cursor-pointer">
								<input 
									className="bg-slate-700"
									type="checkbox"
									defaultChecked={checkedProperties.includes(property.name)}
									onChange={() => {
										setLoading(true);
										const newCheckedTypes = [...checkedProperties];
										if (newCheckedTypes.includes(property.name)) {
											newCheckedTypes.splice(newCheckedTypes.indexOf(property.name), 1);
										} else {
											newCheckedTypes.push(property.name);
										}
										setCheckedProperties(newCheckedTypes);
									}}
								/>
								<span className="ml-1">
									{property.name}
								</span>
							</label>
						))
					}
				</div>
				<table className="table-fixed w-full">
					<thead>
						<tr className="cursor-pointer bg-slate-700 ">
							<th 
								className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
								onClick={() => sortWeaponsBy("name")}
							>
								<span className="inline-block">
									Weapon
								</span>
								{
									sortingBy === "name" &&
									<span className="ml-2 inline-block">
										{
											sortingDir === 1 ?
											<GoTriangleDown /> :
											<GoTriangleUp />
										}
									</span>
								}
							</th>
							<th 
								className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
								onClick={() => sortWeaponsBy("group")}
							>
								<span className="inline-block">
									Group
								</span>
								{
									sortingBy === "group" &&
									<span className="ml-2 inline-block">
										{
											sortingDir === 1 ?
											<GoTriangleDown /> :
											<GoTriangleUp />
										}
									</span>
								}
							</th>
							<th 
								className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out w-[60px]"
								onClick={() => sortWeaponsBy("gold")}
							>
								<span className="inline-block">
									Cost
								</span>
								{
									sortingBy === "gold" &&
									<span className="ml-2 inline-block">
										{
											sortingDir === 1 ?
											<GoTriangleDown /> :
											<GoTriangleUp />
										}
									</span>
								}
							</th>
							<th 
								className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out w-[100px]"
								onClick={() => sortWeaponsBy("weight")}
							>
								<span className="inline-block">
									Weight
								</span>
								{
									sortingBy === "weight" &&
									<span className="ml-2 inline-block">
										{
											sortingDir === 1 ?
											<GoTriangleDown /> :
											<GoTriangleUp />
										}
									</span>
								}
							</th>
							<th 
								className="py-2 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
							>
								Damage type
							</th>
						</tr>
					</thead>
					<tbody>
						{
							(searchQuery.length > 0 || checkedProperties.length > 0 || simpleOnly ? 
								filteredWeapons : allWeapons).map((weapon, ind) => (
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
