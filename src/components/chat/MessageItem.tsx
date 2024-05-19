import classNames from "classnames";
import MarkdownPreview from "@uiw/react-markdown-preview";
/* @ts-ignore */
import katex from "katex";
import "./katex-dist/katex.css";

type Props = {
  message: {
    message: string;
    isSent: boolean;
  };
};

function removeLatexCommandsAndBrackets(text: string) {
	let modifiedText = text.replace(/\\[a-zA-Z]+\s*/g, "");
	modifiedText = modifiedText.replace(/[{}]/g, " ");

	return modifiedText;
}

function removeAllMathElements(htmlString: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, "text/html");
	const mathElements = doc.getElementsByTagName("math");
	Array.from(mathElements).forEach((mathElement) => {
		//@ts-ignore
		mathElement.parentNode.removeChild(mathElement);
	});
	const serializer = new XMLSerializer();
	const newHtmlString = serializer.serializeToString(doc);
	return newHtmlString;
}

export function convertLatexInMarkdown(markdown: string) {
	const regex = /\\\[([\s\S]*?)\\\]|\\\((.*?)\\\)/g;
	return markdown.replace(regex, (match, displayLatex, inlineLatex) => {
		let latex = displayLatex || inlineLatex;
		try {
			latex = latex.replace("%", "\\%");
			latex = latex.replace(/'/g, "");
			return removeAllMathElements(
				removeLatexCommandsAndBrackets(
					katex.renderToString(latex, {
						throwOnError: true,
						displayMode: !!displayLatex,
						strict: "ignore",
					})
				)
			);
		} catch (error) {
			console.error("Error rendering LaTeX:", error);
			return removeLatexCommandsAndBrackets(match);
		}
	});
}

const MessageItem = ({ message }: Props) => {
	return (
		<div className={classNames("w-full flex")}>
			<div className="rounded-3xl break-words overflow-hidden whitespace-pre-wrap m-0 flex items-end mt-4 w-full max-w-full gap-[5px] mx-4">
				<div
					className={classNames("text-start leading-relaxed w-full", {
						"sender-message py-2 px-4 text-center": message.isSent,
						"system-message p-3": !message.isSent,
					})}
				>
					<MarkdownPreview
						wrapperElement={{
							"data-color-mode": message.isSent ? "dark" : "light",
						}}
						source={convertLatexInMarkdown(message.message)}
						style={{
							background: "transparent",
							color: message.isSent ? "#fff" : "#C9C9D5",
							textAlign: message.isSent ? "center" : "left",
							fontWeight: message.isSent ? "bold" : "400",
							fontSize: message.isSent ? 22 : 18,
							fontFamily: "Satoshi",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default MessageItem;
