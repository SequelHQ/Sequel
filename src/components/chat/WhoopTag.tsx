import { ReactComponent as WhoopIcon } from "src/assets/icons/whoop-logo.svg";

type Props = {
  label: string;
  isFetched: boolean;
};

const WhoopTag = ({ label, isFetched }: Props) => {
	return (
		<div
			className={`flex mr-2 w-full items-start gap-2 bg-[rgba(40,40,40,0.58)] p-3 pl-4 pr-[18px] rounded-xl mb-2 whitespace-nowrap shadow-sm`}
		>
			<WhoopIcon />
			<div className="w-full items-center text-center justify-center cursor-default">
				<div className="text-center">
					<div className="text-[#F1F1F1] font-medium truncate text-ellipsis">
						{label}
					</div>
				</div>
				<p className="text-xs text-gray-100">
					{isFetched ? "Data ready" : "Data not ready"}
				</p>
			</div>
		</div>
	);
};

export default WhoopTag;
