"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, Award } from "lucide-react"
import Link from "next/link"

const rewards = [
  { name: "₹100 Food Voucher", tokens: 200 },
  { name: "₹250 Shopping Coupon", tokens: 500 },
  { name: "₹500 Restaurant Gift Card", tokens: 1000 },
  { name: "Re-Dish Merchandise", tokens: 1500 },
  { name: "Certificate of Recognition", tokens: 2000 },
]

export default function CollectPage() {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    // In a real app, you'd fetch the user's balance from your backend
    setBalance(1500) // Mock balance
  }, [])

  const claimReward = (tokens: number) => {
    if (balance >= tokens) {
      setBalance(balance - tokens)
      alert("Reward claimed successfully!")
    } else {
      alert("Insufficient GoldenGrain balance")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold">Re-Dish</span>
            </Link>
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
            <span className="text-sm font-medium bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              GoldenGrain Balance: {balance}
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-12">
        <h1 className="text-3xl font-bold mb-6">Claim Your Rewards</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => (
            <Card key={reward.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-500" />
                  {reward.name}
                </CardTitle>
                <CardDescription>{reward.tokens} GoldenGrains</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => claimReward(reward.tokens)}
                  className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                  disabled={balance < reward.tokens}
                >
                  Claim Reward
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-gray-500">© 2025 Re-Dish. All rights reserved.</div>
      </footer>
    </div>
  )
}

