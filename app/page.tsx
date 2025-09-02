"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Leaf, Zap, Car, Home, Utensils, Award, TrendingDown, Plus, Trophy, User } from "lucide-react"
import Link from "next/link"

const weeklyData = [
  { day: "Mon", emissions: 12.5 },
  { day: "Tue", emissions: 8.2 },
  { day: "Wed", emissions: 15.1 },
  { day: "Thu", emissions: 6.8 },
  { day: "Fri", emissions: 11.3 },
  { day: "Sat", emissions: 9.7 },
  { day: "Sun", emissions: 7.4 },
]

const categoryData = [
  { name: "Transport", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Energy", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Food", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Other", value: 5, color: "hsl(var(--chart-4))" },
]

const monthlyTrend = [
  { month: "Jan", emissions: 285 },
  { month: "Feb", emissions: 267 },
  { month: "Mar", emissions: 245 },
  { month: "Apr", emissions: 223 },
  { month: "May", emissions: 201 },
  { month: "Jun", emissions: 189 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Carbon Tracker</h1>
            <p className="text-muted-foreground">Track your environmental impact</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/challenges">
              <Button variant="ghost" size="sm">
                <Trophy className="h-4 w-4 mr-2" />
                Challenges
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Leaf className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Level 6 Eco Warrior
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-xl font-bold text-foreground">7.4 kg</p>
                <p className="text-xs text-primary">-15% vs yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-xl font-bold text-foreground">71.0 kg</p>
                <p className="text-xs text-accent">Target: 70 kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-xl font-bold text-foreground">12 days</p>
                <p className="text-xs text-primary">Personal best!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">EcoPoints</p>
                <p className="text-xl font-bold text-foreground">1,890</p>
                <p className="text-xs text-primary">+45 today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="h-5 w-5" />
            <span>Weekly Emissions</span>
          </CardTitle>
          <CardDescription>Daily carbon footprint in kg CO₂</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="emissions" fill="hsl(var(--primary))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Breakdown & Monthly Trend */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Emissions by Category</CardTitle>
            <CardDescription>This week's breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Log your activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Link href="/log">
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent w-full">
                <Car className="h-6 w-6" />
                <span className="text-sm">Transport</span>
              </Button>
            </Link>
            <Link href="/log">
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent w-full">
                <Home className="h-6 w-6" />
                <span className="text-sm">Energy</span>
              </Button>
            </Link>
            <Link href="/log">
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent w-full">
                <Utensils className="h-6 w-6" />
                <span className="text-sm">Food</span>
              </Button>
            </Link>
            <Link href="/log">
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent w-full">
                <Plus className="h-6 w-6" />
                <span className="text-sm">Log Activity</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Goal Progress</CardTitle>
          <CardDescription>71.0 kg / 70.0 kg target</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={101.4} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            You're slightly over your weekly target. Try reducing transport emissions tomorrow!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
