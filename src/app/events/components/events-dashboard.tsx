"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import YourPlan from "./your-plan";
import EventsPagination from "./pagination";
import Image from "next/image";
import EmptyBox from "@/assets/images/empty-box.png";
import Loading from "@/components/application/loading";
import EventGridTile from "./event-grid-tile";
import { fetchEvents } from "@/utils/my-events/fetch-events";

export default function EventsDashboard() {
  const [user, setUser]: any = useState(null);
  const pageQuery = useSearchParams().getAll("page");
  const [events, setEvents]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPageInfo, setCurrentPageInfo]: any = useState({});
  const getEventsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/event${
    pageQuery.length ? `?page=${pageQuery[0]}` : ""
  }`;

  useEffect(() => {
    const authSession = Cookies.get("analogueshifts");
    if (authSession) {
      setUser(JSON.parse(authSession));
    }
  }, []);

  const getEvents = async () => {
    try {
      await fetchEvents(
        getEventsUrl,
        user,
        setLoading,
        setEvents,
        setCurrentPageInfo
      );
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getEvents();
    }
  }, [user]);

  return (
    <main className="my-10 items-start grid grid-cols-7 gap-7 mx-auto w-[90%] max-w-desktop">
      {loading && <Loading />}
      <div className="tablet:col-span-5 col-span-7 flex flex-col gap-10">
        <h1 className="text-primary-boulder700 text-3xl tablet:text-5xl font-bold">
          <b> Welcome, {user?.user?.first_name}</b>
        </h1>
        <div className="p-6 rounded-md border h-max tablet:h-screen max-h-screen">
          <div className="w-full border-b h-16 flex items-center pl-3">
            <h2 className="text-primary-boulder900 text-xl tablet:text-3xl font-bold">
              <b>List of my events</b>
            </h2>
          </div>

          {/* List */}
          <div className="w-full h-max tablet:h-allEventsSection overflow-y-auto">
            {events && (
              <>
                {events.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Image
                      src={EmptyBox}
                      alt="Empty Box"
                      className="max-h-emptyBox w-max"
                    />
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-5 py-5">
                    {events.map((item: any) => {
                      return (
                        <EventGridTile
                          key={item.uuid}
                          item={item}
                          user={user}
                          setLoading={setLoading}
                          getEvents={getEvents}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="w-full border-t h-16 flex items-center justify-center">
            <EventsPagination currentPageInfo={currentPageInfo} />
          </div>
        </div>
      </div>
      <YourPlan />
    </main>
  );
}
