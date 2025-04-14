"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed } from "lucide-react"
import Link from "next/link"

export default function DonatePage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn && name) {
      setUserName(name)
    }
  }, [])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn) {
      router.push("/donor/dashboard")
    }
  }, [router])

  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
     
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Donate Food</CardTitle>
          <CardDescription>Please sign in to continue with your donation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-gray-500">
            You need to be logged in to make a donation. Please sign in or create an account to continue.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth">
              <Button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                Sign In
              </Button>
            </Link>
            <Link href="/auth?mode=signup">
              <Button
                variant="outline"
                className="transition-all duration-300 hover:bg-orange-100 hover:text-orange-600 transform hover:scale-105"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

