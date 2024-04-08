import React, { useState } from 'react';

const Tooltip = ({ children, content }: { children: React.ReactNode; content: React.ReactNode }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	console.log('Tooltip Component: ', content);
	const handleMouseEnter = () => {
		setIsVisible(true);
	};

	const handleMouseLeave = () => {
		setIsVisible(false);
	};

	return (
		<div className="relative inline-block">
        
			<div
				className="inline-block"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{children}
			</div>
			{isVisible && (
				<div className="absolute px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip mb-3 z-20" style={{'zIndex': 30}}>
					{content}
				</div>
			)}
		</div>
	);
};

export default Tooltip;