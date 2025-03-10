import type { H3Event } from 'h3'

export type NustHandler = {
  route: string
  method: string
  fn: string
  controllerKey: string
}

export type NustControllers = Record<string, any>

export type Event = H3Event
