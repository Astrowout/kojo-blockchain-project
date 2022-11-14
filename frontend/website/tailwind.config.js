module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			'sans': ['Lexend Deca', 'ui-sans-serif', 'sans-serif'],
			'mono': ['PT Mono', 'ui-mono', 'mono'],
			'display': ['Montserrat Black'],
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
