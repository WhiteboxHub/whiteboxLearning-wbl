"use client";

import React, { useEffect, useState } from "react";
import "@/styles/admin.css";
import "@/styles/App.css";
import { ColDef } from "ag-grid-community";
import { AGGridTable } from "@/components/AGGridTable";
import { Badge } from "@/components/admin_ui/badge";
import { Input } from "@/components/admin_ui/input";
import { Label } from "@/components/admin_ui/label";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/admin_ui/button";
import axios from "axios";

// Formatters
const DateFormatter = (params: any) =>
  params.value ? new Date(params.value).toLocaleDateString() : "";

export default function ContactExtractsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendor-contact-extracts`);
      setContacts(res.data);
      setFilteredContacts(res.data);
    } catch (e: any) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredContacts(contacts);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = contacts.filter((contact) =>
        Object.values(contact).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  useEffect(() => {
    if (contacts.length > 0) {
      const defs: ColDef[] = Object.keys(contacts[0]).map((key) => {
        const col: ColDef = {
          field: key,
          headerName: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          width: 180,
          //editable: key !== "moved_to_vendor",
        };

        if (key === "id") {
          col.pinned = "left";
          //col.checkboxSelection = true;
          col.width = 100;
        } else if (key.toLowerCase().includes("date")) {
          col.valueFormatter = DateFormatter;
        } else if (key === "moved_to_vendor") {
          col.cellRenderer = (params: any) => (
            <Badge className={params.value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}>
              {params.value ? "Yes" : "No"}
            </Badge>
          );
          //col.editable = false;
        }

        return col;
      });
      setColumnDefs(defs);
    }
  }, [contacts]);

  const handleRowUpdated = async (updatedRow: any) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor-contact/${updatedRow.id}`,
        updatedRow
      );
      setFilteredContacts((prev) =>
        prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleRowDeleted = async (id: number | string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/vendor-contact/${id}`);
      setFilteredContacts((prev) => prev.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleMoveToVendor = async () => {
    // move button functionality need to apply through api
    console.log("Move button clicked");
    alert("Move to vendor not yet implemented.");
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vendor Contact Extracts</h1>
        <p>Daily extracted contacts.</p>
      </div>

      <div className="max-w-md">
        <Label htmlFor="search">Search Contacts</Label>
        <div className="relative mt-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Move Button  */}
      <div className="flex justify-end pr-28">
        <Button
          onClick={handleMoveToVendor}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Move
        </Button>
      </div>

      <AGGridTable
        rowData={filteredContacts}
        columnDefs={columnDefs}
        title={`All Contacts (${filteredContacts.length})`}
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
