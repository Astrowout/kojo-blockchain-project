import { useContext } from "react";
import {
	Button,
	EmptyState,
	Layout,
	PlantCard,
	Tokens,
} from "../../components";
import { SessionContext } from "../../context";
import { useTranslation } from "../../hooks";

const DashboardPage = () => {
	const {
		balance
	} = useContext(SessionContext);
	const { t } = useTranslation();

	const plant = {
		id: "uuid-1",
		type: "Purple Haze Sativa",
		waterNeeded: 2,
		health: 3,
		hydration: 80,
		image: "https://images.unsplash.com/photo-1458014854819-1a40aa70211c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
	};

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

				<div className="xl:col-span-2 grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
					<div className="lg:col-span-2">
						<h2 className="font-bold text-lg md:text-xl lg:text-2xl mb-4">
							{ t("dashboard.plants") }
						</h2>

						{plant ? (
							<div className="grid lg:grid-cols-2">
								<PlantCard
									id={plant.id}
									type={plant.type}
									waterNeeded={plant.waterNeeded}
									health={plant.health}
									hydration={plant.hydration}
									image={plant.image}
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
