import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Example data type
type Document = {
  id: string
  title: string
  type: string
  status: "pending" | "completed" | "in_review"
  riskScore: number
  lastModified: string
}

// Sample data
const documents: Document[] = [
  {
    id: "1",
    title: "Employment Contract",
    type: "Contract",
    status: "completed",
    riskScore: 85,
    lastModified: "2025-10-30",
  },
  {
    id: "2",
    title: "Non-Disclosure Agreement",
    type: "Agreement",
    status: "in_review",
    riskScore: 45,
    lastModified: "2025-11-01",
  },
  {
    id: "3",
    title: "Service Level Agreement",
    type: "Agreement",
    status: "completed",
    riskScore: 92,
    lastModified: "2025-10-28",
  },
  {
    id: "4",
    title: "Property Lease",
    type: "Lease",
    status: "pending",
    riskScore: 78,
    lastModified: "2025-11-02",
  },
  {
    id: "5",
    title: "Partnership Agreement",
    type: "Agreement",
    status: "in_review",
    riskScore: 65,
    lastModified: "2025-10-25",
  },
  {
    id: "6",
    title: "Software License",
    type: "License",
    status: "completed",
    riskScore: 35,
    lastModified: "2025-11-01",
  },
  {
    id: "7",
    title: "Terms of Service",
    type: "Legal",
    status: "pending",
    riskScore: 88,
    lastModified: "2025-10-29",
  },
  {
    id: "8",
    title: "Privacy Policy",
    type: "Legal",
    status: "completed",
    riskScore: 72,
    lastModified: "2025-10-31",
  }
]

// Column definitions
const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Document Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "completed"
              ? "success"
              : status === "in_review"
              ? "warning"
              : "default"
          }
        >
          {status.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "riskScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Risk Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const score = row.getValue("riskScore") as number
      return (
        <div className="flex items-center">
          <div
            className={`h-2 w-full rounded-full ${
              score > 75
                ? "bg-red-500"
                : score > 50
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="ml-2 font-medium">{score}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "lastModified",
    header: "Last Modified",
    cell: ({ row }) => {
      return new Date(row.getValue("lastModified")).toLocaleDateString()
    },
  },
]

export function DocumentsTable() {
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={documents}
        searchKey="title"
      />
    </div>
  )
}