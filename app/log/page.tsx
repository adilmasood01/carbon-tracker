"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Car, Home, Utensils, Plus, CheckCircle } from "lucide-react"
import Link from "next/link"

const transportOptions = [
  { value: "car", label: "Car", emission: 0.21 },
  { value: "bus", label: "Bus", emission: 0.08 },
  { value: "train", label: "Train", emission: 0.04 },
  { value: "bike", label: "Bicycle", emission: 0 },
  { value: "walk", label: "Walking", emission: 0 },
  { value: "plane", label: "Airplane", emission: 0.25 },
]

const energyOptions = [
  { value: "electricity", label: "Electricity", emission: 0.5 },
  { value: "gas", label: "Natural Gas", emission: 2.3 },
  { value: "heating", label: "Heating Oil", emission: 2.7 },
]

const foodOptions = [
  { value: "beef", label: "Beef", emission: 27 },
  { value: "pork", label: "Pork", emission: 12 },
  { value: "chicken", label: "Chicken", emission: 6.9 },
  { value: "fish", label: "Fish", emission: 6.1 },
  { value: "dairy", label: "Dairy", emission: 3.2 },
  { value: "vegetables", label: "Vegetables", emission: 2 },
  { value: "fruits", label: "Fruits", emission: 1.1 },
]

export default function LogActivity() {
  const [activeTab, setActiveTab] = useState("transport")
  const [activities, setActivities] = useState([])
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    unit: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
  })

  const handleSubmit = (category: string) => {
    if (!formData.type || !formData.amount) return

    const options = category === "transport" ? transportOptions : category === "energy" ? energyOptions : foodOptions
    const selectedOption = options.find((opt) => opt.value === formData.type)
    const emission = selectedOption ? selectedOption.emission * Number.parseFloat(formData.amount) : 0

    const newActivity = {
      id: Date.now(),
      category,
      type: formData.type,
      amount: formData.amount,
      unit: getUnit(category),
      emission: emission.toFixed(2),
      notes: formData.notes,
      date: formData.date,
      time: formData.time,
    }

    setActivities([newActivity, ...activities])
    setFormData({
      type: "",
      amount: "",
      unit: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
    })
  }

  const getUnit = (category: string) => {
    switch (category) {
      case "transport":
        return "km"
      case "energy":
        return "kWh"
      case "food":
        return "servings"
      default:
        return "units"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "transport":
        return <Car className="h-4 w-4" />
      case "energy":
        return <Home className="h-4 w-4" />
      case "food":
        return <Utensils className="h-4 w-4" />
      default:
        return <Plus className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "transport":
        return "bg-chart-1/10 text-chart-1"
      case "energy":
        return "bg-chart-2/10 text-chart-2"
      case "food":
        return "bg-chart-3/10 text-chart-3"
      default:
        return "bg-chart-4/10 text-chart-4"
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Log Activity</h1>
          <p className="text-muted-foreground">Track your carbon footprint</p>
        </div>
      </div>

      {/* Activity Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Activity</CardTitle>
          <CardDescription>Select a category and log your activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transport" className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Transport</span>
              </TabsTrigger>
              <TabsTrigger value="energy" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Energy</span>
              </TabsTrigger>
              <TabsTrigger value="food" className="flex items-center space-x-2">
                <Utensils className="h-4 w-4" />
                <span>Food</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transport" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transport-type">Transport Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport" />
                    </SelectTrigger>
                    <SelectContent>
                      {transportOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <Button onClick={() => handleSubmit("transport")} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Log Transport Activity
              </Button>
            </TabsContent>

            <TabsContent value="energy" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="energy-type">Energy Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select energy type" />
                    </SelectTrigger>
                    <SelectContent>
                      {energyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="usage">Usage (kWh)</Label>
                  <Input
                    id="usage"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <Button onClick={() => handleSubmit("energy")} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Log Energy Usage
              </Button>
            </TabsContent>

            <TabsContent value="food" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="food-type">Food Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <Button onClick={() => handleSubmit("food")} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Log Food Consumption
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      {activities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your logged activities today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className={getCategoryColor(activity.category)}>
                      {getCategoryIcon(activity.category)}
                      <span className="ml-1 capitalize">{activity.category}</span>
                    </Badge>
                    <div>
                      <p className="font-medium text-sm capitalize">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.amount} {activity.unit} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{activity.emission} kg CO₂</p>
                    <p className="text-xs text-muted-foreground">emissions</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
