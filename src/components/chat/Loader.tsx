import { useEffect, useState } from "react";

const LOADING_STATES = [
	"Analyzing request...",
	"Accessing files...",
	"Generating response...",
];

interface LoaderProps {
  loadingMessage?: string;
}

const Loader = ({ loadingMessage }: LoaderProps) => {
	const [currentState, setCurrentState] = useState<string>(LOADING_STATES[0]);
	useEffect(() => {
		if (!loadingMessage) {
			setTimeout(() => {
				setCurrentState(LOADING_STATES[1]);
			}, 5000);
			setTimeout(() => {
				setCurrentState(LOADING_STATES[2]);
			}, 10000);
		}
	}, []);

	return (
		<div className="flex items-end mt-4 max-w-[70%] gap-[5px] animate-pulse rounded-3xl border border-[#d5d9dc]">
			<div className="p-3 system-message flex items-center gap-1 text-white">
				{loadingMessage || currentState}
				<svg
					width="30"
					height="16"
					viewBox="0 0 5 30"
					xmlns="http://www.w3.org/2000/svg"
					fill="#403DEC"
				>
					<circle cx="15" cy="15" r="15">
						<animate
							attributeName="r"
							from="15"
							to="15"
							begin="0s"
							dur="0.8s"
							values="15;9;15"
							calcMode="linear"
							repeatCount="indefinite"
						/>
						<animate
							attributeName="fill-opacity"
							from="1"
							to="1"
							begin="0s"
							dur="0.8s"
							values="1;.5;1"
							calcMode="linear"
							repeatCount="indefinite"
						/>
					</circle>
				</svg>
			</div>
		</div>
	);
};

export default Loader;
