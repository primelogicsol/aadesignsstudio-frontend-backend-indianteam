// // // // // Combined Collaborative Network Editor
// // // // // This file integrates all modules into one component for demo/editor purposes

// // // // "use client"

// // // // import React, { useState, useEffect } from "react"
// // // // import { motion, AnimatePresence } from "framer-motion"
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // // // import {
// // // //   AlertCircle, RefreshCw, Share2, Download, Filter, Search,
// // // //   Users, Network, BarChart2, Briefcase, Activity
// // // // } from "lucide-react"

// // // // // Import type definitions
// // // // import type { NetworkDetail, NetworkGraphData } from "@/types/collaborative-network"

// // // // // Fallback data and helper
// // // // import { generateNetworkGraphData, networkFallbackData } from "@/lib/collaborative-network/fallback-data"

// // // // // --- Network Visualization ---
// // // // function NetworkVisualization({ graphData, onNodeClick }: any) {
// // // //   return <div className="border p-4">[Graph Visualization Placeholder]</div>
// // // // }

// // // // // --- Network Stats ---
// // // // function NetworkStats({ stats }: any) {
// // // //   return <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(stats, null, 2)}</pre>
// // // // }

// // // // // --- Network Members ---
// // // // function NetworkMembers({ members, onMemberClick }: any) {
// // // //   return (
// // // //     <div className="space-y-4">
// // // //       {members.map((m: any) => (
// // // //         <div key={m.id} className="p-2 border rounded" onClick={() => onMemberClick(m.id)}>
// // // //           {m.name} – {m.role} ({m.department})
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   )
// // // // }

// // // // // --- Network Projects ---
// // // // function NetworkProjects({ projects, members, onProjectClick }: any) {
// // // //   return (
// // // //     <div className="space-y-4">
// // // //       {projects.map((p: any) => (
// // // //         <div key={p.id} className="p-2 border rounded" onClick={() => onProjectClick(p.id)}>
// // // //           {p.title} – {p.status}
// // // //           <div className="text-xs">{p.description}</div>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   )
// // // // }

// // // // // --- Main Collaborative Network Editor Component ---
// // // // export default function CollaborativeNetworkEditor() {
// // // //   const [network, setNetwork] = useState<NetworkDetail | null>(null)
// // // //   const [graphData, setGraphData] = useState<NetworkGraphData>({ nodes: [], links: [] })
// // // //   const [tab, setTab] = useState("overview")

// // // //   useEffect(() => {
// // // //     const data = networkFallbackData
// // // //     setNetwork(data)
// // // //     try {
// // // //       const graph = generateNetworkGraphData(data)
// // // //       setGraphData(graph)
// // // //     } catch {
// // // //       setGraphData({ nodes: [], links: [] })
// // // //     }
// // // //   }, [])

// // // //   if (!network) return <div>Loading...</div>

// // // //   return (
// // // //     <div className="p-6">
// // // //       <h1 className="text-3xl font-bold mb-2">{network.name}</h1>
// // // //       <p className="text-gray-600 mb-4">{network.description}</p>

// // // //       <Tabs value={tab} onValueChange={setTab}>
// // // //         <TabsList>
// // // //           <TabsTrigger value="overview">Overview</TabsTrigger>
// // // //           <TabsTrigger value="members">Members</TabsTrigger>
// // // //           <TabsTrigger value="projects">Projects</TabsTrigger>
// // // //         </TabsList>

// // // //         <TabsContent value="overview">
// // // //           <div className="grid md:grid-cols-2 gap-4 mt-4">
// // // //             <Card>
// // // //               <CardHeader><CardTitle>Visualization</CardTitle></CardHeader>
// // // //               <CardContent><NetworkVisualization graphData={graphData} onNodeClick={() => {}} /></CardContent>
// // // //             </Card>
// // // //             <Card>
// // // //               <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
// // // //               <CardContent><NetworkStats stats={network.stats} /></CardContent>
// // // //             </Card>
// // // //           </div>
// // // //         </TabsContent>

// // // //         <TabsContent value="members">
// // // //           <NetworkMembers members={network.members} onMemberClick={() => {}} />
// // // //         </TabsContent>

// // // //         <TabsContent value="projects">
// // // //           <NetworkProjects projects={network.projects} members={network.members} onProjectClick={() => {}} />
// // // //         </TabsContent>
// // // //       </Tabs>
// // // //     </div>
// // // //   )
// // // // }
// // // // Combined Collaborative Network Editor
// // // // This file integrates all modules into one component for demo/editor purposes

// // // "use client"

// // // import React, { useState, useEffect } from "react"
// // // import { motion, AnimatePresence } from "framer-motion"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // import { Button } from "@/components/ui/button"
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // // import {
// // //   AlertCircle, RefreshCw, Share2, Download, Filter, Search,
// // //   Users, Network, BarChart2, Briefcase, Activity
// // // } from "lucide-react"

// // // // Import type definitions
// // // import type { NetworkDetail, NetworkGraphData } from "@/types/collaborative-network"

// // // // Fallback data and helper
// // // import { generateNetworkGraphData, networkFallbackData } from "@/lib/collaborative-network/fallback-data"

// // // // --- Network Visualization ---
// // // function NetworkVisualization({ graphData, onNodeClick }: any) {
// // //   return <div className="border p-4">[Graph Visualization Placeholder]</div>
// // // }

// // // // --- Network Stats ---
// // // function NetworkStats({ stats }: any) {
// // //   return <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(stats, null, 2)}</pre>
// // // }

// // // // --- Network Members ---
// // // function NetworkMembers({ members, onMemberUpdate }: any) {
// // //   const [editedMembers, setEditedMembers] = useState(members)

// // //   const handleChange = (index: number, field: string, value: string) => {
// // //     const updated = [...editedMembers]
// // //     updated[index] = { ...updated[index], [field]: value }
// // //     setEditedMembers(updated)
// // //   }

// // //   return (
// // //     <div className="space-y-4">
// // //       {editedMembers.map((m: any, index: number) => (
// // //         <div key={m.id} className="p-2 border rounded space-y-1">
// // //           <input
// // //             className="border p-1 w-full"
// // //             value={m.name}
// // //             onChange={(e) => handleChange(index, "name", e.target.value)}
// // //           />
// // //           <input
// // //             className="border p-1 w-full"
// // //             value={m.role}
// // //             onChange={(e) => handleChange(index, "role", e.target.value)}
// // //           />
// // //           <input
// // //             className="border p-1 w-full"
// // //             value={m.department}
// // //             onChange={(e) => handleChange(index, "department", e.target.value)}
// // //           />
// // //           <Button size="sm" onClick={() => onMemberUpdate(editedMembers[index])}>Save</Button>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   )
// // // }

// // // // --- Network Projects ---
// // // function NetworkProjects({ projects, members, onProjectUpdate }: any) {
// // //   const [editedProjects, setEditedProjects] = useState(projects)

// // //   const handleChange = (index: number, field: string, value: string) => {
// // //     const updated = [...editedProjects]
// // //     updated[index] = { ...updated[index], [field]: value }
// // //     setEditedProjects(updated)
// // //   }

// // //   return (
// // //     <div className="space-y-4">
// // //       {editedProjects.map((p: any, index: number) => (
// // //         <div key={p.id} className="p-2 border rounded space-y-1">
// // //           <input
// // //             className="border p-1 w-full"
// // //             value={p.title}
// // //             onChange={(e) => handleChange(index, "title", e.target.value)}
// // //           />
// // //           <textarea
// // //             className="border p-1 w-full"
// // //             value={p.description}
// // //             onChange={(e) => handleChange(index, "description", e.target.value)}
// // //           />
// // //           <select
// // //             className="border p-1 w-full"
// // //             value={p.status}
// // //             onChange={(e) => handleChange(index, "status", e.target.value)}
// // //           >
// // //             <option value="active">Active</option>
// // //             <option value="planning">Planning</option>
// // //             <option value="completed">Completed</option>
// // //             <option value="on hold">On Hold</option>
// // //           </select>
// // //           <Button size="sm" onClick={() => onProjectUpdate(editedProjects[index])}>Save</Button>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   )
// // // }

// // // // --- Main Collaborative Network Editor Component ---
// // // export default function CollaborativeNetworkEditor() {
// // //   const [network, setNetwork] = useState<NetworkDetail | null>(null)
// // //   const [graphData, setGraphData] = useState<NetworkGraphData>({ nodes: [], links: [] })
// // //   const [tab, setTab] = useState("overview")

// // //   useEffect(() => {
// // //     const data = networkFallbackData
// // //     setNetwork(data)
// // //     try {
// // //       const graph = generateNetworkGraphData(data)
// // //       setGraphData(graph)
// // //     } catch {
// // //       setGraphData({ nodes: [], links: [] })
// // //     }
// // //   }, [])

// // //   if (!network) return <div>Loading...</div>

// // //   const handleMemberUpdate = (updatedMember: any) => {
// // //     setNetwork((prev) => {
// // //       if (!prev) return prev
// // //       const members = prev.members.map((m) => (m.id === updatedMember.id ? updatedMember : m))
// // //       return { ...prev, members }
// // //     })
// // //   }

// // //   const handleProjectUpdate = (updatedProject: any) => {
// // //     setNetwork((prev) => {
// // //       if (!prev) return prev
// // //       const projects = prev.projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
// // //       return { ...prev, projects }
// // //     })
// // //   }

// // //   return (
// // //     <div className="p-6">
// // //       <h1 className="text-3xl font-bold mb-2">{network.name}</h1>
// // //       <p className="text-gray-600 mb-4">{network.description}</p>

// // //       <Tabs value={tab} onValueChange={setTab}>
// // //         <TabsList>
// // //           <TabsTrigger value="overview">Overview</TabsTrigger>
// // //           <TabsTrigger value="members">Members</TabsTrigger>
// // //           <TabsTrigger value="projects">Projects</TabsTrigger>
// // //         </TabsList>

// // //         <TabsContent value="overview">
// // //           <div className="grid md:grid-cols-2 gap-4 mt-4">
// // //             <Card>
// // //               <CardHeader><CardTitle>Visualization</CardTitle></CardHeader>
// // //               <CardContent><NetworkVisualization graphData={graphData} onNodeClick={() => {}} /></CardContent>
// // //             </Card>
// // //             <Card>
// // //               <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
// // //               <CardContent><NetworkStats stats={network.stats} /></CardContent>
// // //             </Card>
// // //           </div>
// // //         </TabsContent>

// // //         <TabsContent value="members">
// // //           <NetworkMembers members={network.members} onMemberUpdate={handleMemberUpdate} />
// // //         </TabsContent>

// // //         <TabsContent value="projects">
// // //           <NetworkProjects projects={network.projects} members={network.members} onProjectUpdate={handleProjectUpdate} />
// // //         </TabsContent>
// // //       </Tabs>
// // //     </div>
// // //   )
// // // }

// // // Combined Collaborative Network Editor
// // // This file integrates all modules into one component for demo/editor purposes

// // "use client"

// // import React, { useState, useEffect } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // import {
// //   AlertCircle, RefreshCw, Share2, Download, Filter, Search,
// //   Users, Network, BarChart2, Briefcase, Activity
// // } from "lucide-react"

// // // Import type definitions
// // import type { NetworkDetail, NetworkGraphData } from "@/types/collaborative-network"

// // // Fallback data and helper
// // import { generateNetworkGraphData, networkFallbackData } from "@/lib/collaborative-network/fallback-data"

// // // --- Network Visualization ---
// // function NetworkVisualization({ graphData, onNodeClick }: any) {
// //   return <div className="border p-4">[Graph Visualization Placeholder]</div>
// // }

// // // --- Network Stats ---
// // function NetworkStats({ stats }: any) {
// //   return <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(stats, null, 2)}</pre>
// // }

// // // --- Network Members ---
// // function NetworkMembers({ members, onMemberUpdate, onMemberDelete, onMemberCreate }: any) {
// //   const [editedMembers, setEditedMembers] = useState(members)

// //   const handleChange = (index: number, field: string, value: string) => {
// //     const updated = [...editedMembers]
// //     updated[index] = { ...updated[index], [field]: value }
// //     setEditedMembers(updated)
// //   }

// //   const handleCreate = () => {
// //     const newMember = {
// //       id: Math.random().toString(36).substr(2, 9),
// //       name: "New Member",
// //       role: "",
// //       department: ""
// //     }
// //     onMemberCreate(newMember)
// //   }

// //   return (
// //     <div className="space-y-4">
// //       <Button size="sm" onClick={handleCreate}>+ Add Member</Button>
// //       {editedMembers.map((m: any, index: number) => (
// //         <div key={m.id} className="p-2 border rounded space-y-1">
// //           <input
// //             className="border p-1 w-full"
// //             value={m.name}
// //             onChange={(e) => handleChange(index, "name", e.target.value)}
// //           />
// //           <input
// //             className="border p-1 w-full"
// //             value={m.role}
// //             onChange={(e) => handleChange(index, "role", e.target.value)}
// //           />
// //           <input
// //             className="border p-1 w-full"
// //             value={m.department}
// //             onChange={(e) => handleChange(index, "department", e.target.value)}
// //           />
// //           <div className="flex gap-2">
// //             <Button size="sm" onClick={() => onMemberUpdate(editedMembers[index])}>Save</Button>
// //             <Button size="sm" variant="destructive" onClick={() => onMemberDelete(m.id)}>Delete</Button>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }

// // // --- Network Projects ---
// // function NetworkProjects({ projects, members, onProjectUpdate, onProjectDelete, onProjectCreate }: any) {
// //   const [editedProjects, setEditedProjects] = useState(projects)

// //   const handleChange = (index: number, field: string, value: string) => {
// //     const updated = [...editedProjects]
// //     updated[index] = { ...updated[index], [field]: value }
// //     setEditedProjects(updated)
// //   }

// //   const handleCreate = () => {
// //     const newProject = {
// //       id: Math.random().toString(36).substr(2, 9),
// //       title: "New Project",
// //       description: "",
// //       status: "active",
// //       tags: [],
// //       members: [],
// //       progress: 0
// //     }
// //     onProjectCreate(newProject)
// //   }

// //   return (
// //     <div className="space-y-4">
// //       <Button size="sm" onClick={handleCreate}>+ Add Project</Button>
// //       {editedProjects.map((p: any, index: number) => (
// //         <div key={p.id} className="p-2 border rounded space-y-1">
// //           <input
// //             className="border p-1 w-full"
// //             value={p.title}
// //             onChange={(e) => handleChange(index, "title", e.target.value)}
// //           />
// //           <textarea
// //             className="border p-1 w-full"
// //             value={p.description}
// //             onChange={(e) => handleChange(index, "description", e.target.value)}
// //           />
// //           <select
// //             className="border p-1 w-full"
// //             value={p.status}
// //             onChange={(e) => handleChange(index, "status", e.target.value)}
// //           >
// //             <option value="active">Active</option>
// //             <option value="planning">Planning</option>
// //             <option value="completed">Completed</option>
// //             <option value="on hold">On Hold</option>
// //           </select>
// //           <div className="flex gap-2">
// //             <Button size="sm" onClick={() => onProjectUpdate(editedProjects[index])}>Save</Button>
// //             <Button size="sm" variant="destructive" onClick={() => onProjectDelete(p.id)}>Delete</Button>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }

// // // --- Main Collaborative Network Editor Component ---
// // export default function CollaborativeNetworkEditor() {
// //   const [network, setNetwork] = useState<NetworkDetail | null>(null)
// //   const [graphData, setGraphData] = useState<NetworkGraphData>({ nodes: [], links: [] })
// //   const [tab, setTab] = useState("overview")

// //   useEffect(() => {
// //     const data = networkFallbackData
// //     setNetwork(data)
// //     try {
// //       const graph = generateNetworkGraphData(data)
// //       setGraphData(graph)
// //     } catch {
// //       setGraphData({ nodes: [], links: [] })
// //     }
// //   }, [])

// //   if (!network) return <div>Loading...</div>

// //   const handleMemberUpdate = (updatedMember: any) => {
// //     setNetwork((prev) => {
// //       if (!prev) return prev
// //       const members = prev.members.map((m) => (m.id === updatedMember.id ? updatedMember : m))
// //       return { ...prev, members }
// //     })
// //   }

// //   const handleMemberDelete = (memberId: string) => {
// //     setNetwork((prev) => {
// //       if (!prev) return prev
// //       const members = prev.members.filter((m) => m.id !== memberId)
// //       return { ...prev, members }
// //     })
// //   }

// //   const handleMemberCreate = (newMember: any) => {
// //     setNetwork((prev) => {
// //       if (!prev) return prev
// //       return { ...prev, members: [...prev.members, newMember] }
// //     })
// //   }

// //   const handleProjectUpdate = (updatedProject: any) => {
// //     setNetwork((prev) => {
// //       if (!prev) return prev
// //       const projects = prev.projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
// //       return { ...prev, projects }
// //     })
// //   }

// //   const handleProjectDelete = (projectId: string) => {
// //     setNetwork((prev) => {
// //       if (!prev) return prev
// //       const projects = prev.projects.filter((p) => p.id !== projectId)
// //       return { ...prev, projects }
// //     })
// //   }

// //   const handleProjectCreate = (newProject: any) => {
// //     setNetwork((prev) => {
// //       if (!prev) return prev
// //       return { ...prev, projects: [...prev.projects, newProject] }
// //     })
// //   }

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-3xl font-bold mb-2">{network.name}</h1>
// //       <p className="text-gray-600 mb-4">{network.description}</p>

// //       <Tabs value={tab} onValueChange={setTab}>
// //         <TabsList>
// //           <TabsTrigger value="overview">Overview</TabsTrigger>
// //           <TabsTrigger value="members">Members</TabsTrigger>
// //           <TabsTrigger value="projects">Projects</TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="overview">
// //           <div className="grid md:grid-cols-2 gap-4 mt-4">
// //             <Card>
// //               <CardHeader><CardTitle>Visualization</CardTitle></CardHeader>
// //               <CardContent><NetworkVisualization graphData={graphData} onNodeClick={() => {}} /></CardContent>
// //             </Card>
// //             <Card>
// //               <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
// //               <CardContent><NetworkStats stats={network.stats} /></CardContent>
// //             </Card>
// //           </div>
// //         </TabsContent>

// //         <TabsContent value="members">
// //           <NetworkMembers
// //             members={network.members}
// //             onMemberUpdate={handleMemberUpdate}
// //             onMemberDelete={handleMemberDelete}
// //             onMemberCreate={handleMemberCreate}
// //           />
// //         </TabsContent>

// //         <TabsContent value="projects">
// //           <NetworkProjects
// //             projects={network.projects}
// //             members={network.members}
// //             onProjectUpdate={handleProjectUpdate}
// //             onProjectDelete={handleProjectDelete}
// //             onProjectCreate={handleProjectCreate}
// //           />
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   )
// // }
// // Combined Collaborative Network Editor
// "use client"

// import React, { useState, useEffect } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { generateNetworkGraphData, networkFallbackData } from "@/lib/collaborative-network/fallback-data"
// import type { NetworkDetail, NetworkGraphData } from "@/types/collaborative-network"

// function NetworkVisualization({ graphData }: any) {
//   return <div className="border p-4">[Graph Visualization Placeholder]</div>
// }

// function NetworkStats({ stats }: any) {
//   return <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(stats, null, 2)}</pre>
// }

// function NetworkMembers({ members, onMemberUpdate, onMemberDelete, onMemberCreate }: any) {
//   const [editedMembers, setEditedMembers] = useState(members)

//   useEffect(() => { setEditedMembers(members) }, [members])

//   const handleChange = (index: number, field: string, value: string) => {
//     const updated = [...editedMembers]
//     updated[index] = { ...updated[index], [field]: value }
//     setEditedMembers(updated)
//   }

//   const handleCreate = () => {
//     const newMember = { id: crypto.randomUUID(), name: "New Member", role: "", department: "" }
//     onMemberCreate(newMember)
//   }

//   return (
//     <div className="space-y-4">
//       <Button onClick={handleCreate}>+ Add Member</Button>
//       {editedMembers.map((m: any, index: number) => (
//         <div key={m.id} className="p-2 border rounded space-y-1">
//           <input className="border p-1 w-full" value={m.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
//           <input className="border p-1 w-full" value={m.role} onChange={(e) => handleChange(index, "role", e.target.value)} />
//           <input className="border p-1 w-full" value={m.department} onChange={(e) => handleChange(index, "department", e.target.value)} />
//           <div className="flex gap-2">
//             <Button onClick={() => onMemberUpdate(editedMembers[index])}>Save</Button>
//             <Button variant="destructive" onClick={() => onMemberDelete(m.id)}>Delete</Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// function NetworkProjects({ projects, onProjectUpdate, onProjectDelete, onProjectCreate }: any) {
//   const [editedProjects, setEditedProjects] = useState(projects)

//   useEffect(() => { setEditedProjects(projects) }, [projects])

//   const handleChange = (index: number, field: string, value: string) => {
//     const updated = [...editedProjects]
//     updated[index] = { ...updated[index], [field]: value }
//     setEditedProjects(updated)
//   }

//   const handleCreate = () => {
//     const newProject = { id: crypto.randomUUID(), title: "New Project", description: "", status: "active", tags: [], members: [], progress: 0 }
//     onProjectCreate(newProject)
//   }

//   return (
//     <div className="space-y-4">
//       <Button onClick={handleCreate}>+ Add Project</Button>
//       {editedProjects.map((p: any, index: number) => (
//         <div key={p.id} className="p-2 border rounded space-y-1">
//           <input className="border p-1 w-full" value={p.title} onChange={(e) => handleChange(index, "title", e.target.value)} />
//           <textarea className="border p-1 w-full" value={p.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
//           <select className="border p-1 w-full" value={p.status} onChange={(e) => handleChange(index, "status", e.target.value)}>
//             <option value="active">Active</option>
//             <option value="planning">Planning</option>
//             <option value="completed">Completed</option>
//             <option value="on hold">On Hold</option>
//           </select>
//           <div className="flex gap-2">
//             <Button onClick={() => onProjectUpdate(editedProjects[index])}>Save</Button>
//             <Button variant="destructive" onClick={() => onProjectDelete(p.id)}>Delete</Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default function CollaborativeNetworkEditor() {
//   const [network, setNetwork] = useState<NetworkDetail | null>(null)
//   const [graphData, setGraphData] = useState<NetworkGraphData>({ nodes: [], links: [] })
//   const [tab, setTab] = useState("overview")
//   const [showData, setShowData] = useState(false)

//   useEffect(() => {
//     const data = networkFallbackData
//     setNetwork(data)
//     try {
//       setGraphData(generateNetworkGraphData(data))
//     } catch {
//       setGraphData({ nodes: [], links: [] })
//     }
//   }, [])

//   if (!network) return <div>Loading...</div>

//   const updateMembers = (modifier: (members: any[]) => any[]) => {
//     setNetwork((prev) => prev ? { ...prev, members: modifier(prev.members) } : prev)
//   }

//   const updateProjects = (modifier: (projects: any[]) => any[]) => {
//     setNetwork((prev) => prev ? { ...prev, projects: modifier(prev.projects) } : prev)
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-2">{network.name}</h1>
//       <p className="text-gray-600 mb-4">{network.description}</p>

//       <Tabs value={tab} onValueChange={setTab}>
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="members">Members</TabsTrigger>
//           <TabsTrigger value="projects">Projects</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview">
//           <div className="grid md:grid-cols-2 gap-4 mt-4">
//             <Card>
//               <CardHeader><CardTitle>Visualization</CardTitle></CardHeader>
//               <CardContent><NetworkVisualization graphData={graphData} /></CardContent>
//             </Card>
//             <Card>
//               <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
//               <CardContent><NetworkStats stats={network.stats} /></CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="members">
//           <NetworkMembers
//             members={network.members}
//             onMemberUpdate={(updated) => updateMembers(m => m.map(x => x.id === updated.id ? updated : x))}
//             onMemberDelete={(id) => updateMembers(m => m.filter(x => x.id !== id))}
//             onMemberCreate={(m) => updateMembers(mem => [...mem, m])}
//           />
//         </TabsContent>

//         <TabsContent value="projects">
//           <NetworkProjects
//             projects={network.projects}
//             onProjectUpdate={(updated) => updateProjects(p => p.map(x => x.id === updated.id ? updated : x))}
//             onProjectDelete={(id) => updateProjects(p => p.filter(x => x.id !== id))}
//             onProjectCreate={(p) => updateProjects(prj => [...prj, p])}
//           />
//         </TabsContent>
//       </Tabs>

//       <div className="mt-6">
//         <Button onClick={() => setShowData(!showData)}>Save & Show Data</Button>
//         {showData && <pre className="mt-4 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">{JSON.stringify(network, null, 2)}</pre>}
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateNetworkGraphData, networkFallbackData } from "@/lib/collaborative-network/fallback-data"
import type { NetworkDetail, NetworkGraphData } from "@/types/collaborative-network"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

function NetworkVisualization({ graphData }: any) {
  return <div className="border p-4">[Graph Visualization Placeholder]</div>
}

function NetworkStats({ stats }: any) {
  return <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(stats, null, 2)}</pre>
}

function NetworkMembers({ members, onMemberUpdate, onMemberDelete, onMemberCreate }: any) {
  const [editedMembers, setEditedMembers] = useState(members)

  useEffect(() => {
    setEditedMembers(members)
  }, [members])

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...editedMembers]
    updated[index] = { ...updated[index], [field]: value }
    setEditedMembers(updated)
  }

  const handleCreate = () => {
    const newMember = { id: crypto.randomUUID(), name: "New Member", role: "", department: "" }
    onMemberCreate(newMember)
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleCreate}>+ Add Member</Button>
      {editedMembers.map((m: any, index: number) => (
        <div key={m.id} className="p-2 border rounded space-y-1">
          <input
            className="border p-1 w-full"
            value={m.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            className="border p-1 w-full"
            value={m.role}
            onChange={(e) => handleChange(index, "role", e.target.value)}
          />
          <input
            className="border p-1 w-full"
            value={m.department}
            onChange={(e) => handleChange(index, "department", e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={() => onMemberUpdate(editedMembers[index])}>Save</Button>
            <Button variant="destructive" onClick={() => onMemberDelete(m.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function NetworkProjects({ projects, onProjectUpdate, onProjectDelete, onProjectCreate }: any) {
  const [editedProjects, setEditedProjects] = useState(projects)

  useEffect(() => {
    setEditedProjects(projects)
  }, [projects])

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...editedProjects]
    updated[index] = { ...updated[index], [field]: value }
    setEditedProjects(updated)
  }

  const handleCreate = () => {
    const newProject = {
      id: crypto.randomUUID(),
      title: "New Project",
      description: "",
      status: "active",
      tags: [],
      members: [],
      progress: 0,
    }
    onProjectCreate(newProject)
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleCreate}>+ Add Project</Button>
      {editedProjects.map((p: any, index: number) => (
        <div key={p.id} className="p-2 border rounded space-y-1">
          <input
            className="border p-1 w-full"
            value={p.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
          />
          <textarea
            className="border p-1 w-full"
            value={p.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />
          <select
            className="border p-1 w-full"
            value={p.status}
            onChange={(e) => handleChange(index, "status", e.target.value)}
          >
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="completed">Completed</option>
            <option value="on hold">On Hold</option>
          </select>
          <div className="flex gap-2">
            <Button onClick={() => onProjectUpdate(editedProjects[index])}>Save</Button>
            <Button variant="destructive" onClick={() => onProjectDelete(p.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CollaborativeNetworkEditor({
  networkId,
  initialData,
  categoryId,
  itemId,
  subitemId,
}: {
  networkId?: string
  initialData?: NetworkDetail
  categoryId?: string
  itemId?: string
  subitemId?: string
}) {
  const router = useRouter()
  const [network, setNetwork] = useState<NetworkDetail | null>(null)
  const [graphData, setGraphData] = useState<NetworkGraphData>({ nodes: [], links: [] })
  const [tab, setTab] = useState("overview")
  const [showData, setShowData] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Use provided data or fallback
    const data = initialData || networkFallbackData
    setNetwork(data)
    try {
      setGraphData(generateNetworkGraphData(data))
    } catch {
      setGraphData({ nodes: [], links: [] })
    }
  }, [initialData])

  if (!network) return <div>Loading...</div>

  const updateMembers = (modifier: (members: any[]) => any[]) => {
    setNetwork((prev) => (prev ? { ...prev, members: modifier(prev.members) } : prev))
  }

  const updateProjects = (modifier: (projects: any[]) => any[]) => {
    setNetwork((prev) => (prev ? { ...prev, projects: modifier(prev.projects) } : prev))
  }

  const handleSave = async () => {
    if (!network) return

    setIsSaving(true)

    try {
      // If we have category, item, and subitem IDs, save to the database
      if (categoryId && itemId && subitemId) {
        const response = await fetch("/api/network", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            networkData: network,
            categoryId,
            itemId,
            subitemId,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to save network data")
        }

        toast({
          title: "Success",
          description: "Network data saved successfully",
        })

        // Refresh the page to show updated data
        router.refresh()
      } else {
        // Just show the data if we don't have IDs
        setShowData(true)
      }
    } catch (error) {
      console.error("Error saving network data:", error)
      toast({
        title: "Error",
        description: "Failed to save network data",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">{network.name}</h1>
          <p className="text-gray-600">{network.description}</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
          {isSaving ? "Saving..." : "Save Network"}
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <NetworkVisualization graphData={graphData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <NetworkStats stats={network.stats} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <NetworkMembers
            members={network.members}
            onMemberUpdate={(updated) => updateMembers((m) => m.map((x) => (x.id === updated.id ? updated : x)))}
            onMemberDelete={(id) => updateMembers((m) => m.filter((x) => x.id !== id))}
            onMemberCreate={(m) => updateMembers((mem) => [...mem, m])}
          />
        </TabsContent>

        <TabsContent value="projects">
          <NetworkProjects
            projects={network.projects}
            onProjectUpdate={(updated) => updateProjects((p) => p.map((x) => (x.id === updated.id ? updated : x)))}
            onProjectDelete={(id) => updateProjects((p) => p.filter((x) => x.id !== id))}
            onProjectCreate={(p) => updateProjects((prj) => [...prj, p])}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button onClick={() => setShowData(!showData)}>{showData ? "Hide Data" : "Show Data"}</Button>
        {showData && (
          <pre className="mt-4 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap overflow-auto max-h-96">
            {JSON.stringify(network, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
