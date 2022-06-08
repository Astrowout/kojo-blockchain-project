import { useContext } from "react";
import {
	Chart,
	EmptyState,
	Layout,
	Leaderboard,
	PlayerStats,
	StatType,
} from "../../components";
import { SessionContext } from "../../context";
import { useTranslation } from "../../hooks";

const LeaderboardPage = () => {
	const { t } = useTranslation();
	const {
		participant,
		ranking,
		participants,
	} = useContext(SessionContext);

	const progress = (100 * (participant && participant.experiencePoints ? participant.experiencePoints : 0)) / 400;

	const data: StatType[] = [
		{
			label: t("leaderboard.level"),
			value: `${participant?.level} / 3`,
		},
		{
			label: t("leaderboard.xp"),
			value: `${participant?.experiencePoints}`,
		},
		{
			label: t("leaderboard.plants"),
			value: !!participant?.plantIds?.length ? `${participant?.plantIds?.join(", ")}` : '/',
		},
		{
			label: t("leaderboard.ranking"),
			value: `${ranking}`,
		},
	];

	return (
		<Layout
			title={t("leaderboard.title")}
			description={t("leaderboard.description", <b className="font-mono bg-emerald-900 rounded px-1.5 py-0.5">{ranking}</b>)}
			withOverlap={false}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<div className="u-card flex justify-center">
					<Chart
						progress={progress}
					>
						{ t("leaderboard.nextLevel") }
					</Chart>
				</div>

				<PlayerStats
					title={t("leaderboard.stats")}
					data={data}
				/>

				{!!participants.length ? (
					<Leaderboard
						data={participants}
						className="xl:row-start-2 xl:col-span-2"
					/>
				) : (
					<EmptyState
						message={t("leaderboard.empty")}
						icon="Ranking"
						className="xl:row-start-2 xl:col-span-2"
					/>
				)}
			</div>
		</Layout>
	)
}

export default LeaderboardPage;
