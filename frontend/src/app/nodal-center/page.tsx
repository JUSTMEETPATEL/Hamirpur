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
import { DashboardChart } from "@/components/dashboard-chart"
import { RequestsTable } from "@/components/requests-table"

export default function NodalCenterDashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Prevent hydration mismatch by mounting after client-side render
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

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

            {/* Dashboard Overview */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">500</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Items Processed</CardTitle>
                    <Layers className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">350</div>
                    <p className="text-xs text-muted-foreground">70% of total requests</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
                    <Badge variant="outline" className="font-normal">₹5,00,000</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹5,00,000</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">E-waste Categories</CardTitle>
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Electronics, Batteries, PCBs</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>E-Waste Processing Trends</CardTitle>
                    <CardDescription>Monthly breakdown of Reduce, Reuse, and Recycle classifications</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <DashboardChart />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>ML Model Classification Distribution</CardTitle>
                    <CardDescription>Current distribution across 3R categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Reduce</span>
                          </div>
                          <div className="ml-auto">25%</div>
                        </div>
                        <Progress value={25} className="h-2 bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Reuse</span>
                          </div>
                          <div className="ml-auto">40%</div>
                        </div>
                        <Progress value={40} className="h-2 bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <Recycle className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium">Recycle</span>
                          </div>
                          <div className="ml-auto">35%</div>
                        </div>
                        <Progress value={35} className="h-2 bg-muted" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-1">
                      <h4 className="text-sm font-medium">Sustainability Impact</h4>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-md border p-4">
                        <div>
                          <div className="text-2xl font-bold">2.5</div>
                          <div className="text-xs text-muted-foreground">Tons CO₂ Reduced</div>
                        </div>
                        <div className="sm:ml-auto">
                          <div className="text-2xl font-bold">4.8</div>
                          <div className="text-xs text-muted-foreground">Tons Diverted from Landfill</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Request #{1000 + i}</p>
                            <p className="text-xs text-muted-foreground">Laptop - Working condition</p>
                          </div>
                          <Badge variant="outline">{i === 1 ? "Reuse" : i === 2 ? "Recycle" : "Reduce"}</Badge>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View All Requests
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Device Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Laptops & Computers", count: 152, icon: <Smartphone className="h-4 w-4" /> },
                        { name: "Mobile Devices", count: 98, icon: <Smartphone className="h-4 w-4" /> },
                        { name: "Peripherals", count: 73, icon: <Smartphone className="h-4 w-4" /> },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="rounded-full bg-muted p-2">
                            {item.icon}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{item.name}</p>
                            <Progress value={(item.count / 350) * 100} className="h-1 mt-2" />
                          </div>
                          <div className="text-sm font-medium">{item.count}</div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View All Categories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming Collections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Collection #{i}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(2023, 5, 10 + i * 2).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge>{i * 5} items</Badge>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* E-Waste Requests */}
            <TabsContent value="requests" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">E-Waste Request Processing</h2>
                  <p className="text-muted-foreground">Manage and process incoming ML-classified e-waste requests</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    New Request
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>ML-Classified Requests</CardTitle>
                  <CardDescription>These items have been classified by the ML model based on uploaded images</CardDescription>
                </CardHeader>
                <CardContent>
                  <RequestsTable />
                </CardContent>
              </Card>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Classification Accuracy</CardTitle>
                    <CardDescription>Manual verification of ML model classifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">ML Model Accuracy</h3>
                          <span className="text-sm font-bold">92.4%</span>
                        </div>
                        <Progress value={92.4} className="h-2" />
                      </div>
                      
                      <div className="rounded-md border p-4 space-y-3">
                        <h3 className="text-sm font-medium">Classification Corrections</h3>
                        <div className="flex justify-between items-center text-sm">
                          <span>Total Processed Items</span>
                          <span>350</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Manual Corrections Needed</span>
                          <span>27</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>False Positives</span>
                          <span>14</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>False Negatives</span>
                          <span>13</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Processing Queue</CardTitle>
                    <CardDescription>Current status of the e-waste processing pipeline</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <h3 className="text-sm font-medium">Awaiting Processing</h3>
                          </div>
                          <span className="text-sm font-medium">45 items</span>
                        </div>
                        <Progress value={45} max={150} className="h-2" />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <h3 className="text-sm font-medium">In Processing</h3>
                          </div>
                          <span className="text-sm font-medium">68 items</span>
                        </div>
                        <Progress value={68} max={150} className="h-2" />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <h3 className="text-sm font-medium">Processed</h3>
                          </div>
                          <span className="text-sm font-medium">350 items</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <Button variant="outline" className="w-full mt-2">Manage Processing Queue</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Waste Analytics */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">E-Waste Analytics</h2>
                  <p className="text-muted-foreground">Analysis of processed e-waste and ML model performance</p>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>E-Waste Classification Trends</CardTitle>
                    <CardDescription>Monthly trends of 3R categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 lg:h-72 flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Monthly trend visualization</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Success Rate of Reuse</CardTitle>
                    <CardDescription>Percentage of items successfully reused</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 lg:h-72 flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-green-500">68%</div>
                        <p className="text-sm text-muted-foreground mt-2">Successful Reuse Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>ML Model Accuracy</CardTitle>
                    <CardDescription>Classification accuracy over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 lg:h-72 flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Accuracy trend visualization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Impact</CardTitle>
                  <CardDescription>Environmental benefits of e-waste management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">CO₂ Reduction</h3>
                      <div className="h-40 lg:h-48 flex items-center justify-center border rounded-md">
                        <div className="text-center">
                          <div className="text-4xl font-bold">2.5 tons</div>
                          <p className="text-sm text-muted-foreground mt-2">Total CO₂ emissions prevented</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Landfill Diversion</h3>
                      <div className="h-40 lg:h-48 flex items-center justify-center border rounded-md">
                        <div className="text-center">
                          <div className="text-4xl font-bold">4.8 tons</div>
                          <p className="text-sm text-muted-foreground mt-2">E-waste diverted from landfills</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md border p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">152</div>
                      <p className="text-sm text-muted-foreground text-center mt-1">Devices Refurbished</p>
                    </div>
                    <div className="rounded-md border p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">87</div>
                      <p className="text-sm text-muted-foreground text-center mt-1">Parts Salvaged</p>
                    </div>
                    <div className="rounded-md border p-4 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">114</div>
                      <p className="text-sm text-muted-foreground text-center mt-1">Properly Recycled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Server Traffic */}
            <TabsContent value="traffic" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">Server Traffic Analysis</h2>
                  <p className="text-muted-foreground">Monitor system performance and ML model usage</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-1 h-4 w-4" />
                    Last 7 Days
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-1 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                    <Database className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,541</div>
                    <p className="text-xs text-muted-foreground">+18% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">ML Model Inferences</CardTitle>
                    <ServerCrash className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,832</div>
                    <p className="text-xs text-muted-foreground">+12% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                    <Badge variant="outline" className="font-normal">450ms</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">450ms</div>
                    <p className="text-xs text-muted-foreground text-green-500">-15ms from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
                    <Badge variant="outline" className="font-normal text-green-500">99.98%</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">99.98%</div>
                    <p className="text-xs text-muted-foreground">30 days with no outages</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Server Load & API Traffic</CardTitle>
                    <CardDescription>Real-time monitoring of server performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Server traffic visualization</p>
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
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Memory</span>
                          <span className="text-sm font-medium">62%</span>
                        </div>
                        <Progress value={62} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Storage</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Network</span>
                          <span className="text-sm font-medium">34%</span>
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
                    <CardTitle>ML Model Performance</CardTitle>
                    <CardDescription>Inference times and model efficiency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Average Inference Time</h3>
                        <span className="text-sm font-bold">235ms</span>
                      </div>
                      
                      <div className="rounded-md border p-4 space-y-3">
                        <h3 className="text-sm font-medium">Model Performance</h3>
                        <div className="flex justify-between items-center text-sm">
                          <span>Total Inferences</span>
                          <span>1,832</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Fastest Inference</span>
                          <span>198ms</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Slowest Inference</span>
                          <span>412ms</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Inference Errors</span>
                          <span>12 (0.65%)</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        View Full Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Events</CardTitle>
                    <CardDescription>Recent alerts and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { 
                          type: "info", 
                          message: "System update completed successfully", 
                          time: "2 hours ago",
                          icon: <RefreshCw className="h-4 w-4" />
                        },
                        { 
                          type: "warning", 
                          message: "High CPU usage detected", 
                          time: "5 hours ago",
                          icon: <ServerCrash className="h-4 w-4" />
                        },
                        { 
                          type: "error", 
                          message: "ML model inference timeout", 
                          time: "1 day ago",
                          icon: <ServerCrash className="h-4 w-4" />
                        },
                      ].map((event, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className={`rounded-full p-2 ${
                            event.type === "info" ? "bg-blue-100 text-blue-600" : 
                            event.type === "warning" ? "bg-amber-100 text-amber-600" : 
                            "bg-red-100 text-red-600"
                          }`}>
                            {event.icon}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{event.message}</p>
                            <p className="text-xs text-muted-foreground">{event.time}</p>
                          </div>
                          <Badge variant={
                            event.type === "info" ? "default" : 
                            event.type === "warning" ? "outline" : 
                            "destructive"
                          }>
                            {event.type}
                          </Badge>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View All Events
                      </Button>
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