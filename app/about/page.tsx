"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function AboutPage() {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn && name) {
      setUserName(name)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-orange-600">About Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn more about our mission, team, and how we're making a difference in the community.
          </p>
        </div>

        <div className="space-y-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Card className="bg-gradient-to-r from-orange-100 to-pink-100 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    We are a passionate team committed to addressing the issue of food waste in India. Our mission is to
                    create a seamless system that connects food donors with charities and NGOs while significantly
                    reducing the environmental impact of food waste.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-1/2">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/team.jpg?height=300&width=500`}
                alt="Our mission"
                className="rounded-lg shadow-lg object-cover w-full h-auto"
                width={500}
                height={300}
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg?height=200&width=200`}
                  alt="Archita"
                  className="rounded-full shadow-lg mb-4 object-cover"
                  width={200}
                  height={200}
                />
                <Card className="bg-blue-50 w-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">Archita</CardTitle>
                    <CardDescription>Founder</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Passionate about reducing food waste and helping communities. With a background in social
                      entrepreneurship, Archita leads our mission to connect surplus food with those who need it most.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder.svg?height=200&width=200`}
                  alt="Anirudh"
                  className="rounded-full shadow-lg mb-4 object-cover"
                  width={200}
                  height={200}
                />
                <Card className="bg-green-50 w-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">Anirudh</CardTitle>
                    <CardDescription>Co-Founder</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Dedicated to creating innovative solutions for food redistribution. Anirudh brings technical
                      expertise and a passion for sustainability to our platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/vit.jpg?height=300&width=500`}
                alt="Chennai office"
                className="rounded-lg shadow-lg object-cover w-full h-auto"
                width={500}
                height={300}
              />
            </div>
            <div className="md:w-1/2">
              <Card className="bg-gray-50 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-600">Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <p>Chennai, India</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <p>+91 (62802-68308)</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <p>admin@redish.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-gray-500">© 2025 Re-Dish. All rights reserved.</div>
      </footer>
    </div>
  )
}

