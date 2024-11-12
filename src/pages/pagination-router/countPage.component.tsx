import { IFilter } from "@chax-at/prisma-filter-common";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CountPageComponent: React.FC<{
  setParams: React.Dispatch<React.SetStateAction<IFilter>>;
}> = ({ setParams }) => {
  const handleSelect = (e: string) => {
    const limit = Number(e);
    setParams((prev) => ({ ...prev, limit: limit }));
  };
  return (
    <>
      <Select onValueChange={(e) => handleSelect(e)} defaultValue="1">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(10)].map((_, index) => (
            <SelectItem key={index} value={(index + 1).toString()}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default CountPageComponent;
