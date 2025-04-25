/**
 * Serializes MongoDB documents to plain JavaScript objects
 * Converts ObjectIds to strings and handles nested objects and arrays
 */
export function serializeMongoData(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj
    }
  
    // Handle ObjectId directly
    if (
      obj._bsontype === "ObjectID" ||
      obj._bsontype === "ObjectId" ||
      (obj.id && obj.constructor && (obj.constructor.name === "ObjectID" || obj.constructor.name === "ObjectId"))
    ) {
      return obj.toString()
    }
  
    // Handle Date objects
    if (obj instanceof Date) {
      return obj.toISOString()
    }
  
    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(serializeMongoData)
    }
  
    // Handle plain objects
    if (typeof obj === "object") {
      // Skip if the object has a toJSON method - create a new plain object instead
      const serialized: Record<string, any> = {}
  
      // Get all enumerable properties
      for (const [key, value] of Object.entries(obj)) {
        // Special handling for _id field
        if (key === "_id" && value && typeof value === "object" && value.toString) {
          serialized[key] = value.toString()
        } else {
          serialized[key] = serializeMongoData(value)
        }
      }
      return serialized
    }
  
    return obj
  }
  