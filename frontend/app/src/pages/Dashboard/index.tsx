import { useContext } from "react";
import {
	Button,
	EmptyState,
	Layout,
	PlantCard,
	PlayerStats,
	StatType,
	Tokens,
} from "../../components";
import { SessionContext } from "../../context";
import { useTranslation } from "../../hooks";

const DashboardPage = () => {
	const {
		balance,
		plants,
		participant,
		ranking,
	} = useContext(SessionContext);
	const { t, ts } = useTranslation();

	const latestPlant = plants ? plants[plants?.length - 1] : undefined;

	const data: StatType[] = [
		{
			label: t("leaderboard.level"),
			value: `${participant?.level || 1}`,
		},
		{
			label: t("leaderboard.xp"),
			value: `${participant?.experiencePoints || 0}`,
		},
		{
			label: t("leaderboard.plants"),
			value: !!participant?.plantIds?.length ? `${participant?.plantIds?.join(", ")}` : ts("leaderboard.plantsEmpty"),
		},
		{
			label: t("leaderboard.ranking"),
			value: `${ranking || "/"}`,
		},
	];

	return (
		<Layout
			title={t("dashboard.title")}
			description={t("dashboard.description.1", <b className="font-bold">{t("dashboard.description.2")}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<Tokens compact={false} />

				{!balance && (
					<EmptyState
						message={t("dashboard.claim")}
						icon="KojoToken"
					>
						<Button
							url="/claim"
							compact
						>
							{t("dashboard.claimCta")}
						</Button>
					</EmptyState>
				)}

				<PlayerStats
					title={t("leaderboard.stats")}
					data={data}
				/>

				<div className="xl:col-span-2 grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
					<div className="lg:col-span-2">
						<h2 className="font-bold text-lg md:text-xl lg:text-2xl mb-4">
							{ t("dashboard.plants") }
						</h2>

						{latestPlant ? (
							<div className="grid lg:grid-cols-2">
								<PlantCard
									id={latestPlant.id}
									type={latestPlant.type}
									waterNeeded={latestPlant.waterNeeded}
									growth={latestPlant.growth}
									hydration={latestPlant.hydration}
									image={latestPlant.image}
								/>
							</div>
						) : (
							<EmptyState
								message={t("dashboard.mint")}
								icon="Seeds"
							>
								<Button
									url="/new-seed"
									compact
								>
									{t("dashboard.mintCta")}
								</Button>
							</EmptyState>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default DashboardPage;
