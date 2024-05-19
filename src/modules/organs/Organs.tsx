import {
	getOrgans
} from "src/helpers/storage";
import { OrganCard } from "./OrganCard";

const Organs = () => {
	const organs = getOrgans()

	return (
		<div className="ml-4 bg-transparent flex h-[calc(100vh-64px)]">
			<div className="bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-1 flex-col items-start p-12 gap-2 overflow-x-hidden shadow-[0px_2px_14px_0px_rgba(0,0,0,0.05)]">
				<div className="font-bold text-2xl text-white mb-8">
                Organs
				</div>
				{Object.values(organs).length ? (
					<div className="flex flex-wrap flex-row gap-4">
						{Object.entries(organs).map(([key, value]) => {
							return <OrganCard key={key} organData={value} />
						})}
					</div>
				) : <p className="font-base text-xl text-white">No organs data available.</p>}
			</div>
		</div>
	);
};

export default Organs;
