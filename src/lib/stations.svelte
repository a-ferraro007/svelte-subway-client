<script>
	export let subwayGroup
	export let selectedStation = undefined
	let selected
	let selectedState = `${subwayGroup.color} text-white border-1 rounded-md border-solid p-2 text-xs text-[#4a4a4a] md:text-base font-semibold`
	let steadyState =
		'border-1 rounded-md border-gray-700 border-solid p-2 text-xs text-[#4a4a4a] md:text-base font-semibold'
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
		if ('N Q R W'.toLowerCase().includes(station.routes.toLowerCase())) {
			selectedState = `${subwayGroup.color} text-[#4a4a4a] border-1 border-[#4a4a4a] rounded-md border-solid p-2 text-xs font-semibold md:text-base`
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
			<img class="w-5 h-5" src="arrow.svg" alt="back arrow" />
		</button>

		<img class="w-12 h-12" src={subwayGroup.image} alt="subwayGroup sign" />
	</div>
	<span
		class="inline-block w-full border-t-spacer border-[#4a4a4a] border-opacity-[.25] border-solid"
	/>
	<div>
		<ul class="flex flex-row justify-evenly list-none mb-1">
			{#each Object.keys(subwayGroup.boroughs) as key}
				{#if subwayGroup.boroughs[key].length > 0}
					<li>
						<button
							class={selected === key
								? 'border-b-1 border-[#4a4a4a] border-opacity-[.25] text-sm text-[#4a4a4a] font-bold'
								: 'text-sm font-bold text-[#4a4a4a]'}
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
							class={selectedStation.stopID === station.stopID ? selectedState : steadyState}
						>
							{station.stopName}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
