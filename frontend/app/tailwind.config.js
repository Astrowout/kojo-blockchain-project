module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				'sans': ['Plus Jakarta Sans', 'ui-sans-serif', 'sans-serif'],
				'serif': ['Abhaya Libre', 'ui-serif', 'serif'],
			},
			fontSize: {
				'2xs': '0.625rem',
			}
		},
	},
	plugins: [],
}
