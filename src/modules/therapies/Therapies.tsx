import {
	Switch,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";
import { THERAPIES_LIST, TherapyItem } from "./therapiesList";
import { useEffect, useState } from "react";
import { ArrowRightIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { TherapiesAdd } from "./TherapiesAdd";
import { TrashIcon, XIcon } from "lucide-react";

const Therapies = () => {
	const [therapies, setTherapies] = useState(() => {
		const localData = localStorage.getItem("therapiesList");
		return localData ? JSON.parse(localData) : THERAPIES_LIST;
	});
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		localStorage.setItem("therapiesList", JSON.stringify(therapies));
	}, [therapies]);

	const toggleInProgress = (name: string) => {
		const updatedTherapys = therapies.map((therapy: TherapyItem) => {
			if (therapy.label === name) {
				return { ...therapy, inProgress: !therapy.inProgress };
			}
			return therapy;
		});
		setTherapies(updatedTherapys);
	};

	const deleteTherapy = (label: string) => {
		const updatedTherapies = therapies.filter(
			(therapies: TherapyItem) => therapies.label !== label
		);
		setTherapies(updatedTherapies);
	};

	const addTherapy = (newTherapy: TherapyItem) => {
		setTherapies((prevTherapies: TherapyItem[]) => [
			newTherapy,
			...prevTherapies,
		]);
	};

	return (
		<div className="ml-4 bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8">
			<div className="flex w-full flex-1 overflow-y-auto overflow-x-hidden pr-1">
				<div className="flex flex-col w-full flex-1 overflow-auto pr-1 px-4 pt-4">
					<div className="flex w-full justify-between items-center mb-8">
						<div className="font-bold text-2xl text-white">Tests</div>
						<div className="flex flex-row gap-2">
							<TherapiesAdd onSubmit={addTherapy} />
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
									<TableHeaderCell>Therapy</TableHeaderCell>
									<TableHeaderCell>In progress</TableHeaderCell>
									<TableHeaderCell>Link</TableHeaderCell>
								</TableRow>
							</TableHead>
							<TableBody className="text-slate-200">
								{therapies.map((item: TherapyItem) => (
									<TableRow key={item.label}>
										{editMode && (
											<TableCell className="text-center">
												<TrashIcon
													className="w-5 h-5 text-red-500 self-center cursor-pointer"
													onClick={() => deleteTherapy(item.label)}
												/>
											</TableCell>
										)}
										<TableCell>{item.label}</TableCell>
										<TableCell>
											<Switch
												checked={item.inProgress}
												onChange={() => toggleInProgress(item.label)}
											/>
										</TableCell>
										<TableCell>
											{item.uri ? (
												<a
													onClick={(e) => {
														e.preventDefault();
														//@ts-ignore
														window.loginWGauth.openExternal(item.uri);
													}}
													href={item.uri}
													target="_blank"
													rel="noopener noreferrer"
													className="gap-1 flex-row flex items-center"
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

export default Therapies;

