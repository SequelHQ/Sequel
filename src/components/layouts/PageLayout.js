import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const PageLayout = () => {
	return (
		<div className="flex bg-[transparent] rounded-2xl h-[calc(100vh-100px)] w-full">
			<Sidebar />
			<div className="w-full">
				<Outlet />
			</div>
		</div>
	);
};

export default PageLayout;
