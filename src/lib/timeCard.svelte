<script>
	export let update
	export let label
	export let image
	console.log(update)
	console.log(image)
</script>

<div class="h-full w-full py-4">
	<div class="flex flex-row gap-3 w-full">
		<img class="w-7 h-7" src={image} alt="subway line" />
		<span class=" text-xs self-center w-1/2">
			{label}
		</span>
		<span class="flex justify-end flex-grow text-xs self-center pr-3">
			{update.train.timeInMinutes + 'min'}</span
		>
	</div>
</div>
