import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/candidate/candidate.route'
import { CompanyRoutes } from '../modules/company/company.route'
import { JobRoutes } from '../modules/job/job.route'
import { ApplicationRoutes } from '../modules/application/application.route'
import { SavedJobRoutes } from '../modules/savedJob/savedJob.route'
import { ReviewRoutes } from '../modules/review/review.route'
import { NotificationRoutes } from '../modules/notification/notification.route'
import { CandidateExperienceRoutes } from '../modules/candidateExperience/candidateExperience.route'
import { ResumeRoutes } from '../modules/resume/resume.route'
import { ShortListRoutes } from '../modules/shortList/shortList.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/candidate',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/company',
    route: CompanyRoutes,
  },
  {
    path: '/job',
    route: JobRoutes,
  },
  {
    path: '/application',
    route: ApplicationRoutes,
  },
  {
    path: '/savedJob',
    route: SavedJobRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
  {
    path: '/candidateExperience',
    route: CandidateExperienceRoutes,
  },
  {
    path: '/resume',
    route: ResumeRoutes,
  },
  {
    path: '/shortList',
    route: ShortListRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
