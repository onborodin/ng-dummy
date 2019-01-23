export interface DriverFile {
    id?: number
    blobName?: string
    fileName?: string
    mimeType?: string
    createdAt?: string
    updatedAt?: string
    driverId?: number
    fileId?: number
}

export type DriverFiles = DriverFile[]
