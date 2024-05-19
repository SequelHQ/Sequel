import { getOrganHealthAssessment } from "src/modules/whoop/LLMLogic";
import { ORGANS_DATA } from "src/modules/organs/OrgansObj";
import { storeOrgans } from "../storage";
type OrganKey = keyof typeof ORGANS_DATA;

export const makeOrgans = async () => {
	try {
		const jsonData = await getOrganHealthAssessment();

		// Create a new object by merging
		//@ts-ignore
		const newData: Record<OrganKey, any> = {}
		for (const organ of Object.keys(ORGANS_DATA)) {
			if (Object.prototype.hasOwnProperty.call(jsonData, organ)) {
				//@ts-ignore
				newData[organ] = {
					status: jsonData[organ].status,
					reason: jsonData[organ].reason,
					//@ts-ignore
					display_name: ORGANS_DATA[organ].display_name,
					//@ts-ignore
					tests: ORGANS_DATA[organ].tests
				};
			} else {
				//@ts-ignore
				newData[organ] = ORGANS_DATA[organ]
			}
		}
		storeOrgans(newData);
	} catch (e) {
		console.error(e, "error making organs insight");
	}
};

