"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function SortBySelect() {
  const searchParams = useSearchParams();

  const [sort, setSort] = useState(searchParams.get("sortBy") || "");

  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (value: string) => {
    setSort(value);
    router.push(`${pathname}?sortBy=${value}`);
  };

  return (
    <>
      Sort By:
      <Select onValueChange={handleSelect} value={sort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Newly Listed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">Newly Listed</SelectItem>
          <SelectItem value="asc">Lowest Price First</SelectItem>
          <SelectItem value="desc">Highest Price First</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

export default SortBySelect;
