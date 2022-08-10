<script context="module">
	export async function load({ fetch }) {
		try {
			let obj = {}
			const resp = await fetch('http://localhost:8080/static')
			if (!resp.ok) {
				throw new Error()
			}
			const data = await resp.json()
			console.log(data)

			return {
				props: {
					data
				}
			}
		} catch (error) {
			console.error(error)
			return {
				status: 500,
				props: {
					data: null
				}
			}
		}
	}
</script>

<script>
	import ActiveStation from '../lib/activeStation.svelte'
	import Stations from '../lib/stations.svelte'

	export let data
	const { stationMap } = data
	let subwayKeys = Object.keys(stationMap)
	subwayKeys = subwayKeys.slice(0, subwayKeys.length - 1) //cut out service line for now
	let subway = {}
	let currentStation = {}
	const LINE_GROUP_MAP = {
		ONE: 'NUMBERS',
		TWO: 'NUMBERS',
		THREE: 'NUMBERS',
		FOUR: 'NUMBERS',
		FIVE: 'NUMBERS',
		SIX: 'NUMBERS',
		SEVEN: 'NUMBERS',
		A: 'ACE',
		C: 'ACE',
		E: 'ACE',
		B: 'BDFM',
		D: 'BDFM',
		F: 'BDFM',
		M: 'BDFM',
		N: 'NQRW',
		Q: 'NQRW',
		R: 'NQRW',
		W: 'NQRW',
		L: 'L',
		G: 'G',
		S: 'S',
		J: 'JZ',
		Z: 'JZ'
	}

	const setSubway = (train) => {
		console.log('SET', stationMap[train], LINE_GROUP_MAP[train], train)
		subway['group'] = LINE_GROUP_MAP[train.toUpperCase()]
		subway['train'] = train
		subway['color'] = 'bg-' + train.toUpperCase()
		subway['boroughs'] = {}
		Object.keys(stationMap[train].stationsByBorough).forEach((borough) => {
			subway.boroughs[borough] = [...stationMap[train].stationsByBorough[borough]]
		})
	}
</script>

<div class="flex flex-col lg:flex-row justify-center gap-6 mt-16 lg:mt-28 mx-6 mb-6">
	<div
		class="w-full h-full min-h-routes-card max-w-routes-card shadow-routes-card rounded-3xl px-4 py-4 md:px-10 md:py-12"
	>
		<div class="h-full w-100">
			{#if !subway['train']}
				<h1 class="font-bold text-xl lg:text-4xl mb-2">Live Subway Times</h1>
				<span class="inline-block w-full border-t-spacer border-gray-400 border-solid" />
				<div class="flex flex-row flex-wrap mt-4">
					{#each subwayKeys as key}
						<button on:click={() => setSubway(key)} class="py-2 px-2 md:py-2 md:px-3">
							<img
								class="w-7 h-7 md:w-12 md:h-12"
								src={`${key.toUpperCase()}.svg`}
								alt={`subway-${key}`}
							/>
						</button>
					{/each}
				</div>
			{:else}
				<Stations bind:subway bind:selectedStation={currentStation} />
			{/if}
		</div>
	</div>
	{#if Object.keys(currentStation).length !== 0}
		<ActiveStation bind:subway bind:activeStation={currentStation} />
	{/if}
</div>
