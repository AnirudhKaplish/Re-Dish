"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtensilsCrossed, User, Building2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [activeTab, setActiveTab] = useState("donor")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [id, setId] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const roleParam = searchParams.get("role")
    const modeParam = searchParams.get("mode")

    if (roleParam) setActiveTab(roleParam)
    if (modeParam === "signup") setIsLogin(false)
  }, [searchParams])

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === "admin") {
      if ((id === "1907" && password === "Anirudh") || (id === "1902" && password === "Archita")) {
        router.push(`/admin/dashboard?name=${id === "1907" ? "Anirudh" : "Archita"}`)
      } else {
        alert("Invalid admin credentials")
      }
      return
    }

    if (isLogin) {
      // Handle login
      if (activeTab === "donor") {
        router.push(`/?name=${email.split("@")[0]}`)
      } else if (activeTab === "ngo") {
        router.push("/ngo/dashboard")
      }
    } else {
      // Handle signup - ensure we have name, email, and password
      if (!name || !email || !password) {
        alert("Please fill in all fields")
        return
      }

      // In a real app, you would register the user in your database
      localStorage.setItem("userName", name)
      localStorage.setItem("userEmail", email)
      localStorage.setItem("isLoggedIn", "true")

      router.push(`/?name=${name}`)
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
        </div>
      </header>

      <main className="flex-1 container flex items-center justify-center py-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to Re-Dish</h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Sign in to your account" : "Create a new account"}
            </p>
          </div>

          {activeTab === "admin" ? (
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Sign in to access admin dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleAuth}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-id">Admin ID</Label>
                      <Input
                        id="admin-id"
                        placeholder="Enter your admin ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" style={{ backgroundColor: "#556B2F", color: "white" }}>
                      Sign In
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="donor" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="donor" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Donor</span>
                </TabsTrigger>
                <TabsTrigger value="ngo" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>NGO</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="donor">
                <Card>
                  <CardHeader>
                    <CardTitle>{isLogin ? "Donor Login" : "Donor Sign Up"}</CardTitle>
                    <CardDescription>
                      {isLogin ? "Sign in to manage your food donations" : "Create an account to start donating"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleAuth}>
                      <div className="space-y-4">
                        {!isLogin && (
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              placeholder="Enter your name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required={!isLogin}
                            />
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                          {isLogin ? "Sign In" : "Sign Up"}
                        </Button>
                      </div>
                    </form>
                    <div className="text-center text-sm">
                      {isLogin ? (
                        <p>
                          Don't have an account?{" "}
                          <button onClick={() => setIsLogin(false)} className="text-orange-500 hover:underline">
                            Sign Up
                          </button>
                        </p>
                      ) : (
                        <p>
                          Already have an account?{" "}
                          <button onClick={() => setIsLogin(true)} className="text-orange-500 hover:underline">
                            Login
                          </button>
                        </p>
                      )}
                    </div>
                    {isLogin && (
                      <>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          <svg
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                          >
                            <path
                              fill="currentColor"
                              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                          </svg>
                          Google
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ngo">
                <Card>
                  <CardHeader>
                    <CardTitle>{isLogin ? "NGO Login" : "NGO Sign Up"}</CardTitle>
                    <CardDescription>
                      {isLogin ? "Sign in to claim available food donations" : "Create an account for your NGO"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleAuth}>
                      <div className="space-y-4">
                        {!isLogin && (
                          <div className="space-y-2">
                            <Label htmlFor="ngo-name">NGO Name</Label>
                            <Input
                              id="ngo-name"
                              placeholder="Enter NGO name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required={!isLogin}
                            />
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="ngo-email">Email</Label>
                          <Input
                            id="ngo-email"
                            type="email"
                            placeholder="organization@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ngo-password">Password</Label>
                          <Input
                            id="ngo-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" style={{ backgroundColor: "#4682B4", color: "white" }}>
                          {isLogin ? "Sign In" : "Sign Up"}
                        </Button>
                      </div>
                    </form>
                    <div className="text-center text-sm">
                      {isLogin ? (
                        <p>
                          Don't have an account?{" "}
                          <button onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline">
                            Sign Up
                          </button>
                        </p>
                      ) : (
                        <p>
                          Already have an account?{" "}
                          <button onClick={() => setIsLogin(true)} className="text-blue-500 hover:underline">
                            Login
                          </button>
                        </p>
                      )}
                    </div>
                    {isLogin && (
                      <>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          <svg
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                          >
                            <path
                              fill="currentColor"
                              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                          </svg>
                          Google
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <p className="text-sm text-gray-500">© 2025 Re-Dish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

