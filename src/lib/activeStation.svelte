<script>
	import { afterUpdate, onMount, onDestroy } from 'svelte'

	export let activeStation
	export let subway
	console.log(subway.train)
	let conn

	onMount(() => {
		try {
			conn = new WebSocket(
				`wss://mta.tony.place/ws?stopId=${activeStation.stopId}&subwayLine=${subway.train}`
			)
			console.log(activeStation)
			conn.onmessage = function (evt) {
				var messages = evt.data.split('\n')
				let data = JSON.parse(messages)
				const { northbound, southbound } = data.parsedTrains
				console.log({ northbound, southbound })

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
		console.log(activeStation)
	})

	onDestroy(() => {
		console.log('destory')
		conn.close()
	})

	console.log('tetst')
</script>

<div>{activeStation.stopName}</div>
