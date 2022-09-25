export type CvProps = {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  staticURL: string | null
  authorId: number | null
  fullName: string
  bornDate: Date
  email: string
  maritalStatus: string
  linkedin: string | null
  cep: string | null
  address: string | null
  district: string
  city: string
  state: string
  number: number | null
  cvPhotoURL: string | null
  cidNumber: number | null
  deficiencyLevel: string | null
  haveCertificate: boolean | null
  addaptationDescription: string | null
  limitationDescription: string | null
  aditionalInformation: string | null
  ability: Ability[]
  aditonalCourses: AditionalCourses[]
  professionalExperiences: ProfessionalExperiences[]
  schoolEducation: SchoolEducation[]
  author: Author
}

export type Ability = {
  id: number
  name: string
  level: string
  resumeId: number | null
}

export type AditionalCourses = {
  id: number
  courseName: string
  schoolName: string
  level: string
  totalTime: string
  nowCoursing: boolean
  startDate: Date
  endDate: Date | null
  resumeId: number
}

export type ProfessionalExperiences = {
  id: number
  businessName: string
  position: string
  nowExperience: boolean
  startDate: Date
  endDate: Date | null
  description: string
  resumeId: number
}

export type SchoolEducation = {
  id: number
  position: string
  schoolName: string
  course: string
  nowCoursing: boolean
  startDate: Date
  endDate: Date | null
  resumeId: number
}

export type Author = {
  id: number
  createdAt: Date
  email: string
  activated: boolean
  name: string
  password: string
  refreshToken: string | null
  admin: boolean | null
}