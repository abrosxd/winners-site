"use client";
import { useDataContext } from "@/context/DataContext";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { ToggleGroup, ToggleGroupItem } from "@ui/toggle-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@ui/pagination";

export function PlayersClient({ initialData }: { initialData: any }) {
  const { data, isLoading } = useDataContext();
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(8);
  const [isDesktop, setIsDesktop] = useState(false);

  const [shuffledPlayers] = useState(() =>
    [...(initialData?.players || [])].sort(() => Math.random() - 0.5)
  );

  const splitName = (name: string) => {
    const [first, ...rest] = name.trim().split(/\s+/);
    return { first, rest: rest.join(" ") };
  };

  const updateIsDesktop = () => {
    setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
  };

  useEffect(() => {
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => {
      window.removeEventListener("resize", updateIsDesktop);
    };
  }, []);

  useEffect(() => {
    setPlayersPerPage(isDesktop ? 16 : 8);
  }, [isDesktop]);

  const filteredPlayers = useMemo(() => {
    if (!shuffledPlayers || isLoading) return [];

    let filtered = shuffledPlayers.filter((player) => {
      const searchWords = searchTerm
        .toLowerCase()
        .split(/\s+/)
        .filter((word: string) => word.length > 0);

      const playerNameParts = player.name.toLowerCase().split(/\s+/);

      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((searchWord: string) =>
          playerNameParts.some((namePart: string) =>
            namePart.includes(searchWord)
          )
        );

      const matchesRole =
        filterRole === "all" ||
        player.role.toLowerCase() === filterRole.toLowerCase();

      return matchesSearch && matchesRole;
    });

    return filtered;
  }, [shuffledPlayers, searchTerm, filterRole, isLoading]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPlayers.length / playersPerPage),
    [filteredPlayers, playersPerPage]
  );

  const currentPlayers = useMemo(() => {
    const start = (currentPage - 1) * playersPerPage;
    const end = start + playersPerPage;
    return filteredPlayers.slice(start, end);
  }, [currentPage, filteredPlayers, playersPerPage]);

  const getPaginationItems = useMemo(() => {
    const maxVisiblePages = isDesktop ? 9 : 5;

    if (totalPages <= maxVisiblePages + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const middleStart = Math.max(
      2,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const middleEnd = Math.min(
      totalPages - 1,
      middleStart + maxVisiblePages - 1
    );

    pages.push(1);
    if (middleStart > 2) {
      pages.push("ellipsis-start");
    }
    for (let i = middleStart; i <= middleEnd; i++) {
      pages.push(i);
    }
    if (middleEnd < totalPages - 1) {
      pages.push("ellipsis-end");
    }
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, isDesktop]);

  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  return (
    <>
      <img
        className="object-cover object-top h-44 w-full lg:h-[400px]"
        src="/assets/img/head/players.png"
      />
      <div
        id="plrs-grid"
        className="py-8 px-2 w-full box-border max-w-5xl mx-auto relative zoomer"
      >
        <h2 className="font-bold text-6xl text-[#171D3D] h-14">
          игроки агентства
        </h2>
        <div className="flex flex-col gap-1 mt-1 mb-0 font-inter lg:flex-row lg:gap-2">
          <Input
            id="input-25"
            className="h-8 text-sm lg:text-base rounded-none focus-visible:ring-transparent w-full lg:w-2/12 border-2 border-[#D2D2D2]"
            placeholder="поиск игрока"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ToggleGroup
            className="flex justify-between gap-1 rounded-none lg:gap-2 w-full lg:w-6/12"
            type="single"
            variant="outline"
            value={filterRole}
            onValueChange={(value) => value && setFilterRole(value)}
          >
            {["all", "Нападающий", "Защитник", "Вратарь"].map((role) => (
              <ToggleGroupItem
                key={role}
                className="h-8 text-sm lg:text-base rounded-none border-[#5B5B5B] text-[#5B5B5B] data-[state=on]:bg-[#FF730A] data-[state=on]:border-[#FF730A] data-[state=on]:text-white px-0 w-full"
                value={role}
              >
                {role === "all" ? "все игроки" : role.toLowerCase()}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex flex-wrap gap-2 w-full pt-2 lg:gap-5 lg:pt-5">
          {currentPlayers.map((item: any) => (
            <div
              className="w-[calc(50%-0.25rem)] flex flex-col pb-3 lg:w-[calc(25%-1rem)] border-[#D0D0D0] border rounded-xl overflow-hidden"
              key={item.id}
            >
              <img
                className="w-full aspect-[6/5] object-cover object-top"
                src={getImageUrl(item.photo)}
                alt={item.name}
              />
              <div className="border-y border-[#D0D0D0] flex p-2 gap-3 items-center">
                <div>
                  {item.team.icon && (
                    <img
                      className="w-7 object-center"
                      src={getImageUrl(item.team.icon)}
                      alt={item.team.name}
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-[#171D3D] lg:text-[26px] leading-[21.6px] lg:leading-[26px] w-full">
                    {splitName(item.name).first}
                    <br />
                    {splitName(item.name).rest}
                  </h3>
                  <p className="font-inter font-semibold text-sm text-[#5B5B5B] h-7 lg:text-base leading-none lg:leading-none">
                    {item.team.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div>
                  <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
                    {item.birthday}
                  </p>
                  <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
                    {item.height}/{item.weight}
                  </p>
                </div>
                <div>
                  <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg lowercase">
                    {item.role}
                  </p>
                  <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg lowercase">
                    {item.grip}
                  </p>
                </div>
              </div>
              <Button
                className="bg-orange-500 hover:bg-[#171D3D] mx-3 lg:py-1 lg:px-2 h-auto rounded-none font-normal text-base lg:text-lg leading-none font-inter"
                asChild
              >
                <Link href={item.stats} target="_blank">
                  статистика
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <Pagination className="mt-10">
          <PaginationContent>
            {getPaginationItems.map((item, index) => {
              if (item === "ellipsis-start" || item === "ellipsis-end") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#plrs-grid"
                    onClick={() => {
                      if (typeof item === "number") {
                        setCurrentPage(item); // Устанавливаем только если item — число
                      }
                    }}
                    className={`font-inter font-normal text-base rounded-none ${
                      currentPage === item
                        ? "text-white bg-[#FF730A]"
                        : "text-[#1E1E1E]"
                    }`}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
