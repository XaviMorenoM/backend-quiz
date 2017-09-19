
export default `
type User {
  id: Int!
  firstName: String
  lastName: String
  email: String
  #computed: displayName = first name and last initial
  displayName: String
  vehicles: [Vehicle]
}

type Query {
  users: [User]
  user(id: Int!): User
  profitableUsers(top: Int!): [UserSpend]
}

type Mutation {
  deleteUser(input: DeleteUserInput!): DeleteUserPayload
}

input DeleteUserInput {
  id: Int!
}

type DeleteUserPayload {
  id: Int!
  error: String
}

type UserSpend {
  user: User,
  spend: Int!
}
`
