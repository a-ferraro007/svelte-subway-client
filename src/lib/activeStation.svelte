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
				`wss://mta.tony.place/ws?stopID=${activeStation.stopID}&subwayLine=${subway.group}`
			)
			console.log(activeStation)
			conn.onmessage = function (evt) {
				var messages = evt.data.split('\n')
				let data = JSON.parse(messages)
				console.log(data)
				upcomingTrains = data.parsedTrains
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

<div class="w-full lg:max-w-xs rounded-xl ">
	<div class="flex flex-col w-full ">
		<button
			class="self-end"
			on:click={() => {
				activeStation = {}
			}}
		>
			<svg
				width="13"
				height="14"
				viewBox="0 0 13 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1.5 1L6.5 6.55556M11.5 12.1111L6.5 6.55556M6.5 6.55556L11.5 1M6.5 6.55556L1.5 12.1111"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		</button>
		<div class="mb-4 mt-2 p-2 rounded-md bg-white">
			<h1 class="text-lg w-1/2 lg:w-3/5 mb-1 text-[#4a4a4a]  font-bold">
				{activeStation.stopName}
			</h1>
			<img class="w-6 h-6" src={subway.image} alt="subway line" />
		</div>
	</div>

	<!--<div class="px-2">-->
	<div class="lg:max-h-station-listing">
		{#if upcomingTrains?.northbound}
			<div class="rounded-md bg-white p-3 mb-4 ">
				<span class="block  text-xs text-[#4a4a4a]  font-extrabold"
					>{activeStation.northDirectionLabel}</span
				>
				<span
					class="block w-full mb-2 border-t-spacer border-black opacity-10 gray-400 border-solid my-2"
				/>
				<ul>
					{#each upcomingTrains?.northbound.slice(0, 3) as northbound}
						<li class="">
							<!--class="border-t-1 border-gray-400 first:border-t-0">-->
							<TimeCard
								update={northbound}
								label={activeStation.northDirectionLabel}
								image={subway.image}
							/>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if upcomingTrains?.southbound}
			<div class="rounded-md bg-white p-3 ">
				<span class="block  text-xs text-[#4a4a4a]  font-extrabold"
					>{activeStation.southDirectionLabel}</span
				>
				<span
					class="block w-full border-t-spacer border-black opacity-10 gray-400 border-solid my-2"
				/>
				<ul>
					{#each upcomingTrains?.southbound.slice(0, 3) as southbound}
						<li class="">
							<!--</li>class="border-t-1 border-gray-400">-->
							<TimeCard
								update={southbound}
								label={activeStation.southDirectionLabel}
								image={subway.image}
							/>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
	<!--</div>-->
</div>
