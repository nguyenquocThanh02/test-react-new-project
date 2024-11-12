import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce.hook";
import { IFilter } from "@chax-at/prisma-filter-common";
import React, { useEffect, useState } from "react";

const SearchComponent: React.FC<{
  setParams: React.Dispatch<React.SetStateAction<IFilter>>;
}> = ({ setParams }) => {
  const [value, setValue] = useState<string>("");

  const valueSearch = useDebounce(value, 800);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.trim() === "") {
      setValue("");
    } else {
      setValue(value.trim());
    }
  };

  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      offset: 0,
      filter:
        prevParams.filter &&
        prevParams.filter.map((item) => ({
          ...item,
          value: valueSearch,
        })),
    }));
  }, [valueSearch, setParams]);

  return (
    <div>
      <Input
        type="text"
        className="border w-40 rounded"
        placeholder="Search here"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default SearchComponent;
