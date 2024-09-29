"use client";
import { useState } from "react";

import data from "../utilities/faqs.json";
import SectionMessage from "./section-message";
import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  return (
    <section className="w-full max-w-[1650px] mx-auto large:px-[148px] px-[120px] tablet:px-6 large:pb-[134px] pb-[104px] tablet:pb-[84px] flex flex-col items-center">
      <h2 className="text-center mb-5 font-semibold text-2xl tablet:text-lg large:text-32 text-black">
        FAQ
      </h2>
      <p className="text-[#7C7C7C] large:max-w-[653px] max-w-[543px] mb-12 large:mb-16 tablet:text-sm text-base large:text-xl text-center font-normal">
        Find answers to common questions about our platform and the waitlist
        process.
      </p>

      <Accordion
        type="single"
        className="w-full large:mb-20 mb-[60px]  gap-x-[30px] gap-y-[30px] tablet:grid-cols-1 grid grid-cols-2 items-start"
        collapsible
      >
        {data?.map((item: any, index: number) => {
          return (
            <AccordionItem
              key={index}
              value={String(index)}
              className="accordion-dropshadow px-8 rounded-[10px] border border-[#FFBB0A3D] bg-white"
            >
              <AccordionTrigger
                onClick={() => {
                  if (selected !== item.question) {
                    setSelected(item.question);
                  } else {
                    setSelected("");
                  }
                }}
                className="items-start py-0"
              >
                <div className="w-full h-[100px] tablet:h-max tablet:py-6 flex gap-[30px] items-center">
                  <div className="w-[30px] h-[30px] tablet:w-5 tablet:h-5 relative flex justify-center items-center">
                    <div
                      className={`w-full h-[5px] tablet:h-[3px] rounded-[20px] bg-[#14051B] duration-500  ${
                        selected === item.question ? "opacity-0" : "opacity-100"
                      }`}
                    ></div>
                    <div
                      className={` duration-500 h-[30px] tablet:h-5 tablet:w-[3px] absolute top-0 left-[50%] w-[5px] rounded-[20px] -translate-x-[50%] ${
                        selected === item.question
                          ? "bg-background-darkYellow rotate-[-90deg]"
                          : "bg-[#14051B] rotate-0"
                      }`}
                    ></div>
                  </div>{" "}
                  <h3 className="font-semibold text-[#14051B] large:text-xl text-lg text-start tablet:text-sm">
                    {item.question}
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <div className="h-max pb-10 tablet:pb-6 w-full overflow-hidden pr-[32px] pl-[60px]">
                  <p className="line-clamp-3 large:leading-8 leading-7 tablet:leading-5 text-[#575757] font-normal large:text-base text-[15px] tablet:text-[13px]">
                    {item.answer}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="w-full">
        {" "}
        <SectionMessage
          action={() => {
            router.push("https://www.analogueshifts.com/contact");
          }}
          title="Still have questions?"
          highlighted=""
          buttonChildren={
            <>
              <div className="flex-col flex overflow-hidden relative h-4">
                {" "}
                <span className="h-5 leading-4 overflow-hidden duration-300">
                  {" "}
                  Contact Us
                </span>{" "}
                <span className="h-5 leading-4 overflow-hidden absolute translate-y-4 duration-300">
                  {" "}
                  Contact Us
                </span>
              </div>
            </>
          }
          description="Contact our support team for further assistance."
        />
      </div>
    </section>
  );
}