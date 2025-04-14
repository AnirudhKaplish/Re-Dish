"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UtensilsCrossed, Mic, MicOff, Send, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi there! How can I help you today?", isUser: false },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [userName, setUserName] = useState<string | null>(null)

  // Check if speech recognition is supported
  useEffect(() => {
    setSpeechSupported("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  }, [])

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn && name) {
      setUserName(name)
    }
  }, [])

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;
  
    setMessages((prev) => [...prev, { text: inputMessage, isUser: true }]);
  
    setTimeout(() => {
      const lowerMsg = inputMessage.toLowerCase().trim();
      let response: string | React.ReactNode = "Thanks for your message! Our team will get back to you soon.";
  
      if (["hi", "hello", "hey", "hlo"].includes(lowerMsg)) {
        response = "Hello! How can I assist you today?";
      } else if (lowerMsg.includes("admin")) {
        response = (
          <div>
            <p>Looking to sign up as an admin? Click the button below:</p>
            <a href="/auth?role=admin">
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Admin Sign Up
              </button>
            </a>
          </div>
        );
      } else if (lowerMsg.includes("how are you")) {
        response = "I'm just a bot, but I'm functioning perfectly! 😊";
      } else if (lowerMsg.includes("hours") || lowerMsg.includes("timing")) {
        response = "We're open Monday to Friday, 9 AM to 5 PM.";
      } else if (lowerMsg.includes("donate")) {
        response = "You can donate food by logging in as a donor and creating a new donation listing.";
      } else if (lowerMsg.includes("ngo")) {
        response = "NGOs can register on our platform to claim available food donations.";
      } else if (lowerMsg.includes("who can donate")) {
        response = "Anyone can donate! Just sign in as a donor and create a listing.";
      } else if (lowerMsg.includes("how to donate food")) {
        response = "To donate food, log in as a donor and click on 'Create Donation' to list your surplus food.";
      } else if (lowerMsg.includes("register as ngo")) {
        response = "Go to the signup page and select NGO. Fill in the required details and start claiming food donations!";
      } else if (lowerMsg.includes("individual") && lowerMsg.includes("claim")) {
        response = "Yes, individuals in need can register and claim available donations.";
      } else if (lowerMsg.includes("collect food")) {
        response = "Once a donation is posted, registered NGOs or individuals can claim it and coordinate pickup.";
      } else if (lowerMsg.includes("where are you located")) {
        response = "Our team operates out of V.I.T Chennai.";
      } else if (lowerMsg.includes("contact number")) {
        response = "+91 62802-68308";
      } else if (lowerMsg.includes("email")) {
        response = "info@redish.example.com";
      } else if (lowerMsg.includes("volunteer")) {
        response = "Absolutely! Please contact us through email and mention your interest in volunteering.";
      } else if (lowerMsg.includes("login")) {
        response = "Click on the Login button at the top right and enter your credentials.";
      } else if (lowerMsg.includes("sign up")) {
        response = "Click on Sign Up, choose your role (Donor/NGO/Individual), and fill out the form.";
      } else if (["bye", "goodbye"].includes(lowerMsg)) {
        response = "Goodbye! Feel free to reach out again. 😊";
      } else if (["thank you", "thanks", "ty"].includes(lowerMsg)) {
        response = "You're welcome! Always happy to help.";
      }
  
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 1000);
  
    setInputMessage("");
  };
  
  

  const toggleSpeechRecognition = () => {
    if (!speechSupported) return

    if (isListening) {
      setIsListening(false)
      return
    }

    setIsListening(true)

    // Use the Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInputMessage(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  }

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
      <main className="flex-1 container py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions about Re-Dish? We're here to help.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-orange-500"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-gray-500">+91 62802-68308</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-orange-500"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-gray-500">info@redish.example.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-orange-500"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-gray-500">V.I.T Chennai</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="First name..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Lastname..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="email@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Type your message here..." className="min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isChatOpen ? (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Open chat</span>
          </Button>
        ) : (
          <Card className="w-80 md:w-96 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Re-Dish Assistant</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsChatOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <CardDescription>Ask me anything about Re-Dish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] overflow-y-auto space-y-4 pr-2">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        message.isUser ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      {!message.isUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 mt-1"
                          onClick={() => speakText(message.text)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                          <span className="sr-only">Speak</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1"
                />
                {speechSupported && (
                  <Button type="button" variant="outline" size="icon" onClick={toggleSpeechRecognition}>
                    {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
                    <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
                  </Button>
                )}
                <Button type="submit" size="icon" className="bg-orange-500 hover:bg-orange-600">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        )}
      </div>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">Re-Dish</span>
          </div>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Re-Dish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

