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
import { Plant } from "../../types";

const PlantsPage = () => {
	const { t } = useTranslation();
	const {
		participant,
		plants,
	} = useContext(SessionContext);

	return (
		<Layout
			title={t("plants.title")}
			description={t("plants.description", <b className="font-bold">{participant?.plantIds?.length || 0}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-12 w-full">
				<Tokens />

				{plants && !!plants.length && (
					<EmptyState
						message={t("plants.mint")}
						compact
					>
						<Button
							url="/new-seed"
							compact
						>
							{t("plants.mintCta")}
						</Button>
					</EmptyState>
				)}

				<div className="xl:col-span-2 w-full">
					{plants && !!plants.length ? (
						<div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
							{plants.map((plant: Plant) => (
								<PlantCard
									key={plant.id}
									id={plant.id!}
									type={plant.type!}
									waterNeeded={plant.waterNeeded}
									growth={plant.growth}
									hydration={plant.hydration}
									image={plant.image!}
								/>
							))}
						</div>
					) : (
						<EmptyState
							message={t("plants.empty")}
							icon="Seeds"
						>
							<Button
								url="/new-seed"
								compact
							>
								{t("plants.emptyCta")}
							</Button>
						</EmptyState>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default PlantsPage;
