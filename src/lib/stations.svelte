<script>
	export let subway
	export let selectedStation = undefined
	let selected
	console.log(subway)
	Object.keys(subway).forEach((e) => {
		if ((e === 'Bk' || e === 'Bx' || e === 'M' || e === 'Q') && !selected) {
			if (subway[e].length > 0) {
				selected = e
				return
			}
		}
	})

	const handleBoroughSelect = (newSelect) => {
		selected = newSelect
	}

	const handleSelectStation = (station) => {
		selectedStation = station
	}

	const reset = () => {
		subway = {}
		selectedStation = {}
	}
</script>

<div class="h-full w-full">
	<div class="flex justify-between">
		<button on:click={() => reset()}> <img src="arrow.png" alt="back arrow" /> </button>

		<img src={subway.image} alt="subway sign" />
	</div>
	<span class="inline-block w-full border-spacer border-gray-400 border-solid" />
	<div>
		<ul class="flex flex-row justify-between list-none">
			<li>
				<button
					class={selected === 'Bk' ? 'border-spacer border-black  rounded-md p-1' : 'p-1'}
					on:click={() => handleBoroughSelect('Bk')}
				>
					Brooklyn
				</button>
			</li>
			<li>
				<button
					class={selected === 'Bx' ? 'border-spacer border-black  rounded-md p-1' : 'p-1'}
					on:click={() => handleBoroughSelect('Bx')}
				>
					Bronx
				</button>
			</li>
			<li>
				<button
					class={selected === 'M' ? 'border-spacer border-black  rounded-md p-1' : 'p-1'}
					on:click={() => handleBoroughSelect('M')}
				>
					Manhattan
				</button>
			</li>
			<li>
				<button
					class={selected === 'Q' ? 'border-spacer border-black  rounded-md p-1' : 'p-1'}
					on:click={() => handleBoroughSelect('Q')}
				>
					Queens
				</button>
			</li>
		</ul>
	</div>
	<div class="overflow-auto overflow-y-visible max-h-station-listing">
		{#if subway[selected] != undefined}
			<ul class="flex flex-row flex-wrap gap-3 mt-4">
				{#each subway[selected] as station}
					<li>
						<button
							on:click={() => handleSelectStation(station)}
							class="border-1 rounded-md border-gray-700 border-solid p-2"
						>
							{station.stopName}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
