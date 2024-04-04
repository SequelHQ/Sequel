import { ModuleContainer } from "src/components/Containers";
import { VideoItem, VideoItemProps } from "./VideoItem";

const VIDEOS_LIST: VideoItemProps[] = [
  {
    label: "Epigenetic Age Test",
    uri: "https://www.youtube.com/embed/UxU9SANVlRc",
  },
  {
    label: "Peptides I Cycle",
    uri: "https://www.youtube.com/embed/ZiIHWSlRH1g",
  },
];

const Videos = () => {
  return (
    <ModuleContainer>
      <div className="font-bold text-2xl text-white mb-8">Guides</div>
      <div className="flex w-full flex-wrap gap-4">
        {VIDEOS_LIST.map((video, index) => {
          return <VideoItem key={index} {...video} />;
        })}
      </div>
    </ModuleContainer>
  );
};

export default Videos;
