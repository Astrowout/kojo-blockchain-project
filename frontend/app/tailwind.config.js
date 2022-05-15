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
				'sans': ['Poppins', 'ui-sans-serif'],
				'serif': ['Abhaya Libre', 'ui-serif'],
			},
		},
	},
	plugins: [],
}
