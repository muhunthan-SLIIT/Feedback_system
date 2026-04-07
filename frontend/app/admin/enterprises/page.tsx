"use client";

import { useState, useEffect } from "react";
import { adminEnterpriseApi } from "@/lib/api";
import { EnterpriseList } from "@/components/admin/EnterpriseList";
import { CreateEnterpriseForm } from "@/components/admin/CreateEnterpriseForm";
import { Button } from "@/components/ui/Button";

export default function AdminEnterprisesPage() {
  const [enterprises, setEnterprises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const loadEnterprises = async () => {
      try {
        const data = await adminEnterpriseApi.listEnterprises();
        setEnterprises(data);
      } catch (err) {
        console.error("Failed to load enterprises:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEnterprises();
  }, []);

  const handleEnterpriseCreated = (enterpriseId: string) => {
    // Refresh list and navigate to new enterprise
    adminEnterpriseApi.listEnterprises().then(setEnterprises);
    setShowCreateForm(false);
    // Optional: auto-navigate to new enterprise dashboard
    // window.location.href = `/admin/enterprises/${enterpriseId}`;
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Enterprises</h1>
        {!showCreateForm && (
          <Button onClick={() => setShowCreateForm(true)}>
            + New Enterprise
          </Button>
        )}
      </div>

      {showCreateForm && (
        <div className="card">
          <CreateEnterpriseForm onSuccess={handleEnterpriseCreated} />
          <div className="mt-4">
            <Button
              variant="secondary"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <EnterpriseList enterprises={enterprises} />
    </div>
  );
}
