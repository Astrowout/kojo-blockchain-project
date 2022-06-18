module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			'display': ['Montserrat'],
			'sans': ['Lexend Deca', 'ui-sans-serif', 'sans-serif'],
			'text': ['PT Mono']
		},
		container: {
			center: true,
		},
		extend: {
			colors: {
				'kojo': '#0B9669',
				'kojo-light': "#0EC98E",
				'background': '#F8F6F2',
				'border': '#EBE6DF',
				'border-dark': "#CFCAC4",
				"border-darkest": "#6E6B68"
			},
			fontSize: {
				"2xs": "0.625rem",
			}
		},
	},
	plugins: [],
}
