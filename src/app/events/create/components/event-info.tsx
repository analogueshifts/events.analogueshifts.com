"use client";
import React, { useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/application/tiptap/tiptap";
import { AnimatePresence, motion } from "framer-motion";

interface EventInfo {
  isOpen: boolean;
  toggleSection: any;
  eventInfoData: any;
  setEventInfoData: (data: any) => void;
}

const EventInfo: React.FC<EventInfo> = ({
  isOpen,
  toggleSection,
  eventInfoData,
  setEventInfoData,
}) => {
  const [category, setCategory] = useState("");

  // Checks If All the required info field Has been Field
  const validate = () => {
    if (
      eventInfoData.title.trim().length &&
      eventInfoData.description.trim().length &&
      eventInfoData.email.trim().length &&
      eventInfoData.price.trim().length &&
      eventInfoData.maximum.trim().length
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Update Value of eventInfo
  const updateValue = (label: string, value: string) => {
    setEventInfoData((prev: any) => {
      return { ...prev, [label]: value };
    });
  };

  return (
    <div
      className={`section w-full rounded-lg border-2 hover:border-background-darkYellow ${
        isOpen
          ? "open border-background-darkYellow"
          : "closed border-gray-700/10"
      }`}
      onClick={() => toggleSection("info")}
    >
      <div
        className={`rounded-lg overflow-hidden flex-col p-5 ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <div
          className={`ml-auto w-9 h-9 flex items-center justify-center rounded-full  ${
            validate()
              ? "bg-green-600 text-white"
              : "bg-gray-700/5 text-background-darkYellow"
          }`}
        >
          {validate() ? <Check width={20} /> : <Plus width={20} />}
        </div>
        <h2 className="text-primary-boulder900 tablet:text-xl text-3xl font-bold mb-3.5">
          <b>{validate() ? eventInfoData.title : "Event Title"}</b>
        </h2>
        <p className="text-primary-boulder900 font-medium text-sm">
          {validate() ? eventInfoData.title : "Event Description"}
        </p>
      </div>
      {isOpen && (
        <div className="w-full rounded-lg overflow-hidden h-max p-6 flex flex-col">
          <h4 className="text-primary-boulder900 font-bold text-xl mb-6">
            Event Overview
          </h4>
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Your email
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter your email address. Attendes will contact you with this email
            if they have any question.
          </p>
          <Input
            type="email"
            value={eventInfoData.email}
            onChange={(e) => updateValue("email", e.target.value)}
            placeholder="Enter Email"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Your contact
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter your contact. Attendes will contact you with this number if
            they have any question.
          </p>
          <Input
            type="text"
            value={eventInfoData.contact}
            onChange={(e) => updateValue("contact", e.target.value)}
            placeholder="Enter Contact"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event title
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Be clear and descriptive with a title that tells people what your
            event is about.
          </p>
          <Input
            type="text"
            value={eventInfoData.title}
            onChange={(e) => updateValue("title", e.target.value)}
            placeholder="Event Title"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event categories
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Select the categories your event fall under.
          </p>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (!eventInfoData.category.includes(e.target.value)) {
                setEventInfoData((prev: any) => {
                  return {
                    ...prev,
                    category: [...prev.category, e.target.value],
                  };
                });
              }
            }}
            className="unclose w-full text-sm font-medium border rounded-md outline-none px-2 text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-3"
          >
            <option value="Tech">Tech</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Foods & Drinks">Foods & Drinks</option>
            <option value="Hobbies">Hobbies</option>
            <option value="Business">Business</option>
          </select>
          <div className="mb-6 w-full h-max min-h-[120px] rounded-md border flex gap-2 flex-wrap p-3">
            <AnimatePresence initial={false} mode="popLayout">
              {eventInfoData.category.map((item: string, index: number) => {
                return (
                  <motion.div
                    layout
                    key={index}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring" }}
                    className="bg-background-darkYellow w-max h-8 rounded-[2px] flex items-center px-1.5 py-1"
                  >
                    <p className="text-white text-[13px] font-normal">
                      {item?.toUpperCase()}
                    </p>
                    <button
                      type="button"
                      className="outline-none bg-none"
                      onClick={() =>
                        setEventInfoData((prev: any) => {
                          return {
                            ...prev,
                            category: prev.category.filter(
                              (v: any) => v !== item
                            ),
                          };
                        })
                      }
                    >
                      <X className="text-white" width={18} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event summary
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Grab people&apos;s attention with a description about your event.
            Attendees will see this at the top of your event page.
          </p>

          <div className="w-full mb-6">
            <Tiptap
              changed={(e) => updateValue("description", e)}
              initialData={eventInfoData.description}
            />
          </div>

          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Maximum Guests
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter the maximum number of guest you want to have
          </p>
          <Input
            min={1}
            type="number"
            value={eventInfoData.maximum}
            onChange={(e) => updateValue("maximum", e.target.value)}
            placeholder="Enter Maximum"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event Status
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Select the status of your event post
          </p>

          <select
            value={eventInfoData.status}
            onChange={(e) => updateValue("status", e.target.value)}
            className="unclose w-full text-sm font-medium border rounded-md outline-none px-2 text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="draft">Draft</option>
          </select>

          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event Price
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter a default price for your Event Ticket. You will be able to add
            specific prices for different countries once event is created. Enter
            &quot;0&quot; if your Ticket is Free.
          </p>
          <Input
            min={0}
            type="number"
            value={eventInfoData.price}
            onChange={(e) => updateValue("price", e.target.value)}
            placeholder="Event Price"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-3"
          />
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Please Note that Prices are in USD.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventInfo;
