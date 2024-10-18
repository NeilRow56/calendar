"use client";

import { SubmitButton } from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

import { useFormState } from "react-dom";

const OnboardingPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="text-xl font-bold">
              Welcome to Cal<span className="text-primary">Marshal</span>
            </p>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your profile
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Jan marshal" />
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>

              <div className="flex rounded-md">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-muted bg-muted px-3 text-sm text-muted-foreground">
                  CalMarshal.com
                </span>
                <Input />
              </div>
            </div>
          </CardContent>
          <CardFooter className="w-full">
            <SubmitButton className="w-full" text="Submit" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OnboardingPage;
