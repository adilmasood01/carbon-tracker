"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Leaf, ArrowRight, ArrowLeft, Target, BarChart3, Trophy, Users, Car, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const steps = [
  { id: 1, title: "Welcome", description: "Get started with Carbon Tracker" },
  { id: 2, title: "About You", description: "Tell us about yourself" },
  { id: 3, title: "Your Goals", description: "Set your carbon targets" },
  { id: 4, title: "Features", description: "Discover what you can do" },
  { id: 5, title: "Ready!", description: "You're all set to begin" },
]

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState({
    name: "",
    location: "",
    experience: "",
    dailyGoal: 15,
    weeklyGoal: 70,
    monthlyGoal: 300,
  })

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = () => {
    // Save user data and redirect to dashboard
    localStorage.setItem("onboardingComplete", "true")
    localStorage.setItem("userData", JSON.stringify(userData))
    router.push("/")
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Carbon Tracker</h1>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep} of {steps.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-2">
          {currentStep === 1 && (
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Leaf className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Carbon Tracker!</h2>
                  <p className="text-lg text-muted-foreground">
                    Your journey to a more sustainable lifestyle starts here
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Track Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your daily carbon footprint across transport, energy, and food
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <Trophy className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Earn Rewards</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete challenges and earn badges for eco-friendly actions
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Join Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Compete with friends and climb the sustainability leaderboard
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground">
                Let's set up your profile and get you started on your eco-journey!
              </p>
            </CardContent>
          )}

          {currentStep === 2 && (
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Tell us about yourself</h2>
                <p className="text-muted-foreground">Help us personalize your carbon tracking experience</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">What's your name?</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Where are you located?</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={userData.location}
                    onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">How familiar are you with carbon tracking?</Label>
                  <Select
                    value={userData.experience}
                    onValueChange={(value) => setUserData({ ...userData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Complete beginner</SelectItem>
                      <SelectItem value="some">Some experience</SelectItem>
                      <SelectItem value="experienced">Very experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          )}

          {currentStep === 3 && (
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <Target className="h-12 w-12 text-primary mx-auto" />
                <h2 className="text-2xl font-bold text-foreground">Set your carbon goals</h2>
                <p className="text-muted-foreground">These targets will help you stay motivated and track progress</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="daily-goal">Daily carbon target (kg CO₂)</Label>
                  <Input
                    id="daily-goal"
                    type="number"
                    value={userData.dailyGoal}
                    onChange={(e) => setUserData({ ...userData, dailyGoal: Number.parseInt(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Average person: 16 kg CO₂ per day</p>
                </div>

                <div>
                  <Label htmlFor="weekly-goal">Weekly carbon target (kg CO₂)</Label>
                  <Input
                    id="weekly-goal"
                    type="number"
                    value={userData.weeklyGoal}
                    onChange={(e) => setUserData({ ...userData, weeklyGoal: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <Label htmlFor="monthly-goal">Monthly carbon target (kg CO₂)</Label>
                  <Input
                    id="monthly-goal"
                    type="number"
                    value={userData.monthlyGoal}
                    onChange={(e) => setUserData({ ...userData, monthlyGoal: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Tip:</strong> Start with achievable goals and adjust them as you learn more about your
                  carbon footprint.
                </p>
              </div>
            </CardContent>
          )}

          {currentStep === 4 && (
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <Sparkles className="h-12 w-12 text-primary mx-auto" />
                <h2 className="text-2xl font-bold text-foreground">Discover your features</h2>
                <p className="text-muted-foreground">Here's what you can do with Carbon Tracker</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Log Activities</h3>
                    <p className="text-sm text-muted-foreground">
                      Track transport, energy usage, and food consumption with our easy logging system
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">View Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      See detailed charts and trends of your carbon footprint over time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Complete Challenges</h3>
                    <p className="text-sm text-muted-foreground">
                      Take on eco-challenges, earn badges, and compete with friends
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Join Leaderboards</h3>
                    <p className="text-sm text-muted-foreground">
                      See how you rank against other eco-warriors in your community
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {currentStep === 5 && (
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">You're all set!</h2>
                  <p className="text-lg text-muted-foreground">Welcome to your sustainable journey, {userData.name}!</p>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg space-y-4">
                <Badge className="bg-primary/10 text-primary">
                  <Leaf className="h-3 w-3 mr-1" />
                  Level 1 Eco Beginner
                </Badge>
                <div className="space-y-2">
                  <p className="font-semibold">Your starting goals:</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Daily target: {userData.dailyGoal} kg CO₂</p>
                    <p>• Weekly target: {userData.weeklyGoal} kg CO₂</p>
                    <p>• Monthly target: {userData.monthlyGoal} kg CO₂</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Ready to start tracking your carbon footprint and making a positive impact?
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={completeOnboarding} className="flex-1">
                    <Leaf className="h-4 w-4 mr-2" />
                    Start My Journey
                  </Button>
                  <Link href="/log" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Log First Activity
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full ${step.id <= currentStep ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 2 && (!userData.name || !userData.location)) ||
                (currentStep === 3 && (!userData.dailyGoal || !userData.weeklyGoal || !userData.monthlyGoal))
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={completeOnboarding}>
              Complete
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
