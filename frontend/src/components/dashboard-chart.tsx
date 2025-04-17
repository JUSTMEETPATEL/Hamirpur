"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"

export function DashboardChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const data = [
    {
      name: "Jan",
      reduce: 30,
      reuse: 45,
      recycle: 35,
    },
    {
      name: "Feb",
      reduce: 25,
      reuse: 50,
      recycle: 40,
    },
    {
      name: "Mar",
      reduce: 35,
      reuse: 55,
      recycle: 30,
    },
    {
      name: "Apr",
      reduce: 40,
      reuse: 60,
      recycle: 45,
    },
    {
      name: "May",
      reduce: 30,
      reuse: 65,
      recycle: 50,
    },
    {
      name: "Jun",
      reduce: 45,
      reuse: 70,
      recycle: 55,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="reduce" name="Reduce" fill="#22c55e" />
        <Bar dataKey="reuse" name="Reuse" fill="#3b82f6" />
        <Bar dataKey="recycle" name="Recycle" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}
