// src/data/sampleData.js

export const sampleData = {
  tourists: [
    {
      id: "NE001",
      name: "Rinchen Tawang",
      location: "Tawang, Arunachal Pradesh",
      lat: 27.5859,
      lng: 91.8656,
      safetyScore: 80,
      status: "Safe",
      lastSeen: "2025-09-21T10:30:00",
      alerts: 0,
      phone: "+91-7000000001",
      hotel: "Tawang Residency",
      itinerary: ["Tawang Monastery", "Nuranang Falls", "Bum La Pass"]
    },
    {
      id: "NE002",
      name: "Mingma Sema",
      location: "Ziro, Arunachal Pradesh",
      lat: 27.6167,
      lng: 93.8000,
      safetyScore: 88,
      status: "Safe",
      lastSeen: "2025-09-21T14:00:00",
      alerts: 0,
      phone: "+91-7000000002",
      hotel: "Ziro Heritage Lodge",
      itinerary: ["Ziro Music Festival", "Dollo Mando", "Talley Valley Wildlife Sanctuary"]
    },
    {
      id: "NE003",
      name: "Anjali Dutta",
      location: "Majuli, Assam",
      lat: 27.6169,
      lng: 94.2129,
      safetyScore: 75,
      status: "Alert",
      lastSeen: "2025-09-21T15:45:00",
      alerts: 1,
      phone: "+91-7000000003",
      hotel: "Riverbank Homestay",
      itinerary: ["Satra Monasteries", "Brahmaputra River Cruise", "Majuli Island Exploration"]
    },
    {
      id: "NE004",
      name: "James Shill",
      location: "Shillong, Meghalaya",
      lat: 25.5740,
      lng: 91.8787,
      safetyScore: 92,
      status: "Safe",
      lastSeen: "2025-09-21T17:00:00",
      alerts: 0,
      phone: "+91-7000000004",
      hotel: "Shillong Plaza",
      itinerary: ["Elephant Falls", "Shillong Peak", "Don Bosco Museum"]
    }
  ],
  incidents: [
    {
      id: "NEI001",
      type: "Theft",
      location: "Tawang Market",
      lat: 27.5883,
      lng: 91.8650,
      severity: "Medium",
      time: "2025-09-21T12:30:00",
      status: "Active",
      touristId: "NE003",
      description: "Wallet stolen from tourist near market area"
    },
    {
      id: "NEI002",
      type: "Lost Tourist",
      location: "Majuli Ferry Point",
      lat: 27.6169,
      lng: 94.2129,
      severity: "Low",
      time: "2025-09-21T14:45:00",
      status: "Active",
      touristId: "NE002",
      description: "Tourist lost during ferry boarding"
    },
    {
      id: "NEI003",
      type: "Medical Emergency",
      location: "Shillong Hospital",
      lat: 25.5850,
      lng: 91.8930,
      severity: "High",
      time: "2025-09-21T15:00:00",
      status: "Resolved",
      touristId: "NE001",
      description: "Tourist hospitalized due to fever and dehydration"
    }
  ],
  policeUnits: [
    {
      id: "NEU001",
      badgeNumber: "AP123",
      location: "Tawang Station",
      lat: 27.5850,
      lng: 91.8600,
      status: "Available",
      officerName: "Officer Tashi",
      contact: "Radio AP001"
    },
    {
      id: "NEU002",
      badgeNumber: "AS456",
      location: "Majuli Outpost",
      lat: 27.6180,
      lng: 94.2100,
      status: "On Patrol",
      officerName: "Officer Baruah",
      contact: "Radio AS002"
    },
    {
      id: "NEU003",
      badgeNumber: "ML789",
      location: "Shillong HQ",
      lat: 25.5745,
      lng: 91.8790,
      status: "Emergency",
      officerName: "Officer Kharkongor",
      contact: "Radio ML003"
    }
  ],
  alerts: [
    {
      id: "NEA001",
      type: "Panic Button",
      priority: "High",
      time: "2025-09-21T15:30:00",
      touristId: "NE003",
      location: "Majuli Ferry",
      status: "Active",
      description: "Tourist activated panic button during incident"
    },
    {
      id: "NEA002",
      type: "Geo-fence Breach",
      priority: "Medium",
      time: "2025-09-21T16:00:00",
      touristId: "NE002",
      location: "Restricted Forest Area, Arunachal",
      status: "Investigating",
      description: "Tourist entered restricted forest zone"
    },
    {
      id: "NEA003",
      type: "Anomaly Detection",
      priority: "Low",
      time: "2025-09-21T16:15:00",
      touristId: "NE004",
      location: "Police HQ, Shillong",
      status: "Resolved",
      description: "Unusual movement near police headquarter"
    }
  ]
};
