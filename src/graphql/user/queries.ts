import { User } from './'
export const queries=`
   getUserToken(email: String!, password: String!): String
    getCurrentLoggedInUser: User
`