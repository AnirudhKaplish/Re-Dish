"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtensilsCrossed, LogOut, Search, Phone, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for available donations
const availableDonations = [
  {
    id: "1",
    donorName: "Fresh Foods Restaurant",
    address: "123 Main St, Anytown",
    phone: "555-123-4567",
    items: ["Rice (10kg)", "Vegetables (5kg)", "Bread (20 loaves)"],
    expiryDate: "2023-05-20",
    distance: "2.3 km",
  },
  {
    id: "2",
    donorName: "City Bakery",
    address: "456 Oak Ave, Anytown",
    phone: "555-987-6543",
    items: ["Bread (30 loaves)", "Pastries (20 pieces)", "Cakes (5)"],
    expiryDate: "2023-05-19",
    distance: "3.7 km",
  },
  {
    id: "3",
    donorName: "Green Grocers",
    address: "789 Pine Rd, Anytown",
    phone: "555-456-7890",
    items: ["Fruits (15kg)", "Vegetables (8kg)"],
    expiryDate: "2023-05-18",
    distance: "1.5 km",
  },
  {
    id: "4",
    donorName: "School Cafeteria",
    address: "101 School Ln, Anytown",
    phone: "555-789-0123",
    items: ["Sandwiches (25)", "Milk (10L)", "Juice (15L)"],
    expiryDate: "2023-05-17",
    distance: "4.2 km",
  },
]

// Mock data for claimed donations
const claimedDonations = [
  {
    id: "5",
    donorName: "Hotel Grand",
    address: "202 River Rd, Anytown",
    items: ["Rice (15kg)", "Curry (10L)", "Naan (50 pieces)"],
    claimedDate: "2023-05-14",
    status: "Collected",
  },
  {
    id: "6",
    donorName: "Daily Deli",
    address: "303 Mountain Ave, Anytown",
    items: ["Sandwiches (40)", "Salads (15)", "Soups (10L)"],
    claimedDate: "2023-05-12",
    status: "In Transit",
  },
]

export default function NgoDashboard() {
  const [activeTab, setActiveTab] = useState("available")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, this would sign out from Firebase
    router.push("/")
  }

  const localDonations =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("donations") || "[]")
    : [];

const allDonations = [...localDonations, ...availableDonations];

const filteredDonations = allDonations.filter(
  (donation) =>
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.items.some((item: string) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
);


  const handleClaim = (id: string) => {
    // In a real app, this would update the database
    alert(`Claimed donation #${id}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold">Re-Dish</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Hi, Food For All NGO</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">NGO Dashboard</h1>
            <p className="text-muted-foreground">Find and claim available food donations</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search donations..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="available" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="available">Available Donations</TabsTrigger>
            <TabsTrigger value="claimed">Claimed Donations</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDonations.map((donation) => (
                <Card key={donation.id}>
                  <CardHeader>
                    <CardTitle>{donation.donorName}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{donation.address}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{donation.phone}</span>
                      </div>
                      <h4 className="text-sm font-medium mt-4">Available Items:</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                      {donation.items.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                      ))} 
                      </ul>
                      <div className="flex justify-between items-center mt-4 text-sm">
                        <span>Expires: {new Date(donation.expiryDate).toLocaleDateString()}</span>
                        <span className="text-muted-foreground">{donation.distance}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      style={{ backgroundColor: "#4682B4", color: "white" }}
                      onClick={() => handleClaim(donation.id)}
                    >
                      Claim Donation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredDonations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No donations found matching your search.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="claimed" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {claimedDonations.map((donation) => (
                <Card key={donation.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{donation.donorName}</span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          donation.status === "Collected" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{donation.address}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Claimed Items:</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        {donation.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <div className="mt-4 text-sm">
                        <span>Claimed on: {new Date(donation.claimedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
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

