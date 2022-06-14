module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			'sans': ['Plus Jakarta Sans', 'ui-sans-serif', 'sans-serif'],
			'serif': ['Abhaya Libre', 'ui-serif', 'serif'],
			'display': ['Montserrat Black'],
			'title': ['Lexend Deca'],
			'text': ['PT Mono']
		},
		container: {
			center: true,
		},
		extend: {
			colors: {
				'kojo': '#0B9669',
				'background': '#F8F6F2'
			}
		},
	},
	plugins: [],
}
