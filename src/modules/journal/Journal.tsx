import { useEffect, useState } from "react";
import { getJournalData, storeJournalData } from "src/helpers/storage";
import SingleNote from "./SingleNote";

const Journal = () => {
	const [data, setData] = useState<
    {
      text: string;
      dateCreated: number;
      dateUpdated: number;
    }[]
  >([]);
	const [lsData, setLsData] = useState(localStorage.getItem(`notesData`));

	const [journalData, setJournalData] = useState(getJournalData());

	useEffect(() => {
		if (lsData) {
			setData(JSON.parse(lsData));
		}
	}, [lsData]);

	useEffect(() => {
		localStorage.setItem(`notesData`, JSON.stringify(data));
	}, [data]);

	const handleEdit = (index: number, newText: string) => {
		const updatedData = [...data];
		updatedData[index].text = newText;
		updatedData[index].dateUpdated = Date.now();
		setData(updatedData);
	};

	const handleAddNote = () => {
		const newNote = {
			text: "",
			dateCreated: Date.now(),
			dateUpdated: Date.now(),
		};
		setData([newNote, ...data]);
	};


	function getDateAsName(date: number) {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);
		const thisWeekStart = new Date(today);
		thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());

		if (date >= today.setHours(0, 0, 0, 0)) {
			return "Today";
		} else if (date >= yesterday.setHours(0, 0, 0, 0)) {
			return "Yesterday";
		} else if (date >= thisWeekStart.setHours(0, 0, 0, 0)) {
			return "This Week";
		} else {
			return "Earlier";
		}

	}

	const groupNotesByDay = () => {
		const groups: { [key: string]: typeof data } = {};
		data.forEach((note) => {
			const date = new Date(note.dateUpdated);
			const day = getDateAsName(date.getTime());
			if (!groups[day]) {
				groups[day] = [];
			}
			groups[day].push(note);
		});
		return groups;
	};

	const noteGroups = groupNotesByDay();


	const handleJournalChange = (newJournalData: string) => {
		setJournalData(newJournalData);
		storeJournalData(newJournalData);
	};


	return (
		<div className="ml-4 bg-[#161617] rounded-3xl h-[calc(100vh-64px)]  items-start px-12 py-8 overflow-x-hidden">

			<div className="w-full">
		
				<div className="w-full flex justify-end">

					<button
						onClick={handleAddNote}
						className="text-white p-2 border border-solid border-[#7c7c83] rounded-xl cursor-pointer hover:shadow-[0px_3px_16px_rgba(65,58,108,0.25)] hover:scale-[1.006] transition duration-100"
					>
						Add Note
					</button>
				</div>

				<div className="mt-5 w-full">
					<SingleNote
						index={42069}
						value={journalData}
						setValue={handleJournalChange}
						placeholder="This is your main journal. You can include things that you do everyday here instead of making a new note for that everyday. Jot down your thoughts..."
					/>
				</div>

				<div className="mt-5 w-full">
					{Object.entries(noteGroups).map(([day, notes]) => (
						<div key={day} className="w-4/5 mt-10">
							<h3 className="text-[#C9C9D5] text-xl font-bold">{day}</h3>
							{notes.map((note, index) => (
								<div key={index} className="mt-4">
									<SingleNote 
										value={note.text} 
										setValue={(newText: string) => handleEdit(index, newText)}
										index={index}
									/>
								</div>

							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Journal;

