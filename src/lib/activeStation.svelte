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
				`ws://localhost:8080/ws?stopId=${activeStation.stopId}&subwayLine=${subway.group}`
			)
			console.log(activeStation)
			conn.onmessage = function (evt) {
				var messages = evt.data.split('\n')
				let data = JSON.parse(messages)
				upcomingTrains = data.parsedTrains
				console.log(data.parsedTrains)
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
</script>

<div class="w-full lg:max-w-xs shadow-routes-card rounded-3xl px-4 py-4 lg:px-4 lg:py-4">
	<div class="flex flex-col w-full ">
		<button
			class="self-end"
			on:click={() => {
				activeStation = {}
			}}
		>
			<img class="w-5 h-5" src="close.svg" alt="close active station" />
		</button>
		<div class="mb-8 mt-2 lg:mt-4">
			<h1 class="text-lg w-1/2 lg:w-3/5 mb-1 font-bold">{activeStation.stopName}</h1>
			<img class="w-6 h-6" src={subway.image} alt="subway line" />
		</div>
	</div>

	<div class="px-2">
		<span class="block mb-1 text-sm text-gray-400 font-medium"> Next Trains</span>
		<span class="block w-full border-t-spacer border-gray-400 border-solid" />

		<div class="max-h-base-card-m lg:max-h-station-listing overflow-scroll">
			{#if upcomingTrains?.northbound}
				<ul>
					{#each upcomingTrains?.northbound as northbound}
						<li class="border-t-1 border-gray-400 first:border-t-0">
							<TimeCard
								update={northbound}
								label={activeStation.northDirectionLabel}
								image={subway.image}
							/>
						</li>
					{/each}
				</ul>
			{/if}
			{#if upcomingTrains?.southbound}
				<ul>
					{#each upcomingTrains?.southbound as southbound}
						<li class="border-t-1 border-gray-400">
							<TimeCard
								update={southbound}
								label={activeStation.southDirectionLabel}
								image={subway.image}
							/>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
