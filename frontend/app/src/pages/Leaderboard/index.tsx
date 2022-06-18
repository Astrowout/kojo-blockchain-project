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
			description={t("leaderboard.description", <b className="font-mono bg-border rounded px-1.5 py-0.5">{ranking}</b>)}
			withOverlap={false}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-8 w-full">
				<div className="flex items-center justify-center bg-background border border-border p-8">
					<Chart
						progress={participant.progress || 0}
					>
						{`${data[0]?.label} ${data[0]?.value}`}
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
						className="xl:row-start-2 xl:col-span-2  min-h-[40rem]"
					/>
				)}
			</div>
		</Layout>
	)
}

export default LeaderboardPage;
