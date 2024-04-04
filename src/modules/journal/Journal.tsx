import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { ModuleContainer } from "src/components/Containers";
import { getJournalData, storeJournalData } from "src/helpers/storage";

const Journal = () => {
  const [value, setValue] = useState(getJournalData() ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveInput = useCallback(
    debounce((nextValue) => {
      storeJournalData(nextValue);
    }, 1000),
    []
  );

  const handleChange = (event: any) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    saveInput(nextValue);
  };
  return (
    <ModuleContainer>
      <div className="font-bold text-2xl text-white mb-2 pt-4 pb-4">
        Journal
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        className="h-full w-full text-white text-base font-light bg-[#161617] rounded-xl border-white border p-4 resize-none outline-none"
        placeholder="Start typing..."
      />
    </ModuleContainer>
  );
};

export default Journal;
