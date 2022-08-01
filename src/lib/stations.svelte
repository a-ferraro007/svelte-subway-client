<script>
	export let subway
	export let selectedStation = undefined
	let selected
	let selectedState = `${subway.color} text-white border-1 rounded-md border-solid p-2 text-xs md:text-base`
	console.log(
		'bg-A bg-C bg-E bg-B bg-D bg-F bg-M bg-N bg-R bg-Q bg-W bg-G bg-L bg-S bg-J bg-Z bg-1 bg-2 bg-3 bg-4 bg-5 bg-6 bg-7'
	)
	let steadyState = 'border-1 rounded-md border-gray-700 border-solid p-2 text-xs md:text-base'
	Object.keys(subway.boroughs).forEach((e) => {
		if ((e === 'Bk' || e === 'Bx' || e === 'M' || e === 'Q') && !selected) {
			if (subway.boroughs[e].length > 0) {
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
			selectedState = `${subway.color} text-black border-1 rounded-md border-solid p-2 text-xs md:text-base`
		}
		selectedStation = station
	}
</script>

<div class="h-full w-full">
	<div class="flex justify-between">
		<button
			on:click={() => {
				subway = {}
				selectedStation = {}
			}}
		>
			<img src="arrow.png" alt="back arrow" />
		</button>

		<img src={subway.image} alt="subway sign" />
	</div>
	<span class="inline-block w-full border-spacer border-gray-400 border-solid" />
	<div>
		<ul class="flex flex-row justify-evenly list-none mb-1">
			<li>
				<button
					class={selected === 'Bk' ? 'border-b-1 border-black text-sm' : 'text-sm'}
					on:click={() => handleBoroughSelect('Bk')}
				>
					Brooklyn
				</button>
			</li>
			<li>
				<button
					class={selected === 'Bx' ? 'border-b-1 border-black text-sm' : 'text-sm'}
					on:click={() => handleBoroughSelect('Bx')}
				>
					Bronx
				</button>
			</li>
			<li>
				<button
					class={selected === 'M' ? 'border-b-1 border-black text-sm' : 'text-sm'}
					on:click={() => handleBoroughSelect('M')}
				>
					Manhattan
				</button>
			</li>
			<li>
				<button
					class={selected === 'Q' ? 'border-b-1 border-black text-sm' : 'text-sm'}
					on:click={() => handleBoroughSelect('Q')}
				>
					Queens
				</button>
			</li>
		</ul>
	</div>
	<div class="overflow-auto overflow-y-visible max-h-base-card-m lg:max-h-station-listing">
		<div class={`hidden ${subway.color}`} />
		{#if subway.boroughs[selected] != undefined}
			<ul class="flex flex-row flex-wrap gap-3 mt-4">
				{#each subway.boroughs[selected] as station}
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
