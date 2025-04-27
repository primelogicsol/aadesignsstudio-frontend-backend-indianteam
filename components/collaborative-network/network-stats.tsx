"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Briefcase, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { NetworkStats } from "@/types/collaborative-network"

interface NetworkStatsProps {
  stats: NetworkStats
  className?: string
}

export function NetworkStats({ stats, className = "" }: NetworkStatsProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`network-stats ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onViewportEnter={() => setIsVisible(true)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Members Stats */}
          <StatCard
            icon={<Users className="h-8 w-8 text-blue-600" />}
            title="Network Members"
            value={stats.totalMembers}
            description={`${stats.activeMembers} active members`}
            delay={0.1}
            isVisible={isVisible}
          />

          {/* Projects Stats */}
          <StatCard
            icon={<Briefcase className="h-8 w-8 text-purple-600" />}
            title="Total Projects"
            value={stats.totalProjects}
            description={`${stats.activeProjects} active, ${stats.completedProjects} completed`}
            delay={0.2}
            isVisible={isVisible}
          />

          {/* Collaboration Score */}
          <StatCard
            icon={<Activity className="h-8 w-8 text-emerald-600" />}
            title="Collaboration Score"
            value={stats.collaborationScore}
            description="Based on interactions and contributions"
            suffix="%"
            delay={0.3}
            isVisible={isVisible}
          />

          {/* Average Connections */}
          <StatCard
            icon={<TrendingUp className="h-8 w-8 text-amber-600" />}
            title="Avg. Connections"
            value={stats.averageConnections}
            description="Per network member"
            delay={0.4}
            isVisible={isVisible}
            decimals={1}
          />

          {/* Activity Trend */}
          <Card className="col-span-1 md:col-span-2 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Activity Trend</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                className="h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <ActivityChart data={stats.activityTrend} />
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: number
  description: string
  suffix?: string
  delay?: number
  isVisible: boolean
  decimals?: number
}

function StatCard({ icon, title, value, description, suffix = "", delay = 0, isVisible, decimals = 0 }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <motion.div
              className="flex items-baseline"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay }}
            >
              <CountUp value={value} className="text-3xl font-bold text-gray-900" decimals={decimals} />
              {suffix && <span className="ml-1 text-xl text-gray-500">{suffix}</span>}
            </motion.div>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
          <div className="rounded-full bg-blue-50 p-3">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CountUpProps {
  value: number
  className?: string
  decimals?: number
}

function CountUp({ value, className = "", decimals = 0 }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 1500, 1)

      setDisplayValue(progress * value)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value])

  return <span className={className}>{displayValue.toFixed(decimals)}</span>
}

interface ActivityChartProps {
  data: { date: string; count: number }[]
}

function ActivityChart({ data }: ActivityChartProps) {
  const maxValue = Math.max(...data.map((d) => d.count)) * 1.2

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-end justify-between px-2">
        {data.map((item, index) => {
          const height = (item.count / maxValue) * 100

          return (
            <motion.div
              key={item.date}
              className="relative flex flex-col items-center w-1/8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <motion.div
                className="w-full max-w-[40px] bg-blue-500 rounded-t-md"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: 0.2 * index, ease: "easeOut" }}
              />
              <div className="mt-2 text-xs text-gray-500">
                {new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
