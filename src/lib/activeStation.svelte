<script>
	import { afterUpdate, onMount, onDestroy } from 'svelte'
	import TimeCard from './timeCard.svelte'

	export let activeStation
	export let subway
	console.log('SUBWAY', subway)
	let conn, upcomingTrains

	onMount(() => {
		try {
			conn = new WebSocket(
				`wss://mta.tony.place/ws?stopId=${activeStation.stopId}&subwayLine=${subway.group}`
			)
			console.log(activeStation)
			conn.onmessage = function (evt) {
				var messages = evt.data.split('\n')
				let data = JSON.parse(messages)
				upcomingTrains = data.parsedTrains
				console.log(data.parsedTrains)

				//mTime.innerHTML = northbound[0]?.train.timeInMinutes + ' min'
				//bkTime.innerHTML = southbound[0]?.train.timeInMinutes + ' min'
				//mTimeNoDelay.innerHTML = northbound[0]?.train.timeInMinutesNoDelay + ' min'
				//bkTimeNoDelay.innerHTML = southbound[0]?.train.timeInMinutesNoDelay + ' min'
			}
		} catch (error) {
			console.log(error)
		}
	})

	afterUpdate(() => {
		console.log('AFTER UPDATE ACTIVE STATION', activeStation)
	})

	onDestroy(() => {
		console.log(conn)
		conn.close()
	})

	//let south = {
	//	borough: 'Bk',
	//	complexId: '120',
	//	lattitude: '40.717304',
	//	longitude: '-73.956872',
	//	northDirectionLabel: 'Manhattan',
	//	routes: 'L',
	//	southDirectionLabel: 'Canarsie - Rockaway Parkway',
	//	stationId: '120',
	//	stopId: 'L08',
	//	stopName: 'Bedford Av',
	//	subwayLine: 'Canarsie'
	//}

	//let North = {
	//	borough: 'Bk',
	//	complexId: '120',
	//	lattitude: '40.717304',
	//	longitude: '-73.956872',
	//	northDirectionLabel: 'Manhattan',
	//	routes: 'L',
	//	southDirectionLabel: 'Canarsie - Rockaway Parkway',
	//	stationId: '120',
	//	stopId: 'L08',
	//	stopName: 'Bedford Av',
	//	subwayLine: 'Canarsie'
	//}
</script>

<div class="w-full lg:max-w-xs shadow-routes-card rounded-3xl px-4 py-4 lg:px-9 lg:py-10">
	<div class="flex flex-col w-full ">
		<button
			class="self-end"
			on:click={() => {
				activeStation = {}
			}}
		>
			close
		</button>
		<div class="mt-2 lg:mt-4">
			<h1 class="text-lg w-1/2 lg:w-3/5 mb-1">{activeStation.stopName}</h1>
			<img class="w-6 h-6" src={subway.image} alt="subway line" />
		</div>
	</div>

	<div>
		{#if upcomingTrains?.northbound}
			<ul>
				{#each upcomingTrains?.northbound as northbound}
					<li><TimeCard update={northbound} /></li>
				{/each}
			</ul>
		{/if}
		{#if upcomingTrains?.southbound}
			<ul>
				{#each upcomingTrains?.southbound as southbound}
					<li><TimeCard update={southbound} /></li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
