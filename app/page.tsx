"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, UtensilsCrossed, Users, Award, LogOut } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const handleLogout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("isLoggedIn")
    setUserName(null)
  }

  useEffect(() => {
    const name = searchParams.get("name")
    if (name) {
      setUserName(name)
      localStorage.setItem("userName", name)
      localStorage.setItem("isLoggedIn", "true")
    } else {
      const storedName = localStorage.getItem("userName")
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      if (isLoggedIn && storedName) {
        setUserName(storedName)
      }
    }
  }, [searchParams])

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
              <>
                <span className="text-sm font-medium">Hi, {userName}</span>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </>
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
                  <Button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-100 to-pink-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Donate Surplus Food, Reduce Waste
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Join Re-Dish in our mission to connect food donors with NGOs and make a positive impact on our
                  community.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/donate">
                  <Button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                    Donate Food
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                {!userName && (
                  <>
                    <Link href="/auth?role=ngo">
                      <Button
                        variant="outline"
                        className="transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 transform hover:scale-105"
                      >
                        NGO Login
                      </Button>
                    </Link>
                    <Link href="/auth?role=donor">
                      <Button
                        variant="outline"
                        className="transition-all duration-300 hover:bg-green-100 hover:text-green-600 transform hover:scale-105"
                      >
                        Donor Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How Re-Dish Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-orange-100 p-3 mb-4">
                  <UtensilsCrossed className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Donate Surplus Food</h3>
                <p className="text-gray-500">
                  Restaurants, caterers, and individuals can easily donate excess food through our platform.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-100 p-3 mb-4">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">NGOs Claim Donations</h3>
                <p className="text-gray-500">
                  Registered NGOs can browse and claim available food donations for distribution.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <Award className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Earn GoldenGrain Tokens</h3>
                <p className="text-gray-500">
                  Donors receive GoldenGrain tokens for their contributions, redeemable for exciting rewards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-olive-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Mission</h2>
                <p className="text-gray-500 md:text-xl">
                  Be part of the solution to reduce food waste and help those in need. Sign up today and start making a
                  difference in your community.
                </p>
                <Link href="/signup">
                  <Button className="bg-sienna-500 hover:bg-sienna-600">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/food.jpg?height=400&width=400`}
                  alt="Food donation illustration"
                  className="rounded-lg object-cover"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">Re-Dish</span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/a.k.n.e.e.r.u.d.e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              Instagram
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Twitter
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              LinkedIn
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Facebook
            </a>
          </div>
          <p className="text-sm text-gray-500">© 2025 Re-Dish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
