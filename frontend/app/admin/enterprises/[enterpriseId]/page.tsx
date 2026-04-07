"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminEnterpriseApi } from "@/lib/api";
import { EnterpriseDashboard } from "@/components/admin/EnterpriseDashboard";
import { Button } from "@/components/ui/Button";

export default function EnterpriseDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const enterpriseId = params.enterpriseId as string;

  const [enterprise, setEnterprise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEnterprise = async () => {
      try {
        const data = await adminEnterpriseApi.getEnterprise(enterpriseId);
        setEnterprise(data);
      } catch (err: any) {
        if (err.status === 404) {
          setError("Enterprise not found");
        } else {
          setError(err.message || "Failed to load enterprise");
        }
      } finally {
        setLoading(false);
      }
    };
    loadEnterprise();
  }, [enterpriseId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) {
    return (
      <div className="card text-danger">
        <p>{error}</p>
        <Button
          className="mt-4"
          onClick={() => router.push("/admin/enterprises")}
        >
          Back to Enterprises
        </Button>
      </div>
    );
  }
  if (!enterprise) return null;

  return <EnterpriseDashboard enterprise={enterprise} />;
}
