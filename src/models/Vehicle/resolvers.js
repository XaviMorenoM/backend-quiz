import db from '../../db'
import Model from './model'
import { Resolvers, } from '../../utils'
import ValidMakePairs from '../../constants/ValidMakePairs'

const checkMakeCombination = (input) => {
  if (Object.keys(ValidMakePairs).indexOf(input.make) === -1) {
    throw new Error('Invalid make name')
  }
  if (ValidMakePairs[input.make].indexOf(input.model) === -1) {
    throw new Error('Invalid model name')
  }
}

export default {
  Query: {
    vehicles: Resolvers.Query.list(Model),
  },
  Mutation: {
    createVehicle: (_, {input}) => {
      checkMakeCombination(input)
      return { vehicle: Resolvers.Mutation.save(Model)(_, input) }
    },
    updateVehicle: (_, {input}) => {
      checkMakeCombination(input)
      return { vehicle: Resolvers.Mutation.save(Model)(_, input, true) }
    },
  },
}
