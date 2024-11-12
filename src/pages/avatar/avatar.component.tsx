import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Camera } from "lucide-react";
const AvatarComponent = () => {
  return (
    <div className="mt-20">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <div className="group relative flex size-[250px] overflow-hidden rounded-full bg-Secondary border">
              <img
                alt="image-test"
                className="object-cover w-full h-full"
                src={
                  "https://techvccloud.mediacdn.vn/2018/7/31/photo-1-1533008110600559732161.png"
                }
              />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md text-sm pointer-events-none group-hover:pointer-events-auto group-hover:scale-110">
                <Camera />
              </div>
              <input type="file" accept="image/*" className="hidden" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update avatar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AvatarComponent;
