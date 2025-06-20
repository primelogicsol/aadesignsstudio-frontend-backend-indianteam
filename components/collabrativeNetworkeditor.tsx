// Combined Collaborative Network Editor
// This file integrates all modules into one component for demo/editor purposes

"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertCircle, RefreshCw, Share2, Download, Filter, Search,
  Users, Network, BarChart2, Briefcase, Activity
} from "lucide-react"

// Import type definitions
import type { NetworkDetail, NetworkGraphData } from "@/types/collaborative-network"

// Fallback data and helper
import { generateNetworkGraphData, networkFallbackData } from "@/lib/collaborative-network/fallback-data"

// --- Network Visualization ---
function NetworkVisualization({ graphData, onNodeClick }: any) {
  return <div className="border p-4">[Graph Visualization Placeholder]</div>
}

// --- Network Stats ---
function NetworkStats({ stats }: any) {
  return <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(stats, null, 2)}</pre>
}

// --- Network Members ---
function NetworkMembers({ members, onMemberClick }: any) {
  return (
    <div className="space-y-4">
      {members.map((m: any) => (
        <div key={m.id} className="p-2 border rounded" onClick={() => onMemberClick(m.id)}>
          {m.name} – {m.role} ({m.department})
        </div>
      ))}
    </div>
  )
}

// --- Network Projects ---
function NetworkProjects({ projects, members, onProjectClick }: any) {
  return (
    <div className="space-y-4">
      {projects.map((p: any) => (
        <div key={p.id} className="p-2 border rounded" onClick={() => onProjectClick(p.id)}>
          {p.title} – {p.status}
          <div className="text-xs">{p.description}</div>
        </div>
      ))}
    </div>
  )
}

// --- Main Collaborative Network Editor Component ---
export default function CollaborativeNetworkEditor() {
  const [network, setNetwork] = useState<NetworkDetail | null>(null)
  const [graphData, setGraphData] = useState<NetworkGraphData>({ nodes: [], links: [] })
  const [tab, setTab] = useState("overview")

  useEffect(() => {
    const data = networkFallbackData
    setNetwork(data)
    try {
      const graph = generateNetworkGraphData(data)
      setGraphData(graph)
    } catch {
      setGraphData({ nodes: [], links: [] })
    }
  }, [])

  if (!network) return <div>Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{network.name}</h1>
      <p className="text-gray-600 mb-4">{network.description}</p>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader><CardTitle>Visualization</CardTitle></CardHeader>
              <CardContent><NetworkVisualization graphData={graphData} onNodeClick={() => {}} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
              <CardContent><NetworkStats stats={network.stats} /></CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <NetworkMembers members={network.members} onMemberClick={() => {}} />
        </TabsContent>

        <TabsContent value="projects">
          <NetworkProjects projects={network.projects} members={network.members} onProjectClick={() => {}} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
