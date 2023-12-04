export type Data = {
  pages: number
  success: boolean
  hasMore: boolean
  page: number
  data: User[]
}

export type User = {
  id: string
  userId: string
  gender: string
  sport: string
  meta?: Meta
  activities?: Activity[]
}

export type Meta = {
  heartrate: number
  watt: number
  speed: number
}

export type Activity = {
  id: string
  date: Date
  goalId?: string
  name?: string
  tags?: string
  sport?: string
  intervals?: Interval[]
}

export type Interval = {
  id: string
  duration: number
  intensity: number
}
export type ActivityData = {
  name: string
  date: Date
  tags: string
  sport: string
  duration: string
  intensity: string
  userId: string
}

/*
  id       String   @id @unique @default(uuid())
  name     String
  date     DateTime
  location String
  goal     String
  sport    String
  priority String
  comment  String
  User     User?    @relation(fields: [userId], references: [id])
  userId   String?
*/
export type CompetitionType = {
  id: string
  name: string
  date: Date
  location: string
  goal: string
  sport: string
  priority: string
  comment: string
  userId: string
}
