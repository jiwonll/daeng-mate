"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Filter, Dog } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MateHeaderProps {
  onSearch?: (term: string) => void;
  onFilterChange?: (filter: string) => void;
}

export default function MateHeader({
  onSearch,
  onFilterChange,
}: MateHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-5 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 font-jua">
              산책 메이트 찾기
            </h1>
            <PawPrint />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            우리 댕댕이와 함께 산책할 동네 친구를 찾아보세요!
          </p>
        </div>

        <Link className="inline-flex items-center justify-center" href="/write">
          <Button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold h-10 px-4 inline-flex items-center justify-center gap-1.5 transition-all">
            <span className="inline-flex items-center justify-center">
              <Plus className="w-5 h-5 shrink-0" />
            </span>
            <span className="hidden sm:inline-block leading-none translate-y-[1.5px]">
              메이트 모집하기
            </span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="동네 이름이나 글 제목으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl focus:bg-white transition-colors"
          />
        </div>

        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] h-11 bg-gray-50 border-gray-200 rounded-xl font-medium text-gray-700">
              <div className="flex items-center gap-1.5">
                <Dog className="w-4 h-4 text-gray-500" />
                <SelectValue placeholder="크기" />
              </div>
            </SelectTrigger>
            <SelectContent side="bottom" align="start">
              <SelectItem value="all">전체 체중</SelectItem>
              <SelectItem value="under5">5kg 미만</SelectItem>
              <SelectItem value="5to10">5 ~ 10kg</SelectItem>
              <SelectItem value="10to20">10 ~ 20kg</SelectItem>
              <SelectItem value="over20">20kg 이상</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[130px] h-11 bg-gray-50 border-gray-200 rounded-xl font-medium text-gray-700">
              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-gray-500" />
                <SelectValue placeholder="상태" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 상태</SelectItem>
              <SelectItem value="open">모집 중만</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
