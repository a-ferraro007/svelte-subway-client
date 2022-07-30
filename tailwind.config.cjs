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
			maxHeight: {
				'routes-card': '450px',
				'station-listing': '75%;'
			}
		}
	},
	plugins: []
}
