"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Bot, Settings, Database, MessageSquare, Smartphone, TestTube, Activity, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ChatbotDashboard() {
  const [stats, setStats] = useState({
    totalConversations: 0,
    trainingDataCount: 0,
    activeChannels: 0,
    responseRate: "0%",
  })

  const [configStatus, setConfigStatus] = useState({
    geminiConfigured: false,
    whatsappConfigured: false,
    trainingDataExists: false,
  })

  useEffect(() => {
    checkConfiguration()
    fetchStats()
  }, [])

  const checkConfiguration = () => {
    // Check if API keys are configured
    const gemini = localStorage.getItem("gemini_api_key")
    const whatsapp = localStorage.getItem("meta_access_token")
    const training = localStorage.getItem("chatbot_training_data")

    setConfigStatus({
      geminiConfigured: !!gemini,
      whatsappConfigured: !!whatsapp,
      trainingDataExists: !!training,
    })
  }

  const fetchStats = async () => {
    // TODO: Fetch real stats from API
    setStats({
      totalConversations: 0,
      trainingDataCount: 0,
      activeChannels: 0,
      responseRate: "0%",
    })
  }

  const quickActions = [
    {
      title: "Chatbot Settings",
      description: "Configure API keys and integration settings",
      icon: Settings,
      href: "/dashboard/chatbot/settings",
      color: "from-[#1EB53A] to-[#17a333]",
      status: configStatus.geminiConfigured ? "Configured" : "Setup Required",
      statusColor: configStatus.geminiConfigured ? "text-green-600" : "text-amber-600",
    },
    {
      title: "Training Data",
      description: "Manage AI training knowledge base",
      icon: Database,
      href: "/dashboard/chatbot/training",
      color: "from-[#0072CE] to-[#005bb5]",
      status: configStatus.trainingDataExists ? "Data Available" : "No Data",
      statusColor: configStatus.trainingDataExists ? "text-blue-600" : "text-gray-500",
    },
    {
      title: "Main App Integration",
      description: "Connect chatbot to your SaloneAssist app",
      icon: Globe,
      href: "/dashboard/chatbot/integration",
      color: "from-indigo-500 to-indigo-600",
      status: "API Ready",
      statusColor: "text-indigo-600",
    },
    {
      title: "Conversations",
      description: "View chat history and user interactions",
      icon: MessageSquare,
      href: "/dashboard/chatbot/conversations",
      color: "from-purple-500 to-purple-600",
      status: `${stats.totalConversations} Total`,
      statusColor: "text-purple-600",
    },
    {
      title: "WhatsApp Setup",
      description: "Configure WhatsApp Business integration",
      icon: Smartphone,
      href: "/dashboard/chatbot/whatsapp",
      color: "from-green-500 to-green-600",
      status: configStatus.whatsappConfigured ? "Connected" : "Not Connected",
      statusColor: configStatus.whatsappConfigured ? "text-green-600" : "text-gray-500",
    },
    {
      title: "Test Chatbot",
      description: "Test AI responses in real-time",
      icon: TestTube,
      href: "/dashboard/chatbot/test",
      color: "from-orange-500 to-orange-600",
      status: "Available",
      statusColor: "text-orange-600",
    },
    {
      title: "Analytics",
      description: "View chatbot performance metrics",
      icon: Activity,
      href: "/dashboard/chatbot/analytics",
      color: "from-pink-500 to-pink-600",
      status: stats.responseRate,
      statusColor: "text-pink-600",
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-[20px] shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-[#1EB53A] to-[#0072CE] p-3 rounded-xl">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">AI Chatbot Management</h1>
              <p className="text-gray-600">Train and manage your intelligent assistant</p>
            </div>
          </div>

          {/* Configuration Status Banner */}
          {(!configStatus.geminiConfigured || !configStatus.whatsappConfigured) && (
            <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Configuration Required</h3>
                  <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                    {!configStatus.geminiConfigured && <li>Google Gemini API key not configured</li>}
                    {!configStatus.whatsappConfigured && <li>WhatsApp integration not set up</li>}
                    {!configStatus.trainingDataExists && <li>No training data available</li>}
                  </ul>
                  <Link
                    href="/dashboard/chatbot/settings"
                    className="inline-block mt-3 text-sm font-semibold text-amber-800 hover:text-amber-900 underline"
                  >
                    Complete Setup →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalConversations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Training Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.trainingDataCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.activeChannels}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.responseRate}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`bg-gradient-to-br ${action.color} p-3 rounded-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className={`text-xs font-semibold ${action.statusColor}`}>{action.status}</span>
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
