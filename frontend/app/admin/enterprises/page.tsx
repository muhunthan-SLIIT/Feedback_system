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

  // Calculate basic stats
  const totalEnterprises = enterprises.length;
  const activeEnterprises = enterprises.filter(ent => {
    const createdDate = new Date(ent.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate >= thirtyDaysAgo;
  }).length;

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your enterprises and feedback systems</p>
          </div>
          {!showCreateForm && (
            <Button onClick={() => setShowCreateForm(true)} className="px-6 py-3">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Enterprise
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-blue-100 text-sm font-medium">Total Enterprises</p>
                <p className="text-2xl font-bold">{totalEnterprises}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-green-100 text-sm font-medium">Active Enterprises</p>
                <p className="text-2xl font-bold">{activeEnterprises}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-purple-100 text-sm font-medium">System Health</p>
                <p className="text-2xl font-bold">Healthy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Form Section */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Create New Enterprise</h2>
            <Button
              variant="secondary"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </Button>
          </div>
          <CreateEnterpriseForm onSuccess={handleEnterpriseCreated} />
        </div>
      )}

      {/* Enterprises List */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Enterprises</h2>
          <div className="text-sm text-gray-500">
            {totalEnterprises} enterprise{totalEnterprises !== 1 ? 's' : ''}
          </div>
        </div>
        <EnterpriseList enterprises={enterprises} />
      </div>
    </div>
  );
}
