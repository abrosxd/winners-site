"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AboutBlock2() {
  const [mounted, setMounted] = useState(false);
  const b2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    const cirl = b2Ref.current?.querySelector(".cirl");
    const cirr = b2Ref.current?.querySelector(".cirr");

    if (cirl && cirr) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cirl,
          { x: 1.5 },
          {
            x: -25,
            scrollTrigger: {
              trigger: b2Ref.current,
              start: "top 60%",
              end: "top top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          cirr,
          { x: -1.5 },
          {
            x: 25,
            scrollTrigger: {
              trigger: b2Ref.current,
              start: "top 60%",
              end: "top top",
              scrub: true,
            },
          }
        );
      }, b2Ref);

      return () => ctx.revert();
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="font-inter relative py-4 px-3 box-border flex flex-col">
      <div className="mt-14 flex flex-col gap-20 lg:flex-row lg:mx-24 lg:gap-[19.63rem] lg:items-center z-20">
        <div className="flex flex-col gap-4">
          <h3 className="font-normal text-3xl text-[#171D3D] lg:text-[40px] lg:leading-[48.4px]">
            Агентский бизнес появился
            <br />в 90-х годах, тогда все агенты работали совместно
          </h3>
          <h4 className="font-normal text-lg leading-[21.8px] text-[#5B5B5B]">
            С 90-х годов страна начала вставать на новые
            <br />
            рельсы, и это также отразилось на хоккее.
          </h4>
        </div>
        <div ref={b2Ref} className="flex flex-row justify-center gap-10">
          <div className="w-[100px] h-[100px] bg-[#171D3D] rounded-full flex justify-center items-center relative after:h-[2px] after:w-32 after:bg-[#5B5B5B] after:absolute after:left-1/2 after:-z-10 lg:w-[124px] lg:h-[124px]">
            <p className="font-normal text-lg text-white">1991</p>
          </div>
          <div className="w-[100px] h-[100px] flex justify-center items-center relative lg:w-[124px] lg:h-[124px]">
            <p className="font-normal text-lg text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              2001
            </p>
            <div className="bg-white w-[80px] lg:w-[104px] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>
            <div className="relative w-[100px] h-[100px] lg:w-[124px] lg:h-[124px]">
              <img
                className="cirl z-0 rotate-180 absolute inset-0"
                src="/assets/img/about/b2-circle-r.svg"
              />
              <img
                className="cirr z-0 absolute inset-0"
                src="/assets/img/about/b2-circle-r.svg"
              />
            </div>
          </div>
          <div className="w-[100px] h-[100px] bg-[#171D3D] rounded-full flex justify-center items-center relative after:h-[2px] after:w-32 after:bg-[#5B5B5B] after:absolute after:right-1/2 after:-z-10 lg:w-[124px] lg:h-[124px]">
            <p className="font-normal text-lg text-white">Н.В.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
