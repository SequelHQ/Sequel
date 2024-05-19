import {
	getInsightsData
} from "src/helpers/storage";
import { InsightItem } from "./InsightCard";


const Insights = () => {
	const insights = getInsightsData()

	return (
		<div className="ml-4 bg-transparent flex h-[calc(100vh-64px)]">
			<div className="bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-1 flex-col items-start p-12 gap-2 overflow-x-hidden shadow-[0px_2px_14px_0px_rgba(0,0,0,0.05)]">
				<div className="font-bold text-2xl text-white mb-8">
                Insights
				</div>
				{insights?.length ? insights.map((item: { moduleName: string; data: string; dateCreated?: string }, index: number) => (
					item.data ? <InsightItem key={`${item.moduleName}-${index}`} label={item.moduleName} data={item.data} dateCreated={item.dateCreated} /> : null
				)) : <p className="font-base text-xl text-white">No insights for now.</p>}
			</div>
		</div>
	);
};

export default Insights;
