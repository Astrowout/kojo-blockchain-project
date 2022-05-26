import {
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
			<div className="flex flex-col flex-grow">
				<EmptyState
					message={t("leaderboard.empty")}
					icon="Medal"
				/>
			</div>
		</Layout>
	)
}

export default LeaderboardPage;
