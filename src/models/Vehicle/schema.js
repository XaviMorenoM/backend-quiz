
export default `
type Vehicle {
  id: Int!
  model: String
  make: String
  year: Int
}

type Query {
  vehicles: [Vehicle]
}

type Mutation {
  createVehicle(input: CreateVehicleInput!): VehiclePayload
  updateVehicle(input: UpdateVehicleInput!): VehiclePayload
}

input CreateVehicleInput {
  year: Int!
  make: String!
  model: String!
}

input UpdateVehicleInput {
  id: Int!
  year: Int
  make: String!
  model: String!
}

type VehiclePayload {
  vehicle: Vehicle
}
`
