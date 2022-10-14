<script context="module">
	export async function load({ fetch }) {
		try {
			let obj = {}
			const resp = await fetch('https://mta.tony.place/stations')
			if (!resp.ok) {
				throw new Error()
			}
			const data = await resp.json()
			//console.log(data.map.NUMBERS)
			const { NUMBERS, ACE, BDFM, G, JZ, L, NQRW, S, SERVICE } = data
			ACE['images'] = {
				A: 'a.svg',
				C: 'c.svg',
				E: 'e.svg'
			}
			BDFM['images'] = {
				B: 'b.svg',
				D: 'd.svg',
				F: 'f.svg',
				M: 'm.svg'
			}
			G['images'] = { G: 'g.svg' }
			JZ['images'] = { J: 'j.svg', Z: 'z.svg' }
			L['images'] = { L: 'l.svg' }
			NQRW['images'] = {
				N: 'n.svg',
				Q: 'q.svg',
				R: 'r.svg',
				W: 'w.svg'
			}
			Array(...['1', '2', '3', '4', '5', '6', '7']).forEach((e) => {
				return (obj[e] = `${e}.svg`)
			})
			NUMBERS['images'] = obj
			S['images'] = { S: 's.svg ' }
			SERVICE['images'] = {}

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
	const map = data
	let subwayKeys = Object.keys(map)
	subwayKeys = subwayKeys.slice(0, subwayKeys.length - 1)
	let subwayGroup = {}
	let currentStation = {}

	const setSubway = (group, train) => {
		subwayGroup['group'] = group
		subwayGroup['train'] = train
		subwayGroup['color'] = 'bg-' + train
		subwayGroup['image'] = map[group]['images'][train]
		subwayGroup['boroughs'] = {}
		Object.keys(map[group].stationsByBorough).forEach((borough) => {
			let arr = []
			map[group].stationsByBorough[borough].forEach((station) => {
				if (station.routes.toLowerCase().includes(train.toLowerCase())) {
					arr.push(station)
				}
			})
			subwayGroup.boroughs[borough] = arr
		})
	}
</script>

<div class="flex flex-col-reverse lg:flex-row justify-center gap-6 mt-16 lg:mt-28 mx-6 mb-6">
	{#if Object.keys(currentStation).length == 0}
		<div
			class="w-full h-full min-h-routes-card max-w-routes-card rounded-3xl px-4 py-4 md:px-10 md:py-12 bg-white"
		>
			<div class="h-full w-100">
				{#if !subwayGroup['train']}
					<h1 class="font-bold text-xl lg:text-4xl mb-2">Live Subway Times</h1>
					<span class="inline-block w-full border-t-spacer border-gray-400 border-solid" />
					<div class="flex flex-row flex-wrap mt-4">
						{#each subwayKeys as key}
							{#each Object.keys(map[key]?.images) as subwayImgKey}
								<button
									on:click={() => setSubway(key, subwayImgKey)}
									class="py-2 px-2 md:py-2 md:px-3"
								>
									<img
										class="w-7 h-7 md:w-12 md:h-12"
										src={map[key]?.images[subwayImgKey]}
										alt={`subway-${subwayImgKey}`}
									/>
								</button>
							{/each}
						{/each}
					</div>
				{:else}
					<Stations bind:subwayGroup bind:selectedStation={currentStation} />
				{/if}
			</div>
		</div>
	{/if}
	{#if Object.keys(currentStation).length !== 0}
		<ActiveStation bind:subway={subwayGroup} bind:activeStation={currentStation} />
	{/if}
</div>

<!--const images = {
  1: '1.svg',
  2: '2.svg',
  3: '3.svg',
  4: '4.svg',
  5: '5.svg',
  6: '6.svg',
  7: '7.svg',
  A: 'a.svg',
  C: 'c.svg',
  E: 'e.svg',
  B: 'b.svg',
  D: 'd.svg',
  F: 'f.svg',
  M: 'm.svg',
  N: 'n.svg',
  Q: 'q.svg',
  R: 'r.svg',
  W: 'w.svg',
  L: 'l.svg',
  G: 'g.svg',
  S: 's.svg ',
  J: 'j.svg',
  Z: 'z.svg'
}-->
