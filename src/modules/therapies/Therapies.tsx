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
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ModuleContainer } from "src/components/Containers";

const Therapies = () => {
  const [therapies, setTherapies] = useState(() => {
    const localData = localStorage.getItem("therapiesList");
    return localData ? JSON.parse(localData) : THERAPIES_LIST;
  });

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

  return (
    <ModuleContainer>
      <div className="font-bold text-2xl text-white mb-8">Therapies</div>
      <div className="w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Therapy</TableHeaderCell>
              <TableHeaderCell>In progress</TableHeaderCell>
              <TableHeaderCell>Link</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className="text-slate-200">
            {therapies.map((item: TherapyItem) => (
              <TableRow key={item.label}>
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

export default Therapies;
