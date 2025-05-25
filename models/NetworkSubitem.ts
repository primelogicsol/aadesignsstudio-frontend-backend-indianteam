import mongoose, { Schema } from "mongoose"

// Define the schema for network members
const NetworkMemberSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String },
  avatar: { type: String },
  department: { type: String },
  location: { type: String },
  skills: [{ type: String }],
  connections: [{ type: String }],
  contributionScore: { type: Number },
  joinedAt: { type: String },
  status: { type: String, default: "active" },
  bio: { type: String },
  email: { type: String },
  socialLinks: { type: Schema.Types.Mixed },
})

// Define the schema for network projects
const NetworkProjectSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "active" },
  progress: { type: Number, default: 0 },
  startDate: { type: String },
  endDate: { type: String },
  members: [{ type: String }],
  tags: [{ type: String }],
  milestones: [
    {
      id: { type: String },
      title: { type: String },
      dueDate: { type: String },
      completed: { type: Boolean, default: false },
    },
  ],
})

// Define the schema for network activities
const NetworkActivitySchema = new Schema({
  id: { type: String, required: true },
  type: { type: String },
  timestamp: { type: String },
  memberId: { type: String },
  projectId: { type: String },
  content: { type: String },
})

// Define the schema for network stats
const NetworkStatsSchema = new Schema({
  totalMembers: { type: Number, default: 0 },
  activeMembers: { type: Number, default: 0 },
  totalProjects: { type: Number, default: 0 },
  activeProjects: { type: Number, default: 0 },
  completedProjects: { type: Number, default: 0 },
  averageConnections: { type: Number, default: 0 },
  topContributors: [{ type: String }],
  mostActiveProject: { type: String },
  activityTrend: [
    {
      date: { type: String },
      count: { type: Number },
    },
  ],
  collaborationScore: { type: Number, default: 0 },
})

// Define the main NetworkSubitem schema
const NetworkSubitemSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    itemId: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, default: "organization" },
    visibility: { type: String, default: "public" },
    tags: [{ type: String }],
    logo: { type: String },
    coverImage: { type: String },
    members: { type: [NetworkMemberSchema], default: [] },
    projects: { type: [NetworkProjectSchema], default: [] },
    activities: { type: [NetworkActivitySchema], default: [] },
    stats: { type: NetworkStatsSchema, default: {} },
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String, default: () => new Date().toISOString() },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Update timestamps before saving
NetworkSubitemSchema.pre("save", function (next) {
  this.updatedAt = new Date().toISOString()
  if (!this.createdAt) {
    this.createdAt = new Date().toISOString()
  }
  next()
})

// Create and export the model
const NetworkSubitem = mongoose.models.NetworkSubitem || mongoose.model("NetworkSubitem", NetworkSubitemSchema)

export default NetworkSubitem
