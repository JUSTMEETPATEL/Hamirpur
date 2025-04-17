"use client"

import { useState } from "react"
import { RefreshCw, ShoppingBag, Recycle, MoreHorizontal, Eye } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for the requests table
const requests = [
  {
    id: "REQ-1001",
    sender: "Tech Solutions Ltd.",
    type: "Laptop - Working",
    date: "2023-06-01",
    status: "Pending",
  },
  {
    id: "REQ-1002",
    sender: "University Department",
    type: "Desktop - Damaged",
    date: "2023-06-02",
    status: "Pending",
  },
  {
    id: "REQ-1003",
    sender: "Individual User",
    type: "Mobile - Working",
    date: "2023-06-03",
    status: "Under Process",
  },
  {
    id: "REQ-1004",
    sender: "School Lab",
    type: "Printer - Damaged",
    date: "2023-06-04",
    status: "Pending",
  },
  {
    id: "REQ-1005",
    sender: "Government Office",
    type: "Server - Working",
    date: "2023-06-05",
    status: "Under Process",
  },
]

export function RequestsTable() {
  const [requestsData, setRequestsData] = useState(requests)

  const handleDecision = (id: string, decision: string) => {
    setRequestsData(
      requestsData.map((request) => (request.id === id ? { ...request, status: "Under Process", decision } : request)),
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Sender</TableHead>
          <TableHead>Item Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Decision</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requestsData.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.id}</TableCell>
            <TableCell>{request.sender}</TableCell>
            <TableCell>{request.type}</TableCell>
            <TableCell>{request.date}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  request.status === "Pending"
                    ? "text-amber-500"
                    : request.status === "Under Process"
                      ? "text-blue-500"
                      : "text-green-500"
                }
              >
                {request.status}
              </Badge>
            </TableCell>
            <TableCell>
              {request.status === "Pending" ? (
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDecision(request.id, "Reduce")}
                  >
                    <RefreshCw className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Reduce</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDecision(request.id, "Reuse")}
                  >
                    <ShoppingBag className="h-4 w-4 text-blue-500" />
                    <span className="sr-only">Reuse</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDecision(request.id, "Recycle")}
                  >
                    <Recycle className="h-4 w-4 text-amber-500" />
                    <span className="sr-only">Recycle</span>
                  </Button>
                </div>
              ) : (
<Badge variant="outline">{"Processing"}</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Assign to staff</DropdownMenuItem>
                  <DropdownMenuItem>Send notification</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Cancel request</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
