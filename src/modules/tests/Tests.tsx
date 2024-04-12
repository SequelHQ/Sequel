import {
	Switch,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";
import { testsList, TestType } from "./testsList";
import { useEffect, useState } from "react";
import { TrashIcon, XIcon } from "lucide-react";
import { TestsAdd } from "./TestsAdd";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

const Tests = () => {
	const [tests, setTests] = useState(() => {
		const localData = localStorage.getItem("testsList");
		return localData ? JSON.parse(localData) : testsList;
	});
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		localStorage.setItem("testsList", JSON.stringify(tests));
	}, [tests]);

	const toggleOrdered = (id: string) => {
		const updatedTests = tests.map((test: TestType) => {
			if (test.id === id) {
				return { ...test, ordered: !test.ordered };
			}
			return test;
		});
		setTests(updatedTests);
	};

	const toggleTaken = (id: string) => {
		const updatedTests = tests.map((test: TestType) => {
			if (test.id === id) {
				return { ...test, taken: !test.taken };
			}
			return test;
		});
		setTests(updatedTests);
	};

	const deleteTest = (id: string) => {
		const updatedTests = tests.filter((tests: TestType) => tests.id !== id);
		setTests(updatedTests);
	};

	const addTest = (newTest: TestType) => {
		setTests((prevTests: TestType[]) => [newTest, ...prevTests]);
	};

	return (
		<div className="ml-4 bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8">
			<div className="flex w-full flex-1 overflow-y-auto overflow-x-hidden pr-1">
				<div className="flex flex-col w-full flex-1 overflow-auto pr-1 px-4 pt-4">
					<div className="flex w-full justify-between items-center mb-8">
						<div className="font-bold text-2xl text-white">Tests</div>
						<div className="flex flex-row gap-2">
							<TestsAdd onSubmit={addTest} />
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
					<div className="w-full ">
						<Table>
							<TableHead>
								<TableRow>
									{editMode && <TableHeaderCell></TableHeaderCell>}
									<TableHeaderCell>Test</TableHeaderCell>
									<TableHeaderCell>Name</TableHeaderCell>
									<TableHeaderCell>Ordered</TableHeaderCell>
									<TableHeaderCell>Taken</TableHeaderCell>
								</TableRow>
							</TableHead>
							<TableBody className="text-slate-200">
								{tests.map((item: TestType) => (
									<TableRow key={item.id}>
										{editMode && (
											<TableCell className="text-center">
												<TrashIcon
													className="w-5 h-5 text-red-500 self-center cursor-pointer"
													onClick={() => deleteTest(item.id)}
												/>
											</TableCell>
										)}
										<TableCell>{item.id}</TableCell>
										<TableCell>{item.test_name}</TableCell>
										<TableCell>
											<Switch
												checked={item.ordered}
												onChange={() => toggleOrdered(item.id)}
											/>
										</TableCell>
										<TableCell>
											<Switch
												checked={item.taken}
												onChange={() => toggleTaken(item.id)}
											/>
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

export default Tests;
