import { Calendar } from "@/components/bookingForm/Calendar";
import { RenderCalendar } from "@/components/bookingForm/RenderCalendar";
import { SubmitButton } from "@/components/SubmitButton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { BookMarked, CalendarX2, Clock, VideoIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

async function getData(username: string, eventUrl: string) {
  const eventType = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        username: username,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,

      user: {
        select: {
          image: true,
          name: true,
          Availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!eventType) {
    return notFound();
  }

  return eventType;
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: { username: string; eventUrl: string };
  searchParams: { date?: string; time?: string };
}) {
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  const eventData = await getData(params.username, params.eventUrl);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px]">
          <CardContent className="grid gap-4 p-5 md:grid-cols-[1fr,auto,1fr]">
            <div>
              <Image
                src={eventData.user.image as string}
                alt={`${eventData.user.name}'s profile picture`}
                className="size-9 rounded-full"
                width={30}
                height={30}
              />
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {eventData.user.name}
              </p>
              <h1 className="mt-2 text-xl font-semibold">{eventData.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {eventData.description}
              </p>

              <div className="mt-5 grid gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {eventData.duration} Mins
                  </span>
                </p>
                <p className="flex items-center">
                  <BookMarked className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {eventData.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />

            <form
              className="flex flex-col gap-y-4"
              // action={createMeetingAction}
            >
              <input type="hidden" name="eventDataId" value={eventData.id} />
              <input type="hidden" name="username" value={params.username} />
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />
              <input
                type="hidden"
                name="meetingLength"
                value={eventData.duration}
              />
              <div className="flex flex-col gap-y-1">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" />
              </div>

              <div className="flex flex-col gap-y-1">
                <Label>Your Email</Label>
                <Input name="email" placeholder="johndoe@gmail.com" />
              </div>

              <SubmitButton text="Book Meeting" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="mx-auto w-full max-w-[1000px]">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
            <div>
              <Image
                src={eventData.user.image as string}
                alt={`${eventData.user.name}'s profile picture`}
                className="size-9 rounded-full"
                width={30}
                height={30}
              />
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {eventData.user.name}
              </p>
              <h1 className="mt-2 text-xl font-semibold">{eventData.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {eventData.description}
              </p>
              <div className="mt-5 grid gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {eventData.duration} Mins
                  </span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {eventData.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />
            <div className="my-4 md:my-0">
              <RenderCalendar daysofWeek={eventData.user.Availability} />
            </div>
            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
