import React, { useEffect, useState } from "react";
import classNames from "classnames";

type Props = {
  messageText?: string;
  setMessageText?: (value: string) => void;
  onSend: (msg: string) => void;
  isLoading?: boolean;
  openSidePanel?: () => void; // Function to update files loading state,
  disabled: boolean;
};

const ReplyBoxNoDocs = ({
	onSend,
	messageText,
	setMessageText,
	isLoading,
	openSidePanel,
	disabled,
}: Props) => {
	const [showKeyboard] = useState<boolean>(true);

	const onSubmit = (e: any) => {
		e.preventDefault();
		if (!messageText) {
			return;
		}
		onSend(messageText);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessageText && setMessageText(e.target.value);
	};

	useEffect(() => {
		if (isLoading) setMessageText && setMessageText("");
	}, [isLoading]);

	return (
		<form
			className="flex items-end w-full mb-4"
			onSubmit={onSubmit}
			id="reply-box"
		>
			<div className="flex flex-col w-full justify-center items-center overflow-hidden">
				<input
					placeholder="Start typing…"
					value={messageText}
					onChange={onChange}
					className={classNames(
						"w-full transition-all duration-200 outline-none focus:outline-none rounded-[30px] bg-[#f1f0f0] px-7",
						{
							"h-0 mt-0": !showKeyboard,
							"h-[54px] mt-5": showKeyboard,
						}
					)}
					disabled={disabled}
				/>
			</div>
		</form>
	);
};

export default ReplyBoxNoDocs;
