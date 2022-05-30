import {
	Chart,
	EmptyState,
	Layout,
} from "../../components";
import { useTranslation } from "../../hooks";

const LeaderboardPage = () => {
	const { t } = useTranslation();

	const position: number = 3;

	return (
		<Layout
			title={t("leaderboard.title")}
			description={t("leaderboard.description", <b className="font-mono bg-emerald-900 rounded px-1.5 py-0.5">{position}</b>)}
			withOverlap={false}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<div className="u-card flex justify-center">
					<Chart
						progress={30}
					>
						Test
					</Chart>
				</div>

				<EmptyState
					message={t("leaderboard.empty")}
					icon="Medal"
					className="row-start-2 col-span-2"
				/>
			</div>
		</Layout>
	)
}

export default LeaderboardPage;
