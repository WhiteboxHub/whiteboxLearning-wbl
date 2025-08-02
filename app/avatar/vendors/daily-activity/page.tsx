"use client";

import React, { useEffect, useState } from "react";
import { ColDef } from "ag-grid-community";
import { AGGridTable } from "@/components/AGGridTable";
import { Badge } from "@/components/admin_ui/badge";
import { Input } from "@/components/admin_ui/input";
import { Label } from "@/components/admin_ui/label";
import { SearchIcon } from "lucide-react";
import axios from "axios";

const YesNoRenderer = (params: any) => {
  const value = params?.value?.toString().toUpperCase();
  const cls =
    value === "YES"
      ? "bg-green-100 text-green-800"
      : value === "NO"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  return <Badge className={cls}>{value}</Badge>;
};

const DateFormatter = (params: any) =>
  params.value ? new Date(params.value).toLocaleDateString() : "";

export default function DailyVendorActivityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activities, setActivities] = useState<any[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/daily-vendor-activities`
      );
      setActivities(res.data);
      setFilteredActivities(res.data);
    } catch (e: any) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    const lower = searchTerm.trim().toLowerCase();
    if (!lower) return setFilteredActivities(activities);

    const filtered = activities.filter(
      (row) =>
        row.vendor_id?.toString().includes(lower) ||
        row.employee_id?.toString().includes(lower)
    );
    setFilteredActivities(filtered);
  }, [searchTerm, activities]);

  useEffect(() => {
    if (activities.length > 0) {
      const defs: ColDef[] = Object.keys(activities[0]).map((key) => {
        const col: ColDef = {
          field: key,
          headerName: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          width: 150,
          editable: key !== "activity_id" && key !== "created_at",
        };

        if (key.toLowerCase().includes("date")) col.valueFormatter = DateFormatter;
        if (key === "linkedin_connected" || key === "contacted_on_linkedin")
          col.cellRenderer = YesNoRenderer;
        if (key === "activity_id") {
          col.pinned = "left";
          //col.checkboxSelection = true;
          col.width = 100;
        }
        return col;
      });

      setColumnDefs(defs);
    }
  }, [activities]);

  const handleRowUpdated = async (updatedRow: any) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/daily-vendor-activities/${updatedRow.activity_id}`,
        updatedRow
      );
      setFilteredActivities((prev) =>
        prev.map((r) =>
          r.activity_id === updatedRow.activity_id ? updatedRow : r
        )
      );
    } catch (e) {
      console.error("Update failed", e);
    }
  };

  const handleRowDeleted = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/daily-vendor-activities/${id}`
      );
      setFilteredActivities((prev) =>
        prev.filter((row) => row.activity_id !== id)
      );
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Daily Vendor Activities</h1>
        <p>Track daily vendor activities.</p>
      </div>

      <div className="max-w-md">
        <Label htmlFor="search">Search</Label>
        <div className="relative mt-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter vendor ID or employee ID..."
            className="pl-10"
          />
        </div>
      </div>

      <AGGridTable
        rowData={filteredActivities.slice(
          (page - 1) * pageSize,
          page * pageSize
        )}
        columnDefs={columnDefs}
        title={`Vendor Activities (${filteredActivities.length})`}
        height="calc(70vh)"
        onRowUpdated={handleRowUpdated}
        onRowDeleted={handleRowDeleted}
        showSearch={false}
      />

      <div className="flex justify-between items-center mt-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-2 py-1 border rounded text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-2 py-1 border rounded text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
