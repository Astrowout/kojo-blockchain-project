import { IonContent, IonPage } from "@ionic/react";
import { Button } from "../../components";
import { useTranslation } from "../../hooks";

const NotFoundPage = () => {
	const { t } = useTranslation();

	return (
		<IonPage>
			<IonContent fullscreen>
				<section className="2xl:container flex items-center justify-center px-4 sm:px-8 h-full">
					<div className="flex flex-col items-center max-w-prose text-center">
						<h1 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl text-emerald-900">
							{ t("notFound.title") }
						</h1>

						<p className="text-gray-400 text-xl mt-3">
							{ t("notFound.description") }
						</p>

						<Button
							url="/dashboard"
							className="mt-10"
						>
							{ t("notFound.cta") }
						</Button>
					</div>
				</section>
			</IonContent>
		</IonPage>
	)
}

export default NotFoundPage;
