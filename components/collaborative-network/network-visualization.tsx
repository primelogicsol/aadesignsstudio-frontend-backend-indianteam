"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import type { NetworkGraphData } from "@/types/collaborative-network"
import * as d3 from "d3"

// Dynamically import ForceGraph2D with no SSR to avoid issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false })

interface NetworkVisualizationProps {
  graphData: NetworkGraphData
  onNodeClick?: (nodeId: string) => void
  width?: number
  height?: number
  className?: string
}

export function NetworkVisualization({
  graphData,
  onNodeClick,
  width = 800,
  height = 600,
  className = "",
}: NetworkVisualizationProps) {
  const graphRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width, height })
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("network-graph-container")
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.max(400, container.clientWidth * 0.6),
        })
      }
    }

    handleResize() // Initial size
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Initialize graph
  useEffect(() => {
    if (graphRef.current) {
      // Add some physics
      const graph = graphRef.current

      if (graph.d3Force) {
        graph.d3Force("charge").strength(-120).distanceMax(300)
        graph.d3Force("link").distance((link) => 100 / (link.value || 1))

        // Add collision force to prevent node overlap
        graph.d3Force(
          "collision",
          d3.forceCollide((node) => Math.sqrt(node.val) * 2 + 10),
        )

        // Center the graph
        graph.zoomToFit(400, 30)
      }

      // Mark as loaded for animations
      setTimeout(() => setIsLoaded(true), 500)
    }
  }, [graphData, graphRef.current])

  // Custom node rendering with avatars
  const nodeCanvasObject = (node, ctx, globalScale) => {
    const { x, y, name, val, color } = node
    const size = Math.sqrt(val) * 2 + 4
    const fontSize = 12 / globalScale
    const nodeRadius = size / globalScale

    // Draw node circle
    ctx.beginPath()
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
    ctx.fillStyle = color || "#6b7280"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 1.5 / globalScale
    ctx.stroke()

    // Draw text label if zoomed in enough
    if (globalScale > 0.7) {
      ctx.font = `${fontSize}px Sans-Serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#ffffff"
      ctx.fillText(name, x, y + nodeRadius + fontSize)
    }
  }

  // Custom link rendering
  const linkCanvasObject = (link, ctx, globalScale) => {
    const { source, target, value } = link
    const lineWidth = Math.min(10, Math.max(1, value * 2)) / globalScale

    ctx.beginPath()
    ctx.moveTo(source.x, source.y)
    ctx.lineTo(target.x, target.y)
    ctx.strokeStyle = `rgba(156, 163, 175, ${Math.min(1, value * 0.5)})`
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }

  return (
    <motion.div
      id="network-graph-container"
      className={`relative overflow-hidden rounded-lg bg-gray-50 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {graphData.nodes.length > 0 ? (
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeRelSize={6}
          nodeVal={(node) => node.val}
          nodeColor={(node) => node.color}
          linkWidth={(link) => Math.sqrt(link.value || 1)}
          linkColor={() => "rgba(156, 163, 175, 0.6)"}
          nodeCanvasObject={nodeCanvasObject}
          linkCanvasObject={linkCanvasObject}
          onNodeClick={(node) => onNodeClick && onNodeClick(node.id)}
          cooldownTicks={100}
          onEngineStop={() => {
            if (graphRef.current) {
              graphRef.current.zoomToFit(400)
            }
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No network data available</p>
        </div>
      )}

      {/* Overlay controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() => graphRef.current && graphRef.current.zoomToFit(400)}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Fit graph"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      </div>

      {/* Loading overlay */}
      <motion.div
        className="absolute inset-0 bg-white flex items-center justify-center z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading network visualization...</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
