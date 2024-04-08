import {
	Switch,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";
import { SupplementType, supplementsList } from "./supplementsList";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Tooltip from "src/common/tooltip";
import { ModuleContainer } from "src/components/Containers";

const Supplements = () => {
	const [supplements, setSupplements] = useState(() => {
		const localData = localStorage.getItem("supplementsList");
		return localData ? JSON.parse(localData) : supplementsList;
	});

	useEffect(() => {
		localStorage.setItem("supplementsList", JSON.stringify(supplements));
	}, [supplements]);

	const toggleOrdered = (id: string) => {
		const updatedSupplements = supplements.map((supplement: SupplementType) => {
			if (supplement.id === id) {
				return { ...supplement, ordered: !supplement.ordered };
			}
			return supplement;
		});
		setSupplements(updatedSupplements);
	};

	const toggleInProgress = (id: string) => {
		const updatedSupplements = supplements.map((supplement: SupplementType) => {
			if (supplement.id === id) {
				return { ...supplement, inProgress: !supplement.inProgress };
			}
			return supplement;
		});
		setSupplements(updatedSupplements);
	};

	return (
		<ModuleContainer>
			<div className="font-bold text-2xl text-white mb-8">Supplements</div>
			<div className="w-full">
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Supplement</TableHeaderCell>
							<TableHeaderCell>Dosage</TableHeaderCell>
							<TableHeaderCell>Ordered</TableHeaderCell>
							<TableHeaderCell>In progress</TableHeaderCell>
							<TableHeaderCell>Link</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody className="text-slate-200">
						{supplements.map((item: SupplementType) => (
							<TableRow key={item.id}>
								<TableCell className="max-w-[200px]">
									<Tooltip content={item.description}>
										{item.supplement}
									</Tooltip>
								</TableCell>
								<TableCell className="max-w-[150px] overflow-hidden whitespace-nowrap truncate">
									{item.dosage || "N/A"}
								</TableCell>
								<TableCell>
									<Switch
										checked={item.ordered}
										onChange={() => toggleOrdered(item.id)}
									/>
								</TableCell>
								<TableCell>
									<Switch
										checked={item.inProgress}
										onChange={() => toggleInProgress(item.id)}
									/>
								</TableCell>
								<TableCell>
									{item.link ? (
										<a
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
											className="gap-1 flex-row flex items-center"
											onClick={(e) => {
												e.preventDefault();
												//@ts-ignore
												window.loginWGauth.openExternal(item.link);
											}}
										>
                      Checkout
											<ArrowRightIcon className="w-4 h-4 ml-2" />
										</a>
									) : (
										"N/A"
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</ModuleContainer>
	);
};

export default Supplements;
