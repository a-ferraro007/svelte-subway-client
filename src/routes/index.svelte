<script context="module">
	export async function load({ fetch }) {
		try {
			let obj = {}
			const resp = await fetch('https://mta.tony.place/static')
			if (!resp.ok) {
				throw new Error()
			}
			const data = await resp.json()
			const { NUMBERS, ACE, BDFM, G, JZ, L, NQRW, S, SERVICE } = data.map
			ACE['images'] = {
				A: 'a.png',
				C: 'c.png',
				E: 'e.png'
			}
			BDFM['images'] = {
				B: 'b.png',
				D: 'd.png',
				F: 'f.png',
				M: 'm.png'
			}
			G['images'] = { G: 'g.png' }
			JZ['images'] = { J: 'j.png', Z: 'z.png' }
			L['images'] = { L: 'l.png' }
			NQRW['images'] = {
				N: 'n.png',
				Q: 'q.png',
				R: 'r.png',
				W: 'w.png'
			}
			Array(...['1', '2', '3', '4', '5', '6', '7']).forEach((e) => {
				return (obj[e] = `${e}.png`)
			})
			NUMBERS['images'] = obj
			S['images'] = { S: 's.png ' }
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
	const { map } = data
	let subwayKeys = Object.keys(map)
	subwayKeys = subwayKeys.slice(0, subwayKeys.length - 1)
	let subwayGroup = {}
	let currentStation = {}
	console.log(data)
	console.log(subwayKeys)
	console.log(currentStation)

	const setSubway = (group, train) => {
		subwayGroup['train'] = group
		subwayGroup['image'] = map[group]['images'][train]
		Object.keys(map[group].stationsByBorough).forEach((borough) => {
			let arr = []
			map[group].stationsByBorough[borough].forEach((station) => {
				if (station.routes.toLowerCase().includes(train.toLowerCase())) {
					arr.push(station)
				}
			})
			subwayGroup[borough] = arr
		})
	}
</script>

<div
	class="w-100 h-routes-card mx-auto mt-36 max-h-routes-card max-w-routes-card shadow-routes-card rounded-3xl"
	style="padding: 40px 50px;"
>
	<div class="h-full w-100">
		{#if !subwayGroup['train']}
			<h1 class="font-bold text-4xl mb-2">Live Subway Times</h1>
			<span class="inline-block w-full border-spacer border-gray-400 border-solid" />
			<div class="flex flex-row flex-wrap">
				{#each subwayKeys as key}
					{#each Object.keys(map[key]?.images) as subwayImgKey}
						<button
							on:click={() => setSubway(key, subwayImgKey)}
							class="mt-6"
							style="padding-right:20px"
						>
							<img
								style="height: 50px; width:50px"
								src={map[key]?.images[subwayImgKey]}
								alt={`subway-${subwayImgKey}`}
							/>
						</button>
					{/each}
				{/each}
			</div>
		{:else}
			<Stations bind:subway={subwayGroup} bind:selectedStation={currentStation} />
		{/if}
	</div>
</div>
{#if Object.keys(currentStation).length !== 0}
	<ActiveStation bind:subway={subwayGroup} bind:activeStation={currentStation} />
{/if}
<!--const images = {
  1: '1.png',
  2: '2.png',
  3: '3.png',
  4: '4.png',
  5: '5.png',
  6: '6.png',
  7: '7.png',
  A: 'a.png',
  C: 'c.png',
  E: 'e.png',
  B: 'b.png',
  D: 'd.png',
  F: 'f.png',
  M: 'm.png',
  N: 'n.png',
  Q: 'q.png',
  R: 'r.png',
  W: 'w.png',
  L: 'l.png',
  G: 'g.png',
  S: 's.png ',
  J: 'j.png',
  Z: 'z.png'
}-->
