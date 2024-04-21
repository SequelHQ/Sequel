import classNames from "classnames";
import OuraTag from "src/components/chat/OuraTag";
import Spinner from "src/components/spinner";

type Props = {
  show: boolean;
  dataTypes: {
    label: string;
    isFetched: boolean;
  }[];
  dataLoading: boolean;
};

const DataMenu = ({ show, dataLoading, dataTypes }: Props) => {
	return (
		<div
			className={classNames(
				"transition-all duration-300 flex flex-col bg-[rgba(0,0,0,0.30)] rounded-3xl",
				{
					"opacity-0 w-[0px] overflow-hidden p-0": !show,
					"w-[220px] p-4 h-[calc(100vh-64px)] ml-4 pr-2": show,
				}
			)}
		>
			<header className="flex items-center justify-between mb-4">
				<div className="flex items-center justify-center text-lg text-[#C9C9D5] font-semibold w-full gap-4 relative">
          Your data
					{dataLoading && (
						<div className="flex justify-center absolute right-4">
							<Spinner />
						</div>
					)}
				</div>
			</header>
			<div className="flex flex-col items-center max-h-full overflow-y-auto overflow-x-hidden">
				{dataTypes.map((type, index) => (
					<OuraTag label={type.label} key={index} isFetched={type.isFetched} />
				))}
			</div>
		</div>
	);
};

export default DataMenu;
