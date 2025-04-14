"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { UtensilsCrossed, LogOut, Plus, Trash2, Camera } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DonorDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState<string>("John Doe") // Default value
  const [foodItems, setFoodItems] = useState([{ name: "", quantity: "", unit: "kg" }])
  const [foodType, setFoodType] = useState("veg")
  const [foodCategories, setFoodCategories] = useState<string[]>([])
  const [expiryDate, setExpiryDate] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [storage, setStorage] = useState("room")
  const [volunteerDelivery, setVolunteerDelivery] = useState("no")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [goldenGrainBalance, setGoldenGrainBalance] = useState(100) // Mock balance

  useEffect(() => {
    // Get user name from localStorage if available
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const [donation, setDonation] = useState({
    donorName: "",
    address: "",
    phone: "",
    items: "", // input as comma-separated string
    expiryDate: "",
  });
  

  const handleLogout = () => {
    // In a real app, this would sign out from Firebase
    localStorage.removeItem("userName")
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  const addFoodItem = () => {
    setFoodItems([...foodItems, { name: "", quantity: "", unit: "kg" }])
  }

  const removeFoodItem = (index: number) => {
    const newItems = [...foodItems]
    newItems.splice(index, 1)
    setFoodItems(newItems)
  }

  const updateFoodItem = (index: number, field: string, value: string) => {
    const newItems = [...foodItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setFoodItems(newItems)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const existing = JSON.parse(localStorage.getItem("donations") || "[]");
  
    const newDonation = {
      ...donation,
      id: Date.now().toString(), // Unique ID
      items: donation.items.split(",").map(item => item.trim()), // Turn string into array
      distance: "2.0 km", // You can hardcode or calculate
      expiryDate: donation.expiryDate, // Use from form
    };
  
    const updated = [newDonation, ...existing];
    localStorage.setItem("donations", JSON.stringify(updated)); // Save to localStorage
  
    alert("Donation submitted successfully!");
  };
  

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
            <span className="text-sm font-medium">Hi, {userName}</span>
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
            <h1 className="text-3xl font-bold tracking-tight">Donor Dashboard</h1>
            <p className="text-muted-foreground">Manage your food donations and GoldenGrain balance</p>
          </div>
          <Card className="w-full md:w-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GoldenGrain Balance</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{goldenGrainBalance}</div>
              <p className="text-xs text-muted-foreground">+50 tokens for your last donation</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Donation</CardTitle>
            <CardDescription>Fill in the details of your food donation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Food Items</h3>
                  {foodItems.map((item, index) => (
                    <div key={index} className="flex items-end gap-3 mb-3">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                        <Input
                          id={`item-name-${index}`}
                          value={item.name}
                          onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                          placeholder="e.g., Rice, Bread, Vegetables"
                        />
                      </div>
                      <div className="w-24 space-y-2">
                        <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`item-quantity-${index}`}
                          value={item.quantity}
                          onChange={(e) => updateFoodItem(index, "quantity", e.target.value)}
                          type="number"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div className="w-24 space-y-2">
                        <Label htmlFor={`item-unit-${index}`}>Unit</Label>
                        <select
                          id={`item-unit-${index}`}
                          value={item.unit}
                          onChange={(e) => updateFoodItem(index, "unit", e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="kg">kg</option>
                          <option value="g">g</option>
                          <option value="L">L</option>
                          <option value="ml">ml</option>
                          <option value="pcs">pcs</option>
                        </select>
                      </div>
                      {foodItems.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFoodItem(index)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addFoodItem} className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Item
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Food Type</Label>
                  <RadioGroup defaultValue="veg" onValueChange={setFoodType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="veg" id="veg" />
                      <Label htmlFor="veg">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-veg" id="non-veg" />
                      <Label htmlFor="non-veg">Non-Vegetarian</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Food Category</Label>
                  <div className="flex flex-wrap gap-4">
                    {["Raw Food", "Cooked Food", "Packaged Food"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={foodCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFoodCategories([...foodCategories, category])
                            } else {
                              setFoodCategories(foodCategories.filter((c) => c !== category))
                            }
                          }}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup-time">Preferred Pickup Time</Label>
                  <select
                    id="pickup-time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a time slot</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage">Storage Requirements</Label>
                  <select
                    id="storage"
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="room">Room Temperature</option>
                    <option value="refrigerated">Refrigerated</option>
                    <option value="frozen">Frozen</option>
                    <option value="immediate">Needs Immediate Consumption</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Volunteer Delivery Option</Label>
                  <RadioGroup defaultValue="no" onValueChange={setVolunteerDelivery}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes-delivery" />
                      <Label htmlFor="yes-delivery">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no-delivery" />
                      <Label htmlFor="no-delivery">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-name">Contact Person Name</Label>
                  <Input
                    id="contact-name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter contact person's name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone Number</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additional-notes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any special instructions or additional information"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photo Upload (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline">
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <span className="text-sm text-muted-foreground">JPEG or PNG, max 5MB</span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Submit Donation
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <p className="text-sm text-gray-500">© 2025 Re-Dish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

