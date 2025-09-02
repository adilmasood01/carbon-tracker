"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Trophy,
  Target,
  Award,
  Flame,
  Leaf,
  Car,
  Home,
  Utensils,
  Crown,
  Medal,
  Star,
  Zap,
} from "lucide-react"
import Link from "next/link"

const currentChallenges = [
  {
    id: 1,
    title: "Green Commuter",
    description: "Use public transport or bike for 5 days this week",
    progress: 3,
    target: 5,
    reward: "50 EcoPoints + Transport Badge",
    category: "transport",
    timeLeft: "4 days left",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Energy Saver",
    description: "Reduce energy consumption by 20% this month",
    progress: 12,
    target: 20,
    reward: "100 EcoPoints + Energy Master Badge",
    category: "energy",
    timeLeft: "12 days left",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Plant-Based Week",
    description: "Eat vegetarian meals for 7 consecutive days",
    progress: 2,
    target: 7,
    reward: "75 EcoPoints + Veggie Hero Badge",
    category: "food",
    timeLeft: "5 days left",
    difficulty: "Hard",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Log your first activity",
    icon: <Leaf className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Week Warrior",
    description: "Complete 7 days of logging",
    icon: <Flame className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-01-22",
  },
  {
    id: 3,
    title: "Transport Hero",
    description: "Use eco-friendly transport 10 times",
    icon: <Car className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-01-28",
  },
  {
    id: 4,
    title: "Energy Master",
    description: "Reduce energy usage by 50%",
    icon: <Zap className="h-6 w-6" />,
    earned: false,
    progress: 32,
    target: 50,
  },
  {
    id: 5,
    title: "Carbon Crusher",
    description: "Achieve 30-day streak",
    icon: <Trophy className="h-6 w-6" />,
    earned: false,
    progress: 12,
    target: 30,
  },
  {
    id: 6,
    title: "Eco Champion",
    description: "Reach Level 10",
    icon: <Crown className="h-6 w-6" />,
    earned: false,
    progress: 3,
    target: 10,
  },
]

const leaderboard = [
  {
    rank: 1,
    name: "Alex Green",
    points: 2450,
    level: 8,
    streak: 45,
    avatar: "/diverse-group.png",
  },
  {
    rank: 2,
    name: "Sarah Eco",
    points: 2280,
    level: 7,
    streak: 32,
    avatar: "/diverse-woman-portrait.png",
  },
  {
    rank: 3,
    name: "You",
    points: 1890,
    level: 6,
    streak: 12,
    avatar: "/abstract-geometric-shapes.png",
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "Mike Carbon",
    points: 1650,
    level: 5,
    streak: 28,
    avatar: "/thoughtful-man.png",
  },
  {
    rank: 5,
    name: "Emma Planet",
    points: 1420,
    level: 5,
    streak: 15,
    avatar: "/young-woman-smiling.png",
  },
]

export default function Challenges() {
  const [activeTab, setActiveTab] = useState("challenges")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "transport":
        return <Car className="h-4 w-4" />
      case "energy":
        return <Home className="h-4 w-4" />
      case "food":
        return <Utensils className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
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
          <h1 className="text-2xl font-bold text-foreground">Challenges</h1>
          <p className="text-muted-foreground">Compete and earn rewards</p>
        </div>
      </div>

      {/* User Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/abstract-geometric-shapes.png" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold">Level 6 Eco Warrior</h3>
                <p className="text-muted-foreground">1,890 EcoPoints</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">12-day streak</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Next Level</p>
              <Progress value={75} className="w-24 mt-1" />
              <p className="text-xs text-muted-foreground mt-1">110 points to go</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="space-y-4 mt-6">
          <div className="space-y-4">
            {currentChallenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(challenge.category)}
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        Progress: {challenge.progress}/{challenge.target}
                      </span>
                      <span className="text-muted-foreground">{challenge.timeLeft}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.target) * 100} />
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Reward: {challenge.reward}</p>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.earned ? "border-primary/50 bg-primary/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                          <Star className="h-3 w-3 mr-1" />
                          Earned {achievement.earnedDate}
                        </Badge>
                      ) : (
                        <div className="mt-2">
                          <Progress value={(achievement.progress / achievement.target) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {achievement.progress}/{achievement.target}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Weekly Leaderboard</span>
              </CardTitle>
              <CardDescription>Top eco warriors this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.isCurrentUser ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">Level {user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{user.points.toLocaleString()} pts</p>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Flame className="h-3 w-3" />
                        <span>{user.streak} days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
