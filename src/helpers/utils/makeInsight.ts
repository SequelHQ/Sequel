import { getInsightsAssestment } from "src/modules/whoop/LLMLogic";
import { handleStoreInsights } from "../storage";

export const makeInsight = async (moduleName: string, data: string) => {
	if (!data) return
	try {
		const result = await getInsightsAssestment(moduleName, data)
		if (!result) return
		handleStoreInsights(result, moduleName)
	} catch (e) {
		console.error(e, "error making insight")
	}
};
