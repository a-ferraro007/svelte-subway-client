<script>
	export let subwayGroup
	export let selectedStation = undefined
	let selected
	let selectedState = `${subwayGroup.color} text-white border-1 rounded-md border-solid p-2 text-xs md:text-base font-semibold`
	let steadyState =
		'border-1 rounded-md border-gray-700 border-solid p-2 text-xs md:text-base font-semibold'
	//Not sure why but this fixes the issue of the dynamic
	//tailwind class not working.
	console.log(
		'bg-A bg-C bg-E bg-B bg-D bg-F bg-M bg-N bg-R bg-Q bg-W bg-G bg-L bg-S bg-J bg-Z bg-1 bg-2 bg-3 bg-4 bg-5 bg-6 bg-7'
	)

	//Move to TS enum at some point
	const boroughName = {
		Bk: 'Brooklyn',
		Bx: 'Bronx',
		M: 'Manhattan',
		Q: 'Queens'
	}

	Object.keys(subwayGroup.boroughs).forEach((e) => {
		if ((e === 'Bk' || e === 'Bx' || e === 'M' || e === 'Q') && !selected) {
			if (subwayGroup.boroughs[e].length > 0) {
				selected = e
				return
			}
		}
	})

	const handleBoroughSelect = (newSelect) => {
		selected = newSelect
	}

	const handleSelectStation = (station) => {
		if ('NQRW'.includes(station.routes)) {
			selectedState = `${subwayGroup.color} text-black border-1 rounded-md border-solid p-2 text-xs font-semibold md:text-base`
		}
		selectedStation = station
	}
</script>

<div class="h-full w-full">
	<div class="flex justify-between">
		<button
			on:click={() => {
				subwayGroup = {}
				selectedStation = {}
			}}
		>
			<img class="w-5 h-5" src="arrow.png" alt="back arrow" />
		</button>

		<img src={subwayGroup.image} alt="subwayGroup sign" />
	</div>
	<span class="inline-block w-full border-t-spacer border-gray-400 border-solid" />
	<div>
		<ul class="flex flex-row justify-evenly list-none mb-1">
			{#each Object.keys(subwayGroup.boroughs) as key}
				{#if subwayGroup.boroughs[key].length > 0}
					<li>
						<button
							class={selected === key
								? 'border-b-1 border-black text-sm font-bold'
								: 'text-sm font-bold'}
							on:click={() => handleBoroughSelect(key)}
						>
							{boroughName[key]}
						</button>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
	<div class="overflow-auto overflow-y-visible max-h-base-card-m lg:max-h-station-listing">
		{#if subwayGroup.boroughs[selected] != undefined}
			<ul class="flex flex-row flex-wrap gap-3 mt-4">
				{#each subwayGroup.boroughs[selected] as station}
					<li>
						<button
							on:click={() => handleSelectStation(station)}
							class={selectedStation.stopId === station.stopId ? selectedState : steadyState}
						>
							{station.stopName}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
