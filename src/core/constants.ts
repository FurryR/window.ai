import type { ModelConfig } from "./models/model"

export const PORT_NAME = "web41"

export enum ContentMessageType {
  Request = "request",
  Response = "response",
  Cancel = "cancel"
}

export interface CompletionRequest {
  prompt: string
  shouldStream?: boolean
  isLocal?: boolean
}

export interface CompletionResponse {
  completion: string
}

export interface StreamResponse {
  text: string
}

export const IS_SERVER = typeof chrome === "undefined"
