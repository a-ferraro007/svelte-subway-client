<script>
	import { afterUpdate } from 'svelte'

	export let update
	export let label
	export let image
	let classNames = 'h-full w-full py-2 '
	console.log(update)
	console.log(image)

	afterUpdate(() => {
		if (update.train.timeInMinutes == 0 && !classNames.includes('animate-pulse')) {
			classNames = classNames.concat('animate-pulse')
		}
	})
</script>

<div class={classNames}>
	<div class="flex flex-row gap-3 w-full">
		<img class="w-6 h-6" src={image} alt="subway line" />
		<span class=" text-xs self-center w-1/2 font-semibold text-[#4a4a4a]">
			{label}
		</span>
		<span class="flex justify-end flex-grow text-xs self-center font-semibold text-[#4a4a4a]">
			{update.train.timeInMinutes == 0 ? 'now' : update.train.timeInMinutes + ' min'}</span
		>
	</div>
</div>
