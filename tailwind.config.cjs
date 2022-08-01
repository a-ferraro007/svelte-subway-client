/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderWidth: {
				1: '1px',
				spacer: '.5px'
			},
			boxShadow: {
				'routes-card': '0px 1px 4px rgba(0, 0, 0, 0.6);'
			},
			maxWidth: {
				'routes-card': '600px'
			},
			height: {
				'routes-card': '450px'
			},
			minHeight: {
				'routes-card': '285px'
			},
			maxHeight: {
				'station-listing': '400px;',
				'base-card-m': '200px'
			},
			backgroundColor: {
				A: '#0039a6',
				C: '#0039a6',
				E: '#0039a6',
				B: '#ff6319',
				D: '#ff6319',
				F: '#ff6319',
				M: '#ff6319',
				G: '#6cbe45',
				J: '#996633',
				Z: '#996633',
				L: '#a7a9ac',
				N: '#fccc0a',
				Q: '#fccc0a',
				R: '#fccc0a',
				W: '#fccc0a',
				1: '#ee352e',
				2: '#ee352e',
				3: '#ee352e',
				4: '#00933c',
				5: '#00933c',
				6: '#00933c',
				7: '#b933ad',
				S: '#808183'
			}
		}
	},
	plugins: []
}
