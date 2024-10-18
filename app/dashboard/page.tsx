import { requireUser } from "@/lib/hooks";

import React from "react";

export default async function DashboardPage() {
  const session = await requireUser();

  return <div>Dashboard Page</div>;
}
