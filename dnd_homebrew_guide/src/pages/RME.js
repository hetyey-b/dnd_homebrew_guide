import React from "react";
import {weaponTypes, weapons, armor, shields, properties} from "../data/RME"

const RME = () => {
	const allWeapons = [
		...weapons.ambushWeapons.map(weapon => ({...weapon, type: 'Ambush Weapons'})),
		...weapons.axes.map(weapon => ({...weapon, type: 'Axes'})),
		...weapons.bludgeons.map(weapon => ({...weapon, type: 'Bludgeons'})),
		...weapons.bowsAndSlings.map(weapon => ({...weapon, type: 'Bows and Slings'})),
		...weapons.combatBlades.map(weapon => ({...weapon, type: 'Combat Blades'})),
		...weapons.crossbows.map(weapon => ({...weapon, type: 'Crossbows'})),
		...weapons.duelingBlades.map(weapon => ({...weapon, type: 'Dueling Blades'})),
		...weapons.firearms.map(weapon => ({...weapon, type: 'Firearms'})),
		...weapons.flailsAndWhips.map(weapon => ({...weapon, type: 'Flails and Whips'})),
		...weapons.hammersAndPicks.map(weapon => ({...weapon, type: 'Hammers and Picks'})),
		...weapons.polearms.map(weapon => ({...weapon, type: 'Polearms'})),
		...weapons.spears.map(weapon => ({...weapon, type: 'Spears'})),
		...weapons.throwingWeapons.map(weapon => ({...weapon, type: 'Throwing Weapons'})),
	];

  return (
    <div className="flex justify-center">
      <div className="mt-5 w-[70%]">
				<table className="table-auto w-full">
					<tr className="bg-steelBlue4 cursor-pointer">
						<th className="py-2 hover:bg-steelBlue1">Weapon</th>
						<th className="py-2 hover:bg-steelBlue1">Group</th>
						<th className="py-2 hover:bg-steelBlue1">Cost</th>
						<th className="py-2 hover:bg-steelBlue1">Weight</th>
						<th className="py-2 hover:bg-steelBlue1">Damage type</th>
					</tr>
					<tbody>
						{
							allWeapons.map((weapon, ind) => (
								<tr className='
									even:bg-steelBlue4
									odd:bg-steelBlue2
									hover:bg-steelBlue1
									cursor-pointer transition-colors duration-300 ease-in-out
								'>
									<td className='pl-3 py-2'>{weapon.name}</td>
									<td>{weapon.type}</td>
									<td>{weapon.gold} g</td>
									<td>{weapon.weight} lbs</td>
									<td>{[...weapon.damageTypes].join(' / ')}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
    </div>
  );
};

export default RME;
