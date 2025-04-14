"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UtensilsCrossed, LogOut, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

export default function DonorDonatePage() {
  const router = useRouter()
  const [foodItems, setFoodItems] = useState([{ name: "", quantity: "", unit: "kg" }])
  const [expiryDate, setExpiryDate] = useState("")
  const [pickupAddress, setPickupAddress] = useState("")
  const [pickupInstructions, setPickupInstructions] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleLogout = () => {
    // In a real app, this would sign out from Firebase
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
    e.preventDefault()
    // In a real app, this would save to Firebase
    alert("Donation submitted successfully!")
    router.push("/donor/dashboard")
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
            <span className="text-sm font-medium">Hi, John Doe</span>
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
            <h1 className="text-3xl font-bold tracking-tight">Create New Donation</h1>
            <p className="text-muted-foreground">Fill in the details of your food donation</p>
          </div>
          <Link href="/donor/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Donation Details</CardTitle>
            <CardDescription>Please provide accurate information about the food items you're donating.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Food Items</h3>
                  <p className="text-sm text-muted-foreground mb-4">List all food items you wish to donate</p>

                  {foodItems.map((item, index) => (
                    <div key={index} className="flex items-end gap-3 mb-3">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                        <Input
                          id={`item-name-${index}`}
                          value={item.name}
                          onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                          placeholder="e.g., Rice, Bread, Vegetables"
                          required
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
                          required
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
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFoodItem(index)}
                          className="mb-2"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
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
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">The date by which the food should be consumed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup-address">Pickup Address</Label>
                  <Textarea
                    id="pickup-address"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter the full address where the food can be picked up"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup-instructions">Pickup Instructions (Optional)</Label>
                  <Textarea
                    id="pickup-instructions"
                    value={pickupInstructions}
                    onChange={(e) => setPickupInstructions(e.target.value)}
                    placeholder="Any special instructions for pickup (e.g., 'Ring doorbell', 'Ask for manager')"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone Number</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Enter phone number for coordination"
                    required
                  />
                </div>

                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    required
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                    <p className="text-xs text-muted-foreground">
                      I confirm that the food is safe for consumption and properly packaged.
                    </p>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={!termsAccepted}>
                Submit Donation
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Re-Dish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

