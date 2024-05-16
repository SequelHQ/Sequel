import { Badge } from "src/components/ui/badge";
import { OrganDetailsType } from "./OrgansObj";

const statusToColorMap: Record<string, string> = {
	"Healthy": "bg-green-400 text-black font-bold w-1/4 ml-2",
	"Moderate": "bg-yellow-300 text-black font-bold w-1/4 ml-2",
	"Unhealthy": "bg-red-400 text-black font-bold w-1/4 ml-2",
	"Unsure": "bg-gray-400 text-black font-bold w-1/4 ml-2"
};

export const OrganCard = ({ organData }: { organData: OrganDetailsType }): JSX.Element => {
	
	return (
		<div className="flex flex-col h-auto bg-[rgba(40,40,40,0.58)] mb-3 rounded-2xl shadow-sm border-gray-700 w-[48%] p-4">
			<div className="flex items-center mb-2">
				<p className="text-white font-bold text-2xl capitalize">
					{organData.display_name}
				</p>
				{organData.status !== "Unsure" && (
					<Badge className={statusToColorMap[organData.status]}>{organData.status}</Badge>
				)}
			</div>
			{
				organData.status === "Unsure" ? (
					<p className="text-slate-400 mt-1">Not enough data</p>
				)  : null
			}
			{
				organData.status !== "Unsure" && (
					<p className="text-sm font-semibold text-slate-300 mt-1">{organData.reason}</p>
				)
			}
			{
				(
					<div className="mt-4">
						<p className="text-sm font-bold text-white">Tests you can take:</p>
						<div className="mt-2 flex flex-wrap gap-2">
							{organData.tests.map((test, index) => (
								<span key={index} className="inline-block bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full">
									{test}
								</span>
							))}
						</div>
					</div>
				)
			}
		</div>
	);
};
  