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
import {
	ArrowRightIcon,
	DotsVerticalIcon,
	TrashIcon,
} from "@radix-ui/react-icons";
import Tooltip from "src/common/tooltip";
import { XIcon } from "lucide-react";
import { SupplementsAdd } from "./SupplementsAdd";

const Supplements = () => {
	const [supplements, setSupplements] = useState(() => {
		const localData = localStorage.getItem("supplementsList");
		return localData ? JSON.parse(localData) : supplementsList;
	});
	const [editMode, setEditMode] = useState(false);

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

	const deleteSupplement = (id: string) => {
		const updatedSupplements = supplements.filter(
			(supplement: SupplementType) => supplement.id !== id
		);
		setSupplements(updatedSupplements);
	};

	const addSupplement = (newSupplement: SupplementType) => {
		setSupplements((prevSupplements: SupplementType[]) => [
			newSupplement,
			...prevSupplements,
		]);
	};

	return (
		<div className="ml-4 bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8">
			<div className="flex w-full flex-1 overflow-y-auto overflow-x-hidden pr-1">
				<div className="flex flex-col w-full flex-1 overflow-auto pr-1 pt-4">
					<div className="flex w-full justify-between items-center mb-8">
						<div className="font-bold text-2xl text-white">Supplements</div>
						<div className="flex flex-row gap-2">
							<SupplementsAdd onSubmit={addSupplement} />
							{editMode ? (
								<XIcon
									className="w-6 h-6 mr-4 text-white cursor-pointer"
									onClick={() => setEditMode(!editMode)}
								/>
							) : (
								<DotsVerticalIcon
									className="w-6 h-6 mr-4 text-white cursor-pointer"
									onClick={() => setEditMode(!editMode)}
								/>
							)}
						</div>
					</div>
					<div className="w-full">
						<Table>
							<TableHead>
								<TableRow>
									{editMode && <TableHeaderCell></TableHeaderCell>}
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
										{editMode && (
											<TableCell className="text-center">
												<TrashIcon
													className="w-5 h-5 text-red-500 self-center cursor-pointer"
													onClick={() => deleteSupplement(item.id)}
												/>
											</TableCell>
										)}
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
													Learn More
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
				</div>
			</div>
		</div>
	);
};

export default Supplements;
