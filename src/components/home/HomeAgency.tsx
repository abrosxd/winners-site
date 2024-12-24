"use client";

import Link from "next/link";
import { Button } from "@ui/button";
import { useEffect, useState } from "react";

interface HomeAgencyProps {
  data: any[];
}

export function HomeAgency({ data }: HomeAgencyProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [displayedAgency, setDisplayedAgency] = useState<any[]>([]);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  const splitName = (name: string) => {
    const [first, ...rest] = name.trim().split(/\s+/);
    return { first, rest: rest.join(" ") };
  };

  useEffect(() => {
    const updateDisplayedItems = () => {
      const isLarge = window.matchMedia("(min-width: 1024px)").matches;
      setIsLargeScreen(isLarge);
      const limit = isLarge ? 4 : 2;
      const sortedAgency = [...data].sort((a, b) => a.id - b.id);
      setDisplayedAgency(sortedAgency.slice(0, limit));
    };

    updateDisplayedItems();
    window.addEventListener("resize", updateDisplayedItems);
    return () => window.removeEventListener("resize", updateDisplayedItems);
  }, [data]);

  return (
    <div className="justify-center items-center flex flex-col gap-3 my-12 px-2 lg:px-0 lg:my-16">
      <h2 className="font-bold text-6xl w-full text-[#171D3D] lg:w-10/12">
        наша команда
      </h2>
      <div className="flex flex-wrap gap-2 pt-2 w-full lg:gap-5 lg:pt-5 lg:w-10/12">
        {displayedAgency.map((item) => (
          <div
            key={item.id}
            className="w-[calc(50%-0.25rem)] flex flex-col gap-2 pb-6 lg:w-[calc(25%-0.94rem)]"
          >
            <img
              className="w-full aspect-square object-cover object-center rounded-xl lg:aspect-[6/5]"
              src={getImageUrl(item.photo)}
              alt={item.name}
            />
            <h3 className="font-bold text-2xl text-[#171D3D] lg:text-4xl">
              {splitName(item.name).first}
              <br />
              {splitName(item.name).rest}
            </h3>
            <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
              {item.type}
            </p>
            <Button
              className="hover:bg-transparent font-normal text-lg leading-none font-inter h-auto pl-0 justify-start"
              variant="link"
              asChild
            >
              <Link href={`mailto:${item.email}`}>
                <img
                  className="h-4"
                  src="/assets/icons/social/email-org.svg"
                  alt="email"
                />
                <p className="font-inter font-normal text-base text-[#5B5B5B]">
                  {item.email}
                </p>
              </Link>
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="text-orange-500 bg-white border border-orange-500 rounded-none mx-auto hover:bg-orange-500 hover:text-white font-normal text-lg leading-none font-inter"
        variant="link"
        asChild
      >
        <Link href="/agency">вся команда агентства</Link>
      </Button>
    </div>
  );
}