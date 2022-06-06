const translations = {
	notFound: {
		title: "Oops...",
		description: "Looks like this seed has not been planted yet.",
		cta: "To my dashboard",
	},
	messages: {
		loginSuccess: "You are successfully logged in!",
	},
	errors: {
		noWeb3: "No Ethereum wallet was detected.",
		general: "Oops, something went wrong on our side. Please try again later.",
		wrongNetwork: "You can only connect to the Polygon testnet. Please switch to the mumbai network.",
	},
	buttons: {
		close: "Close",
	},
	general: {
		loading: "Loading...",
		testnet: "This app runs on Polygon testnet, you'll need some MATIC in order to interact with the network. {$}.",
		faucet: "Get some here",
	},
	navigation: {
		dashboard: "My dashboard",
		plants: "My plants",
		consumption: "Consumption",
		leaderboard: "Leaderboard",
		notifications: "Notifications",
		settings: "Settings",
	},
	onboarding: {
		title: "Welcome to kojo",
		description: {
			1: "The {$} where you can grow seeds into plants based on your {$}",
			2: "water saving NFT-game",
			3: "sustainable water consumption.",
		},
		cta: "Connect my wallet",
	},
	about: {
		title: "About the kojo project",
		description: {
			1: "The water saving NFT-game where you can grow seeds into plants based on your sustainable water consumption.",
			2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
		},
		website: "Visit our project website",
	},
	connect: {
		title: "Connect",
		description: "Choose your connection method",
		email: "Login with email",
	},
	dashboard: {
		title: "My dashboard",
		plants: "Your latest plant",
		mint: "Mint a new seed to grow a new plant",
		mintCta: "Mint a seed",
		claim: "You don't have any tokens yet. Claim your first tokens to start growing some beautiful plants.",
		claimCta: "Claim my tokens",
		description: {
			1: "You are {$}. Let's keep it up this week!",
			2: "saving more water than 60% of your neighbors",
		},
	},
	balance: {
		title: "My kojo balance",
		claim: "Claim my kojos",
		nextDistribution: "Next distribution of kojos happens in...",
	},
	consumption: {
		title: "My water consumption",
		description: "Coming soon!",
		empty: "This page is still on our roadmap. Coming soon to your kojo app ✌️",
	},
	plants: {
		title: "My seeds & plants",
		description: "You have {$} NFT(s) in your wallet.",
		detailDescription: "This plant has gotten {$} kojos of water from the period it was minted.",
		average: "Of average in your area",
		view: "View my water consumption",
		empty: "You don't have any plants yet. Get started by minting a seed.",
		emptyCta: "Mint my first seed",
		mint: "Mint some new seeds to grow your urban jungle!",
		mintCta: "Mint a seed",
		hydrate: "Hydrate",
	},
	newSeed: {
		title: "Get some seeds",
		cta: "Mint a new seed",
		noBalance: "You don't have sufficient kojos to mint a new seed. Claim your first kojos for free or earn some by saving water in your household. {$}",
		price: "One seed only costs 1 kojo.",
		success: "You successfully minted a new seed!",
		description: {
			1: "{$} You can mint them here but make sure you have enough kojos to take care for them. You currently have {$} NFT(s) in your wallet.",
			2: "Seeds are only 1 kojo!",
		},
	},
	settings: {
		title: "Settings",
		connected: "connected",
		disconnect: "Disconnect",
		wallet: "My wallet",
		copy: "Copy my address",
		copySuccess: "Successfully copied your address!",
		waterMeter: "My digital water meter",
	},
	notifications: {
		title: "Notifications",
		markAsRead: "Mark all as read",
		empty: "No notifications received.",
		description: {
			1: "You have {$}.",
			2: "{$} unread notifications",
		}
	},
	leaderboard: {
		title: "Leaderboard",
		empty: "No data to compare your performance with other people.",
		description: "You are currently positioned on place {$} in the overall ranking.",
	},
	stats: {
		health: "Health",
		hydration: "Hydration",
		waterNeeded: "Water needed",
	},
	hydrate: {
		title: "Hydrate your plant",
		description: "You have {$} kojos to hydrate this plant.",
		cta: "Give some water!",
		amount: "Amount of tokens",
		success: "You hydrated your plant '{$}' with {$} kojos.",
	},
	health: {
		0: "In bad shape",
		1: "Normal",
		2: "In good shape",
		3: "In perfect shape",
	},
	network: {
		connection: "You are currently connected to the {$} blockchain network.",
	},
	footer: {
		title: "With {$} for water and our nature."
	},
	tokens: {
		title: "My kojo balance",
		claim: "Claim my kojos",
		nextClaim: "Next distribution of kojos happens in...",
		minutes: "{$} minutes",
		disclaimer: "This can change according to the current block time.",
		blocks: "{$} blocks",
	},
	claim: {
		title: "Claim kojos",
		description: "You can claim a total amount of {$} kojos this time.",
		amount: "Claimable amount",
		success: "You successfully claimed {$} kojos!",
		empty: "You can't claim any kojos right now. Please come back later",
		cta: "Claim my kojos"
	},
};

export default translations;
