export interface VideoItemProps {
  uri: string;
  label: string;
}

export const VideoItem = ({ label, uri }: VideoItemProps): JSX.Element => {
	return (
		<div className="h-auto bg-[rgba(40,40,40,0.58)] rounded mb-2 cursor-pointer shadow-sm flex hover:border border-gray-700 overflow-hidden">
			<iframe
				width="560"
				height="315"
				src={uri}
				title={label}
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
			></iframe>
		</div>
	);
};
