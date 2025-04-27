"use client"

import { useEffect, useState } from "react"
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Database,
  FileText,
  Layers,
  LayoutDashboard,
  Recycle,
  RefreshCw,
  ServerCrash,
  Settings,
  ShoppingBag,
  Smartphone,
  Upload,
  Download,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Area,
  AreaChart,
  LineChart as RechartsLineChart
} from "recharts";


// Backend API URL - replace with your actual backend URL
const API_URL = "http://localhost:5000/api";

export default function NodalCenterDashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  
  // State for system data
  const [systemData, setSystemData] = useState({
    cpu: {
      percent: 0,
      per_cpu: [] as number[],
      frequency: "N/A",
      cores: 0,
      threads: 0,
      history: []
    },
    memory: {
      total: "0 GB",
      available: "0 GB",
      used: "0 GB",
      percent: 0,
      swap_total: "0 GB",
      swap_used: "0 GB",
      swap_percent: 0,
      history: []
    },
    disk: {
      partitions: {},
      io_stats: {},
      history: []
    },
    network: {
      ip_address: "0.0.0.0",
      hostname: "Unknown",
      bytes_sent: "0 B",
      bytes_recv: "0 B",
      packets_sent: 0,
      packets_recv: 0,
      upload_speed: "0 B/s",
      download_speed: "0 B/s",
      history: []
    },
    system: {
      hostname: "Unknown",
      ip_address: "0.0.0.0",
      os_info: "Unknown",
      timestamp: ""
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch system data
  const fetchSystemData = async () => {
    try {
      const response = await fetch(`${API_URL}/system`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSystemData(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching system data:", err);
      setError("Failed to fetch system data. Check if the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data initially and set up polling
  useEffect(() => {
    fetchSystemData();
    
    // Set up polling every 5 seconds
    const intervalId = setInterval(() => {
      fetchSystemData();
    }, 5000);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Prevent hydration mismatch by mounting after client-side render
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Function to format disk partitions into an array for rendering
  const formatDiskPartitions = () => {
    if (!systemData.disk.partitions) return [];
    return Object.entries(systemData.disk.partitions).map(([device, info]) => ({
      device,
      percent: (info as { percent?: number })?.percent || 0, // Ensure percent is included
      used: (info as { used?: string })?.used || "N/A", // Ensure used is included
      ...(typeof info === "object" && info !== null ? info : {}),
      total: (info as { total?: string })?.total || "N/A" // Ensure total is included
    }));
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Image src="/pics/logo.png" alt="NIT Hamirpur Logo" width={40} height={40} className="h-8 w-auto" />
          <h1 className="text-sm font-semibold sm:text-lg tracking-tight">Nodal Center - NIT Hamirpur</h1>
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <Button variant="outline" size="icon" className="relative h-8 w-8">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-xs">4</Badge>
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Image src="/placeholder-user.jpg" alt="User" width={24} height={24} className="h-6 w-6 rounded-full" />
                <span className="hidden md:inline-flex">Admin User</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "overview"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard Overview
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "requests"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setActiveTab("requests")}
            >
              <FileText className="h-4 w-4" />
              E-Waste Requests
              <Badge className="ml-auto">12</Badge>
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "analytics"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="h-4 w-4" />
              Waste Analytics
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "traffic"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setActiveTab("traffic")}
            >
              <ServerCrash className="h-4 w-4" />
              Server Traffic
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center md:hidden">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">
                  <LayoutDashboard className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline-flex">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex-1">
                  <FileText className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline-flex">Requests</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1">
                  <BarChart3 className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline-flex">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="traffic" className="flex-1">
                  <ServerCrash className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline-flex">Traffic</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Dashboard Overview - Now using real system data */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">System Info</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{systemData.system.hostname}</div>
                    <p className="text-xs text-muted-foreground">{systemData.system.os_info}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                    <Layers className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemData.cpu.percent.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">{systemData.cpu.cores} cores / {systemData.cpu.threads} threads</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                    <Badge variant="outline" className="font-normal">{systemData.memory.percent.toFixed(1)}%</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemData.memory.used}</div>
                    <p className="text-xs text-muted-foreground">of {systemData.memory.total}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Network Traffic</CardTitle>
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{systemData.network.download_speed}</div>
                    <p className="text-xs text-muted-foreground">↑ {systemData.network.upload_speed}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>System Performance</CardTitle>
                    <CardDescription>Real-time monitoring data from the server</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <DashboardChart systemData={systemData} />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Resource Distribution</CardTitle>
                    <CardDescription>Current system resource utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">CPU Usage</span>
                          </div>
                          <div className="ml-auto">{systemData.cpu.percent.toFixed(1)}%</div>
                        </div>
                        <Progress value={systemData.cpu.percent} className="h-2 bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Memory Usage</span>
                          </div>
                          <div className="ml-auto">{systemData.memory.percent.toFixed(1)}%</div>
                        </div>
                        <Progress value={systemData.memory.percent} className="h-2 bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <Recycle className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium">Swap Usage</span>
                          </div>
                          <div className="ml-auto">{systemData.memory.swap_percent.toFixed(1)}%</div>
                        </div>
                        <Progress value={systemData.memory.swap_percent} className="h-2 bg-muted" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-1">
                      <h4 className="text-sm font-medium">Network Information</h4>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-md border p-4">
                        <div>
                          <div className="text-sm font-bold">{systemData.network.ip_address}</div>
                          <div className="text-xs text-muted-foreground">IP Address</div>
                        </div>
                        <div className="sm:ml-auto">
                          <div className="text-sm font-bold">{systemData.network.hostname}</div>
                          <div className="text-xs text-muted-foreground">Hostname</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Disk Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {formatDiskPartitions().slice(0, 3).map((partition, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <Database className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{partition.device}</p>
                            <Progress value={partition.percent} className="h-1 mt-2" />
                            <p className="text-xs text-muted-foreground">{partition.used} of {partition.total}</p>
                          </div>
                          <Badge variant="outline">{partition.percent}%</Badge>
                        </div>
                      ))}
                      {formatDiskPartitions().length > 3 && (
                        <Button variant="outline" className="w-full">
                          View All Partitions
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>CPU Cores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemData.cpu.per_cpu.map((value, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <Layers className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Core {i + 1}</p>
                            <Progress value={value} className="h-1 mt-2" />
                          </div>
                          <div className="text-sm font-medium">{value.toFixed(1)}%</div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">CPU Frequency</p>
                        <p className="text-sm font-medium">{systemData.cpu.frequency}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Network Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
                          <Upload className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Upload</p>
                          <p className="text-xs text-muted-foreground">Total: {systemData.network.bytes_sent}</p>
                        </div>
                        <Badge>{systemData.network.upload_speed}</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
                          <Download className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Download</p>
                          <p className="text-xs text-muted-foreground">Total: {systemData.network.bytes_recv}</p>
                        </div>
                        <Badge>{systemData.network.download_speed}</Badge>
                      </div>
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Packets Sent</span>
                          <span className="text-sm font-medium">{systemData.network.packets_sent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Packets Received</span>
                          <span className="text-sm font-medium">{systemData.network.packets_recv.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" onClick={fetchSystemData}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Stats
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Server Traffic - Now using real system data */}
            <TabsContent value="traffic" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">Server Traffic Analysis</h2>
                  <p className="text-muted-foreground">Monitor system performance in real-time</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-1 h-4 w-4" />
                    Last 7 Days
                  </Button>
                  <Button size="sm" onClick={fetchSystemData}>
                    <RefreshCw className="mr-1 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                    <Database className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemData.cpu.percent.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">{systemData.cpu.cores} cores / {systemData.cpu.threads} threads</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                    <ServerCrash className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemData.memory.percent.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">{systemData.memory.used} of {systemData.memory.total}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Network Speed</CardTitle>
                    <Badge variant="outline" className="font-normal">{systemData.network.download_speed}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemData.network.download_speed}</div>
                    <p className="text-xs text-muted-foreground">Upload: {systemData.network.upload_speed}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">System Info</CardTitle>
                    <Badge variant="outline" className="font-normal">{systemData.system.hostname}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-md font-bold">{systemData.system.os_info}</div>
                    <p className="text-xs text-muted-foreground">IP: {systemData.network.ip_address}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>CPU & Memory Load</CardTitle>
                    <CardDescription>Real-time monitoring of system resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Resource usage data from the backend API</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Utilization</CardTitle>
                    <CardDescription>Current system resource usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">CPU</span>
                          <span className="text-sm font-medium">{systemData.cpu.percent.toFixed(1)}%</span>
                        </div>
                        <Progress value={systemData.cpu.percent} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Memory</span>
                          <span className="text-sm font-medium">{systemData.memory.percent.toFixed(1)}%</span>
                        </div>
                        <Progress value={systemData.memory.percent} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Swap</span>
                          <span className="text-sm font-medium">{systemData.memory.swap_percent.toFixed(1)}%</span>
                        </div>
                        <Progress value={systemData.memory.swap_percent} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Network</span>
                          <span className="text-sm font-medium">{systemData.network.download_speed}</span>
                        </div>
                        <Progress value={34} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Disk Usage</CardTitle>
                    <CardDescription>Storage utilization by partition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {formatDiskPartitions().map((partition, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium">{partition.device}</h3>
                            <span className="text-sm font-bold">{partition.percent}%</span>
                          </div>
                          <Progress value={partition.percent} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Used: {partition.used}</span>
                            <span>Free: {parseFloat(partition.total) - parseFloat(partition.used)} GB</span>
                            <span>Total: {partition.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Events</CardTitle>
                    <CardDescription>Recent system activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { 
                          type: "info", 
                          message: `System data fetched at ${new Date().toLocaleTimeString()}`, 
                          time: "Just now",
                          icon: <RefreshCw className="h-4 w-4" />
                        },
                        { 
                          type: "info", 
                          message: `CPU: ${systemData.cpu.percent.toFixed(1)}%, Memory: ${systemData.memory.percent.toFixed(1)}%`, 
                          time: "Current status",
                          icon: <ServerCrash className="h-4 w-4" />
                        },
                        { 
                          type: "info", 
                          message: `Network: ↓${systemData.network.download_speed}, ↑${systemData.network.upload_speed}`, 
                          time: "Current status",
                          icon: <Upload className="h-4 w-4" />
                        },
                        { 
                          type: "warning", 
                          message: "Dashboard monitoring started", 
                          time: "On page load",
                          icon: <LayoutDashboard className="h-4 w-4" />
                        }
                      ].map((event, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className={`rounded-full p-2 ${event.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                            {event.icon}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{event.message}</p>
                            <p className="text-xs text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* E-Waste Requests Tab */}
            <TabsContent value="requests" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">E-Waste Requests</h2>
                  <p className="text-muted-foreground">Manage e-waste disposal requests from departments</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-1 h-4 w-4" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-1 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Active Requests</CardTitle>
                  <CardDescription>Recent e-waste collection requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <LocalRequestsTable />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Waste Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">Waste Analytics</h2>
                  <p className="text-muted-foreground">E-waste processing statistics and trends</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-1 h-4 w-4" />
                    Last 30 Days
                  </Button>
                  <Button size="sm">
                    <FileText className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total E-Waste</CardTitle>
                    <Recycle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,298 kg</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recycled</CardTitle>
                    <Badge variant="outline" className="font-normal">82%</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,065 kg</div>
                    <p className="text-xs text-muted-foreground">Processed successfully</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                    <Badge variant="outline" className="font-normal">12</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">187 kg</div>
                    <p className="text-xs text-muted-foreground">Awaiting processing</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2 tons</div>
                    <p className="text-xs text-muted-foreground">CO₂ equivalent saved</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Monthly E-Waste Collection</CardTitle>
                    <CardDescription>Trend of e-waste collection over the past year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Analytics chart would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// Additional component for the Network charts
type SystemData = {
  cpu: {
    percent: number;
    per_cpu: number[];
    frequency: string;
    cores: number;
    threads: number;
    history: [number, number][];
  };
  memory: {
    total: string;
    available: string;
    used: string;
    percent: number;
    swap_total: string;
    swap_used: string;
    swap_percent: number;
    history: [number, number][];
  };
  disk: {
    partitions: Record<string, { percent?: number; used?: string; total?: string }>;
    io_stats: Record<string, unknown>;
    history: unknown[];
  };
  network: {
    ip_address: string;
    hostname: string;
    bytes_sent: string;
    bytes_recv: string;
    packets_sent: number;
    packets_recv: number;
    upload_speed: string;
    download_speed: string;
    history: [number, number, number][];
  };
  system: {
    hostname: string;
    ip_address: string;
    os_info: string;
    timestamp: string;
  };
};

function DashboardChart({ systemData }: { systemData: SystemData }) {
  const [chartData, setChartData] = useState<{ time: string; cpu: number; memory: number; upload: number; download: number; }[]>([]);
  
  // Process the history data from system data
  useEffect(() => {
    if (!systemData) return;
    
    // Combine CPU and memory history into a unified dataset for the chart
    const processedData = [];
    
    // Get the last 20 entries if they exist
    const cpuHistory = systemData?.cpu?.history || [];
    const memoryHistory = systemData?.memory?.history || [];
    const networkHistory = systemData?.network?.history || [];
    
    // Take the last 20 entries for visualization
    const lastEntries = Math.min(20, cpuHistory.length);
    
    for (let i = 0; i < lastEntries; i++) {
      const cpuEntry = cpuHistory[cpuHistory.length - lastEntries + i];
      const memoryEntry = memoryHistory[memoryHistory.length - lastEntries + i];
      const networkEntry = networkHistory[networkHistory.length - lastEntries + i];
      
      if (cpuEntry && memoryEntry) {
        // Format the timestamp to be more readable
        const timestamp = new Date(cpuEntry[0]);
        const timeStr = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        processedData.push({
          time: timeStr,
          cpu: cpuEntry[1],
          memory: memoryEntry[1],
          upload: networkEntry ? parseFloat((networkEntry[1] / 1024 / 1024).toFixed(2)) : 0,
          download: networkEntry ? parseFloat((networkEntry[2] / 1024 / 1024).toFixed(2)) : 0,
        });
      }
    }
    
    setChartData(processedData);
  }, [systemData]);

  return (
    <div className="space-y-6">
      {/* CPU and Memory Usage Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip formatter={(value) => [`${value}%`, '']} />
            <Legend />
            <Line
              name="CPU Usage"
              type="monotone"
              dataKey="cpu"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              name="Memory Usage"
              type="monotone"
              dataKey="memory"
              stroke="#82ca9d"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Network Traffic Chart */}
      <div className="h-64">
        <h3 className="text-lg font-medium mb-2">Network Traffic (MB/s)</h3>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} MB/s`, '']} />
            <Legend />
            <Area
              name="Download"
              type="monotone"
              dataKey="download"
              stroke="#2563eb"
              fill="#93c5fd"
              fillOpacity={0.6}
            />
            <Area
              name="Upload"
              type="monotone"
              dataKey="upload"
              stroke="#dc2626"
              fill="#fca5a5"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
// Additional component for the Requests table
function LocalRequestsTable() {
  const requests = [
    {
      id: "REQ-001",
      department: "Computer Science",
      items: "Laptops, Monitors",
      quantity: "12",
      status: "Processing",
      date: "2025-04-25"
    },
    {
      id: "REQ-002",
      department: "Electronics Engineering",
      items: "Circuit boards, Testing equipment",
      quantity: "8",
      status: "Pending",
      date: "2025-04-26"
    },
    {
      id: "REQ-003",
      department: "Administration",
      items: "Printers, Scanners",
      quantity: "5",
      status: "Completed",
      date: "2025-04-22"
    },
    {
      id: "REQ-004",
      department: "Library",
      items: "Desktop computers",
      quantity: "7",
      status: "Pending",
      date: "2025-04-27"
    },
    {
      id: "REQ-005",
      department: "Mechanical Engineering",
      items: "Control systems, Old machinery",
      quantity: "3",
      status: "Processing",
      date: "2025-04-24"
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium">Request ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Department</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Items</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-b">
              <td className="px-4 py-3 text-sm">{request.id}</td>
              <td className="px-4 py-3 text-sm">{request.department}</td>
              <td className="px-4 py-3 text-sm">{request.items}</td>
              <td className="px-4 py-3 text-sm">{request.quantity}</td>
              <td className="px-4 py-3 text-sm">
                <Badge className={
                  request.status === "Completed" ? "bg-green-100 text-green-800" :
                  request.status === "Processing" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }>
                  {request.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-sm">{request.date}</td>
              <td className="px-4 py-3 text-sm">
                <Button variant="ghost" size="sm">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}