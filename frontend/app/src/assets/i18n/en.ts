const translations = {
	notFound: {
		title: "Oops...",
		description: "Looks like this seed has not been planted yet.",
		cta: "To Dashboard",
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
		testnet: "This app runs on Polygon testnet, you'll need some MATIC in order to interact with the network.",
		faucet: "Get some here",
	},
	navigation: {
		dashboard: "Dashboard",
		plants: "Seeds & Plants",
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
		cta: "Connect wallet",
	},
	about: {
		title: "KOJO",
		description: {
			1: "The water saving NFT-game where you can grow seeds into plants based on your sustainable water consumption.",
			2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
		},
		website: "Visit our project website",
	},
	connect: {
		title: "Connect",
		description: "How would you like to connect to the Kojo Network?",
		email: "with email",
	},
	dashboard: {
		title: "Dashbōard",
		plants: "Your latest plant",
		mint: "It seems you have no plants yet. Mint a seed and start growing!",
		mintCta: "Mint a seed",
		claim: "You don't have any tokens yet. Claim your first 100 $KOJO to start growing a plant.",
		claimCta: "Claim $KOJO",
		description: {
			1: "You are {$}. Let's keep it up this week!",
			2: "saving more water than 60% of your neighbors",
		},
	},
	balance: {
		title: "Balance",
		claim: "Claim $KOJO",
		nextDistribution: "Next distribution of $KOJO happens in...",
	},
	consumption: {
		title: "Cōnsumptiōn",
		description: "Coming soon!",
		empty: "This page is still under construction. Please check back later!",
	},
	plants: {
		title: "Seeds & plants",
		description: "You have {$} NFT(s) in your wallet.",
		detailDescription: "This plant has gotten {$} $KOJO of water from the period it was minted.",
		average: "Of average in your area",
		view: "View water consumption",
		empty: "You don't have any plants yet. Get started by minting a seed.",
		emptyCta: "Mint first seed",
		mint: "Mint some new seeds to grow your urban jungle!",
		mintCta: "Mint a seed",
		hydrate: "Hydrate",
	},
	newSeed: {
		title: "Get some seeds",
		cta: "Mint a new seed",
		noBalance: "You don't have sufficient $KOJO to mint a new seed. Claim your first $KOJO for free or earn some by saving water in your household. {$}",
		price: "One seed only costs 1 $KOJO.",
		success: "You successfully minted a new seed!",
		description: {
			1: "{$} You can mint them here but make sure you have enough $KOJO to take care for them. You currently have {$} NFT(s) in your wallet.",
			2: "Seeds are only 1 $KOJO!",
		},
	},
	settings: {
		title: "Settings",
		connected: "connected",
		disconnect: "Disconnect",
		wallet: "Wallet",
		copy: "Copy address",
		copySuccess: "Address copied!",
		waterMeter: "Water meter",
	},
	notifications: {
		title: "Nōtificatiōns",
		markAsRead: "Mark all as read",
		empty: "No notifications received.",
		description: {
			1: "You have {$}.",
			2: "{$} unread notifications",
		}
	},
	leaderboard: {
		title: "Leaderbōard",
		empty: "No data to compare your performance with other people.",
		description: "You are currently positioned on place {$} in the overall ranking.",
		stats: "Your statistics",
		level: "Level",
		xp: "XP points",
		plants: "Plant token ID's",
		plantsEmpty: "no plants yet",
		ranking: "Leaderboard ranking",
		address: "Polygon address",
		nextLevel: "of level completed",
	},
	stats: {
		health: "Health",
		growth: "Growth phase",
		hydration: "Hydration",
		waterNeeded: "Water needed",
	},
	hydrate: {
		title: "Hydrate your plant",
		description: "You have {$} $KOJO to hydrate this plant.",
		cta: "Give some water!",
		amount: "Amount of $KOJO",
		insufficient: "You don't have enough $KOJO to give your plant this amount of water!",
		success: "You hydrated your plant '{$}' with {$} $KOJO.",
	},
	growth: {
		1: "Still a seed",
		2: "The first leaves",
		3: "Halfway there",
		4: "Flowering",
		5: "Fully grown",
	},
	health: {
		1: "In bad shape",
		2: "In good shape",
		3: "Perfectly healthy",
	},
	network: {
		connection: "You are currently connected to the {$} blockchain network.",
	},
	footer: {
		title: "With {$} for water, nature and planet."
	},
	tokens: {
		title: "Balance",
		claim: "Claim $KOJO",
		nextClaim: "Next distribution of $KOJO happens in",
		nextClaimEmpty: "a few seconds",
		disclaimer: "This can change according to the current block time.",
	},
	claim: {
		title: "Claim $KOJO",
		description: "You can claim a total amount of {$} $KOJO this time.",
		amount: "Claimable amount",
		success: "You successfully claimed {$} $KOJO!",
		empty: "You can't claim any $KOJO right now. Please come back later",
		cta: "Claim $KOJO"
	},
};

export default translations;
