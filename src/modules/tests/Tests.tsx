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
import { ModuleContainer } from "src/components/Containers";

const Tests = () => {
  const [tests, setTests] = useState(() => {
    const localData = localStorage.getItem("testsList");
    return localData ? JSON.parse(localData) : testsList;
  });

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

  return (
    <ModuleContainer>
      <div className="font-bold text-2xl text-white mb-8">Tests</div>
      <div className="w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Test</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Ordered</TableHeaderCell>
              <TableHeaderCell>Taken</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className="text-slate-200">
            {tests.map((item: TestType) => (
              <TableRow key={item.id}>
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
    </ModuleContainer>
  );
};

export default Tests;
