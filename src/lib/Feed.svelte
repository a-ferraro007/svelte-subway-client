<script>
	import TimeCard from './timeCard.svelte'
	export let update
	export let station
	export let subway

	const combinedAndSorted = [...update.northbound, ...update.southbound].sort(
		(a, b) => a.train.timeInMinutes - b.train.timeInMinutes
	)

	console.log([...update.northbound, ...update.southbound])
	//console.log(combined)
</script>

<div class="max-h-base-card-m lg:max-h-station-listing overflow-scroll">
	{#if combinedAndSorted.length > 0}
		<ul>
			{#each combinedAndSorted as train}
				<li class="border-t-1 border-gray-400 first:border-t-0">
					<TimeCard
						update={train}
						label={train.direction}
						image={`${subway.train.toUpperCase()}.svg`}
					/>
				</li>
			{/each}
		</ul>
	{/if}
	<!--{#if upcomingTrains?.southbound}
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
	{/if}-->
</div>
