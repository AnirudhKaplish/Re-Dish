// This is a mock implementation of Firebase authentication and database
// In a real app, you would use the actual Firebase SDK

export interface User {
  uid: string
  email: string
  displayName: string
  role: "donor" | "ngo" | "admin"
}

export interface Donation {
  id: string
  donorId: string
  donorName: string
  address: string
  phone: string
  items: { name: string; quantity: string; unit: string }[]
  expiryDate: string
  status: "available" | "claimed" | "expired"
  claimedBy?: string
  claimedDate?: string
  createdAt: string
}

// Mock authentication functions
export const auth = {
  currentUser: null as User | null,

  signInWithEmailAndPassword: async (email: string, password: string): Promise<User> => {
    // Simulate authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock user based on email
        if (email.includes("admin")) {
          auth.currentUser = {
            uid: "admin-123",
            email,
            displayName: "Anirudh",
            role: "admin",
          }
        } else if (email.includes("ngo")) {
          auth.currentUser = {
            uid: "ngo-123",
            email,
            displayName: "Food For All NGO",
            role: "ngo",
          }
        } else {
          auth.currentUser = {
            uid: "donor-123",
            email,
            displayName: "John Doe",
            role: "donor",
          }
        }
        resolve(auth.currentUser)
      }, 500)
    })
  },

  signInWithGoogle: async (): Promise<User> => {
    // Simulate Google authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        auth.currentUser = {
          uid: "google-123",
          email: "user@example.com",
          displayName: "Google User",
          role: "donor",
        }
        resolve(auth.currentUser)
      }, 500)
    })
  },

  signOut: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        auth.currentUser = null
        resolve()
      }, 500)
    })
  },
}

// Mock database functions
export const database = {
  donations: [] as Donation[],

  addDonation: async (donation: Omit<Donation, "id" | "createdAt">): Promise<Donation> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDonation = {
          ...donation,
          id: `donation-${Date.now()}`,
          createdAt: new Date().toISOString(),
        } as Donation
        database.donations.push(newDonation)
        resolve(newDonation)
      }, 500)
    })
  },

  getDonations: async (filters?: Partial<Donation>): Promise<Donation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = database.donations

        if (filters) {
          result = result.filter((donation) => {
            return Object.entries(filters).every(([key, value]) => {
              return donation[key as keyof Donation] === value
            })
          })
        }

        resolve(result)
      }, 500)
    })
  },

  updateDonation: async (id: string, updates: Partial<Donation>): Promise<Donation> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = database.donations.findIndex((d) => d.id === id)
        if (index === -1) {
          reject(new Error("Donation not found"))
          return
        }

        database.donations[index] = {
          ...database.donations[index],
          ...updates,
        }

        resolve(database.donations[index])
      }, 500)
    })
  },
}

// Initialize with some mock data
database.donations = [
  {
    id: "1",
    donorId: "donor-123",
    donorName: "John Doe",
    address: "123 Main St, Anytown",
    phone: "555-123-4567",
    items: [
      { name: "Rice", quantity: "5", unit: "kg" },
      { name: "Vegetables", quantity: "2", unit: "kg" },
      { name: "Bread", quantity: "10", unit: "pcs" },
    ],
    expiryDate: "2023-05-20",
    status: "claimed",
    claimedBy: "Food For All NGO",
    claimedDate: "2023-05-15",
    createdAt: "2023-05-10T10:00:00Z",
  },
  {
    id: "2",
    donorId: "donor-123",
    donorName: "John Doe",
    address: "123 Main St, Anytown",
    phone: "555-123-4567",
    items: [
      { name: "Pasta", quantity: "3", unit: "kg" },
      { name: "Sauce", quantity: "2", unit: "L" },
      { name: "Canned Beans", quantity: "10", unit: "pcs" },
    ],
    expiryDate: "2023-05-15",
    status: "claimed",
    claimedBy: "Hunger Relief Foundation",
    claimedDate: "2023-05-10",
    createdAt: "2023-05-05T10:00:00Z",
  },
  {
    id: "3",
    donorId: "donor-123",
    donorName: "John Doe",
    address: "123 Main St, Anytown",
    phone: "555-123-4567",
    items: [
      { name: "Fruits", quantity: "4", unit: "kg" },
      { name: "Milk", quantity: "5", unit: "L" },
      { name: "Cereal", quantity: "2", unit: "kg" },
    ],
    expiryDate: "2023-05-05",
    status: "expired",
    createdAt: "2023-05-01T10:00:00Z",
  },
]

