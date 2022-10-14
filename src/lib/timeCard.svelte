<script>
	export let update
	export let label
	export let image
	console.log(update)
	console.log(image)
</script>

<div class="h-full w-full py-2">
	<div class="flex flex-row gap-3 w-full">
		<img class="w-6 h-6" src={image} alt="subway line" />
		<span class=" text-xs self-center w-1/2 font-semibold text-[#4a4a4a]">
			{label}
		</span>
		<span class="flex justify-end flex-grow text-xs self-center pr-3 font-semibold text-[#4a4a4a]">
			{update.train.timeInMinutes + 'min'}</span
		>
	</div>
</div>
