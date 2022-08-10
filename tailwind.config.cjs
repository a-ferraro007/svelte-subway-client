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
				'routes-card': '0px 0px 4px rgba(0, 0, 0, 0.6);'
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
				ONE: '#ee352e',
				TWO: '#ee352e',
				THREE: '#ee352e',
				FOUR: '#00933c',
				FIVE: '#00933c',
				SIX: '#00933c',
				SEVEN: '#b933ad',
				S: '#808183'
			}
		},
		theme: {
			colors: {
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
				ONE: '#ee352e',
				TWO: '#ee352e',
				THREE: '#ee352e',
				FOUR: '#00933c',
				FIVE: '#00933c',
				SIX: '#00933c',
				SEVEN: '#b933ad',
				S: '#808183'
			}
		}
	},
	plugins: []
}
