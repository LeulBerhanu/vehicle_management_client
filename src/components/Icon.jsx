import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Icon = ({ children, content }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-white text-black border">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Icon;
