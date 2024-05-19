import MarkdownPreview from "@uiw/react-markdown-preview";
import { convertLatexInMarkdown } from "src/components/chat/MessageItem";

export const InsightItem = ({ label, data, dateCreated }: { label: string; data: any; dateCreated?: string }): JSX.Element => {

	let newLabel = label
	if (label === "files") {
		newLabel = "Labs"
	}
	return (
		<div className="flex flex-col h-auto bg-[rgba(40,40,40,0.58)] mb-6 rounded-2xl shadow-sm border-gray-700 w-full p-4">
			<p className="text-white font-bold text-2xl mb-2 capitalize">{newLabel}</p>
			<p className="text-white font-medium text-base mb-8">{dateCreated}</p>
			<MarkdownPreview
				wrapperElement={{
					"data-color-mode": "light",
				}}
				source={convertLatexInMarkdown(data)}
				style={{
					background: "transparent",
					color: "#C9C9D5",
					textAlign: "left",
					fontWeight: "400",
					fontSize: 18,
					fontFamily: "Satoshi",
				}}
			/>
		</div>
	);
};
  