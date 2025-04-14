"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtensilsCrossed, LogOut, PieChart, BarChart3, LineChart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipItem,
  ChartTooltipLabel,
  ChartTooltipValue,
  ChartXAxis,
  ChartYAxis,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartPie,
} from "@/components/ui/chart"

// Mock data for charts
const monthlyDonations = [
  { month: "Jan", donations: 45 },
  { month: "Feb", donations: 52 },
  { month: "Mar", donations: 48 },
  { month: "Apr", donations: 61 },
  { month: "May", donations: 55 },
]

const donationsByCategory = [
  { name: "Grains", value: 35 },
  { name: "Vegetables", value: 25 },
  { name: "Fruits", value: 20 },
  { name: "Dairy", value: 15 },
  { name: "Other", value: 5 },
]

const ngoActivity = [
  { month: "Jan", claims: 40, distributions: 38 },
  { month: "Feb", claims: 45, distributions: 43 },
  { month: "Mar", claims: 42, distributions: 40 },
  { month: "Apr", claims: 55, distributions: 52 },
  { month: "May", claims: 48, distributions: 45 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn && name) {
      setUserName(name)
    }
  }, [])

  const handleLogout = () => {
    // In a real app, this would sign out from Firebase
    router.push("/")
  }

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">Re-Dish</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/collect" className="text-sm font-medium hover:underline">
              Collect
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {userName ? (
              <span className="text-sm font-medium">Hi, {userName}</span>
            ) : (
              <>
                <Link href="/auth">
                  <Button
                    variant="outline"
                    className="transition-all duration-300 hover:bg-orange-100 hover:text-orange-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform analytics and insights</p>
          </div>
          <Button variant="outline">Download Report</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">261</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active NGOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Claim Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">+4% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Est. Meals Provided</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,842</div>
              <p className="text-xs text-muted-foreground">Based on claimed donations</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Donations</span>
            </TabsTrigger>
            <TabsTrigger value="ngos" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>NGO Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Summary of platform activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer className="h-[300px]" data={monthlyDonations} xAxisKey="month" yAxisKey="donations">
                    <ChartXAxis />
                    <ChartYAxis />
                    <ChartBar
                      className="fill-orange-500"
                      tooltip={
                        <ChartTooltip>
                          <ChartTooltipContent>
                            <ChartTooltipItem>
                              <ChartTooltipLabel>Month</ChartTooltipLabel>
                              <ChartTooltipValue>{({ datum }) => datum.month}</ChartTooltipValue>
                            </ChartTooltipItem>
                            <ChartTooltipItem>
                              <ChartTooltipLabel>Donations</ChartTooltipLabel>
                              <ChartTooltipValue>{({ datum }) => datum.donations}</ChartTooltipValue>
                            </ChartTooltipItem>
                          </ChartTooltipContent>
                        </ChartTooltip>
                      }
                    />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Donations by Category</CardTitle>
                  <CardDescription>Distribution of food types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer className="h-[300px]" data={donationsByCategory} xAxisKey="name" yAxisKey="value">
                      <ChartPie
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        tooltip={
                          <ChartTooltip>
                            <ChartTooltipContent>
                              <ChartTooltipItem>
                                <ChartTooltipLabel>Category</ChartTooltipLabel>
                                <ChartTooltipValue>{({ datum }) => datum.name}</ChartTooltipValue>
                              </ChartTooltipItem>
                              <ChartTooltipItem>
                                <ChartTooltipLabel>Percentage</ChartTooltipLabel>
                                <ChartTooltipValue>{({ datum }) => `${datum.value}%`}</ChartTooltipValue>
                              </ChartTooltipItem>
                            </ChartTooltipContent>
                          </ChartTooltip>
                        }
                      />
                      <ChartLegend />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Donation Trends</CardTitle>
                  <CardDescription>Last 5 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer className="h-[300px]" data={monthlyDonations} xAxisKey="month" yAxisKey="donations">
                      <ChartXAxis />
                      <ChartYAxis />
                      <ChartLine
                        className="stroke-orange-500"
                        strokeWidth={2}
                        tooltip={
                          <ChartTooltip>
                            <ChartTooltipContent>
                              <ChartTooltipItem>
                                <ChartTooltipLabel>Month</ChartTooltipLabel>
                                <ChartTooltipValue>{({ datum }) => datum.month}</ChartTooltipValue>
                              </ChartTooltipItem>
                              <ChartTooltipItem>
                                <ChartTooltipLabel>Donations</ChartTooltipLabel>
                                <ChartTooltipValue>{({ datum }) => datum.donations}</ChartTooltipValue>
                              </ChartTooltipItem>
                            </ChartTooltipContent>
                          </ChartTooltip>
                        }
                      />
                      <ChartArea className="fill-orange-500/20" />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ngos" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NGO Activity</CardTitle>
                <CardDescription>Claims vs. Distributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer className="h-[300px]" data={ngoActivity} xAxisKey="month" yAxisKey="claims">
                    <ChartXAxis />
                    <ChartYAxis />
                    <ChartLine
                      dataKey="claims"
                      className="stroke-blue-500"
                      strokeWidth={2}
                      tooltip={
                        <ChartTooltip>
                          <ChartTooltipContent>
                            <ChartTooltipItem>
                              <ChartTooltipLabel>Month</ChartTooltipLabel>
                              <ChartTooltipValue>{({ datum }) => datum.month}</ChartTooltipValue>
                            </ChartTooltipItem>
                            <ChartTooltipItem>
                              <ChartTooltipLabel>Claims</ChartTooltipLabel>
                              <ChartTooltipValue>{({ datum }) => datum.claims}</ChartTooltipValue>
                            </ChartTooltipItem>
                          </ChartTooltipContent>
                        </ChartTooltip>
                      }
                    />
                    <ChartLine
                      dataKey="distributions"
                      className="stroke-green-500"
                      strokeWidth={2}
                      tooltip={
                        <ChartTooltip>
                          <ChartTooltipContent>
                            <ChartTooltipItem>
                              <ChartTooltipLabel>Month</ChartTooltipLabel>
                              <ChartTooltipValue>{({ datum }) => datum.month}</ChartTooltipValue>
                            </ChartTooltipItem>
                            <ChartTooltipItem>
                              <ChartTooltipLabel>Distributions</ChartTooltipLabel>
                              <ChartTooltipValue>{({ datum }) => datum.distributions}</ChartTooltipValue>
                            </ChartTooltipItem>
                          </ChartTooltipContent>
                        </ChartTooltip>
                      }
                    />
                    <ChartLegend />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Re-Dish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

