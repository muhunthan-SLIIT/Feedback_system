"use client";

import { useState } from "react";
import { adminEnterpriseApi } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ValidationErrors } from "@/components/admin/ValidationErrors";

interface CreateEnterpriseFormProps {
  onSuccess: (enterpriseId: string) => void;
}

export function CreateEnterpriseForm({ onSuccess }: CreateEnterpriseFormProps) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple client validation
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.length < 2)
      newErrors.name = "Name must be at least 2 characters";
    else if (name.length > 100)
      newErrors.name = "Name must be at most 100 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsCreating(true);
    try {
      const created = await adminEnterpriseApi.createEnterprise({
        name: name.trim(),
      });
      onSuccess(created.id);
      setName("");
      setErrors({});
    } catch (err: any) {
      if (err.details) setErrors(err.details);
      else setErrors({ submit: err.message || "Failed to create enterprise" });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="text-lg font-semibold">Create New Enterprise</h3>
      <ValidationErrors errors={errors} />

      <div>
        <label className="block text-sm font-medium mb-1">
          Enterprise Name *
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Acme Support"
          maxLength={100}
          error={errors.name}
          required
        />
      </div>

      <Button type="submit" disabled={isCreating}>
        {isCreating ? "Creating..." : "Create Enterprise"}
      </Button>
    </form>
  );
}
