"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RangeFilter, StatusFilter } from "@/types/order";

interface Props {
  value: StatusFilter;
  onChange: (v: StatusFilter) => void;
  range: RangeFilter;
  onRangeChange: (v: RangeFilter) => void;
}

export function OrdersToolbar({
  value,
  onChange,
  range,
  onRangeChange,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-3">
      <div className="w-full md:w-auto">
        <div className="relative">
          {/* Left fade indicator */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent sm:hidden" />
          {/* Right fade indicator */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent sm:hidden" />
          <div className="scrollbar-hide overflow-x-auto">
            <Tabs
              value={value}
              onValueChange={(v) => onChange(v as StatusFilter)}
            >
              <TabsList className="min-w-max">
                <TabsTrigger value="ALL">All Orders</TabsTrigger>
                <TabsTrigger value="FULFILLED">Shipped</TabsTrigger>
                <TabsTrigger value="PARTIALLY_FULFILLED">Partially</TabsTrigger>
                <TabsTrigger value="UNFULFILLED">Unfulfilled</TabsTrigger>
                <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto">
        <Select
          value={range}
          onValueChange={(v) => onRangeChange(v as RangeFilter)}
        >
          <SelectTrigger className="h-10 w-full rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm focus:ring-2 focus:ring-green-dark md:w-44">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent className="w-full md:w-44">
            <SelectItem value="30d">Past 30 days</SelectItem>
            <SelectItem value="3m">Past 3 months</SelectItem>
            <SelectItem value="6m">Past 6 months</SelectItem>
            <SelectItem value="1y">Past year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
