import { UserDashboard } from "@/components/UserDashboard/UserDashboard";
import React from "react";

export default function UsersPage() {
  return (
    <div className="flex items-center justify-center h-[90vh] font-[family-name:var(--font-geist-sans)]">
      <UserDashboard />
    </div>
  );
}
