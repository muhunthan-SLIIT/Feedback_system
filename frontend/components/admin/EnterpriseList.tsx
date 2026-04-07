"use client";

import { Enterprise } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface EnterpriseListProps {
  enterprises: Enterprise[];
}

export function EnterpriseList({ enterprises }: EnterpriseListProps) {
  if (enterprises.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No enterprises yet. Create one to get started.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {enterprises.map((ent) => (
        <div key={ent.id} className="card flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{ent.name}</h3>
            <p className="text-sm text-gray-500">ID: {ent.id}</p>
            <p className="text-xs text-gray-400">
              Created: {new Date(ent.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/enterprises/${ent.id}`}>
              <Button variant="secondary" size="sm">
                Manage
              </Button>
            </Link>
            <Link href={`/admin/enterprises/${ent.id}/session-feedback-form`}>
              <Button size="sm">Configure Form</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
