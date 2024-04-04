import CloseIcon from "src/assets/icons/close.png";
import MinimizeIcon from "src/assets/icons/minimize.png";
import MaximizeIcon from "src/assets/icons/maximize.png";
const myWindow: any = window;

const AppTitlebar = () => {
  const { loginWGauth } = myWindow;

  const handleClose = () => {
    loginWGauth.closeApp();
  };

  const handleMinimize = () => {
    loginWGauth.minimizeApp();
  };

  const handleMaximize = () => {
    loginWGauth.maximizeApp();
  };
  return (
    <div className="fixed titlebar w-full p-4 flex items-center justify-between gap-1 ">
      <div className="flex items-center gap-1 controls">
        <button
          className="bg-[black] h-3 w-3 rounded-full flex items-center justify-center text-[12px]"
          onClick={handleClose}
        >
          <img src={CloseIcon} className="h-3 w-3 rounded-full" alt="close" />
        </button>
        <button
          onClick={handleMinimize}
          className="bg-[black] h-3 w-3 rounded-full flex items-center justify-center text-[12px]"
        >
          <img
            src={MinimizeIcon}
            className="h-3 w-3 rounded-full"
            alt="minimize"
          />
        </button>
        <button
          onClick={handleMaximize}
          className="bg-[black] h-3 w-3 rounded-full flex items-center justify-center text-xs font-bold"
        >
          <img
            src={MaximizeIcon}
            className="h-3 w-3 rounded-full"
            alt="maximize"
          />
        </button>
      </div>
    </div>
  );
};

export default AppTitlebar;
