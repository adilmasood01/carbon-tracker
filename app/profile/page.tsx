"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Settings, Target, Bell, Shield, Download, Upload, Camera, Save, Trash2 } from "lucide-react"
import Link from "next/link"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    bio: "Passionate about reducing my carbon footprint and living sustainably.",
    location: "San Francisco, CA",
    joinDate: "January 2024",
  })

  const [settings, setSettings] = useState({
    notifications: {
      dailyReminders: true,
      weeklyReports: true,
      challengeUpdates: true,
      achievements: true,
    },
    preferences: {
      units: "metric",
      theme: "system",
      language: "en",
      privacy: "friends",
    },
    goals: {
      dailyTarget: 15,
      weeklyTarget: 70,
      monthlyTarget: 300,
    },
  })

  const handleSave = () => {
    // Save logic would go here
    console.log("Settings saved:", settings)
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
          <h1 className="text-2xl font-bold text-foreground">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?key=profile" />
                    <AvatarFallback className="text-lg">AJ</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Level 6 Eco Warrior
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{profileData.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Member since {profileData.joinDate} • {profileData.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">1,890</p>
                <p className="text-sm text-muted-foreground">EcoPoints</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">23</p>
                <p className="text-sm text-muted-foreground">Trees Saved</p>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminded to log your activities</p>
                </div>
                <Switch
                  checked={settings.notifications.dailyReminders}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, dailyReminders: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Receive weekly progress summaries</p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, weeklyReports: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Challenge Updates</p>
                  <p className="text-sm text-muted-foreground">Get notified about new challenges</p>
                </div>
                <Switch
                  checked={settings.notifications.challengeUpdates}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, challengeUpdates: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Achievement Alerts</p>
                  <p className="text-sm text-muted-foreground">Celebrate when you earn badges</p>
                </div>
                <Switch
                  checked={settings.notifications.achievements}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, achievements: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>App Preferences</span>
              </CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="units">Units</Label>
                  <Select
                    value={settings.preferences.units}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, units: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, km)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs, miles)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, theme: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, language: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="privacy">Profile Visibility</Label>
                  <Select
                    value={settings.preferences.privacy}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, privacy: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Carbon Footprint Goals</span>
              </CardTitle>
              <CardDescription>Set your emission reduction targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="daily-target">Daily Target (kg CO₂)</Label>
                <Input
                  id="daily-target"
                  type="number"
                  value={settings.goals.dailyTarget}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      goals: { ...settings.goals, dailyTarget: Number.parseInt(e.target.value) },
                    })
                  }
                />
                <p className="text-sm text-muted-foreground mt-1">Current average: 12.3 kg CO₂ per day</p>
              </div>
              <div>
                <Label htmlFor="weekly-target">Weekly Target (kg CO₂)</Label>
                <Input
                  id="weekly-target"
                  type="number"
                  value={settings.goals.weeklyTarget}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      goals: { ...settings.goals, weeklyTarget: Number.parseInt(e.target.value) },
                    })
                  }
                />
                <p className="text-sm text-muted-foreground mt-1">Current average: 86.1 kg CO₂ per week</p>
              </div>
              <div>
                <Label htmlFor="monthly-target">Monthly Target (kg CO₂)</Label>
                <Input
                  id="monthly-target"
                  type="number"
                  value={settings.goals.monthlyTarget}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      goals: { ...settings.goals, monthlyTarget: Number.parseInt(e.target.value) },
                    })
                  }
                />
                <p className="text-sm text-muted-foreground mt-1">Current average: 369 kg CO₂ per month</p>
              </div>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Update Goals
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6 mt-6">
          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export, import, or delete your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button variant="outline" className="justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
                <p className="text-sm text-muted-foreground">
                  Download all your activity data, achievements, and settings
                </p>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Button variant="outline" className="justify-start bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
                <p className="text-sm text-muted-foreground">Import data from other carbon tracking apps</p>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Button variant="destructive" className="justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy & Security</span>
              </CardTitle>
              <CardDescription>Manage your privacy and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Privacy Policy
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Terms of Service
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
