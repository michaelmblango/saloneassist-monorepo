"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, MessageSquare, Clock, Users, ThumbsUp, ThumbsDown } from "lucide-react"

export default function Analytics() {
  const [stats, setStats] = useState({
    totalMessages: 0,
    avgResponseTime: 0,
    uniqueUsers: 0,
    satisfactionRate: 0,
    positiveResponses: 0,
    negativeResponses: 0,
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    // TODO: Fetch real analytics from API
    setStats({
      totalMessages: 0,
      avgResponseTime: 0,
      uniqueUsers: 0,
      satisfactionRate: 0,
      positiveResponses: 0,
      negativeResponses: 0,
    })
  }

  const metrics = [
    {
      title: "Total Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Unique Users",
      value: stats.uniqueUsers,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avg Response Time",
      value: `${stats.avgResponseTime}s`,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Satisfaction Rate",
      value: `${stats.satisfactionRate}%`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Chatbot Analytics</h1>
          <p className="text-gray-600">Monitor performance and user engagement</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.title}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                    <div className={`${metric.bgColor} p-2 rounded-lg`}>
                      <Icon className={`h-4 w-4 ${metric.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feedback Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
              <CardDescription>Positive vs Negative responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium">Positive</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{stats.positiveResponses}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <ThumbsDown className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="font-medium">Negative</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">{stats.negativeResponses}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription>Most frequently asked about</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <p>No data available yet</p>
                <p className="text-sm mt-2">Topics will appear as users interact with the chatbot</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State for Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Over Time</CardTitle>
            <CardDescription>Message volume and response patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No analytics data yet</p>
              <p className="text-sm mt-2">Charts will appear once you have conversation data</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
