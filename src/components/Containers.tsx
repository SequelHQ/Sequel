import { cn } from "src/helpers";

export const OuterContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={cn("ml-4 bg-transparent flex h-[calc(100vh-64px)]", className)}
    >
      {children}
    </div>
  );
};

export const InnerContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={cn(
        "bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-1 flex-col items-start p-8 gap-2 overflow-x-hidden shadow-[0px_2px_14px_0px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ModuleContainer = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={cn(
        "ml-4 bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-1 flex-col items-start px-12 py-8 overflow-x-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
