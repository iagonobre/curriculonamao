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
  phone: string
  maritalStatus: string
  linkedin: string | null
  cep: string | null
  address: string | null
  district: string
  city: string
  state: string
  number: number | null
  purpose: string
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
  id: number | null
  name: string
  level: string
  resumeId: number | null
}

export type AditionalCourses = {
  id: number | null
  courseName: string
  schoolName: string
  level: string
  totalTime: string
  nowCoursing: boolean
  startDate: Date
  endDate: Date | null
}

export type ProfessionalExperiences = {
  id: number | null
  businessName: string
  position: string
  nowExperience: boolean
  startDate: Date
  endDate: Date | null
  description: string
}

export type SchoolEducation = {
  id: number | null
  position: string
  schoolName: string
  course: string
  nowCoursing: boolean
  startDate: Date
  endDate: Date | null
}

export type Author = {
  id: number | null
  createdAt: Date
  email: string
  activated: boolean
  name: string
  password: string
  refreshToken: string | null
  admin: boolean | null
}