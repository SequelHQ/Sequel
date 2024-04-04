import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Label } from "src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { getAIKey, getSelectedAIConfiguration } from "src/helpers/storage";
import { removeExistingThread } from "../whoop/LLMLogic";
import { ModuleContainer } from "src/components/Containers";
import { Input } from "src/components/ui/input";

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState(
    getSelectedAIConfiguration() ?? "sequelsOpenAI"
  );
  const [apiKey, setApiKey] = useState(
    getSelectedAIConfiguration() === "customOption" ? getAIKey() : ""
  );

  const saveSettings = () => {
    localStorage.setItem("selectedAIConfiguration", selectedOption);
    let key = "";
    if (selectedOption === "customOption") {
      key = apiKey;
    } else {
      key =
        selectedOption === "sequelsOpenAI"
          ? (process.env.OPEN_AI_KEY as string)
          : process.env.GROQ_API_KEY ?? "";
    }
    localStorage.setItem("AIKey", key as string);
    removeExistingThread();
    toast("Settings saved successfully!");
  };

  const logout = () => {
    toast.success("Logged out successfully!");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <ModuleContainer className="items-center justify-center">
      <div className="rounded-3xl flex flex-col">
        <Button
          className="absolute top-10 right-4 m-4 bg-red-600 text-white opacity-80 rounded"
          onClick={logout}
        >
          Logout
        </Button>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Choose your AI Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="aiModel">Model</Label>
                  <Select
                    value={selectedOption}
                    onValueChange={setSelectedOption}
                  >
                    <SelectTrigger className="rounded" id="aiModel">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent
                      className="rounded bg-white"
                      position="popper"
                    >
                      <SelectItem
                        className="ml-2 border-b-2 p-4"
                        value="sequelsOpenAI"
                      >
                        OpenAI GPT 4
                      </SelectItem>
                      <SelectItem
                        className="ml-2 border-b-2 p-4"
                        value="groqMistral"
                      >
                        Groq Mistral
                      </SelectItem>
                      <SelectItem value="groqLlama" className="ml-2 p-4">
                        Groq Llama
                      </SelectItem>
                      <SelectItem value="customOption" className="ml-2 p-4">
                        Custom
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button className="bg-white rounded" onClick={saveSettings}>
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ModuleContainer>
  );
};

export default Settings;
