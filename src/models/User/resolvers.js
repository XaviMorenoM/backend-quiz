import Model from './model'
import { Resolvers, } from '../../utils'
import db from '../../db'
export default {
  Query: {
    users: Resolvers.Query.list(Model),
    user: Resolvers.Query.single(Model),
    profitableUsers: (_, args) => {
      return new Promise((accept) => {
        const users = []
        Promise.all([db.get('User'), db.get('Vehicle'), db.get('Order')])
        .then((promises) => {
          const users = promises[0]
          const vehicles = promises[1]
          const orders = promises[2]
          accept(users.map((user) => {
            let spend = 0
            vehicles.filter(v => v.userId === user.id).forEach((vehicle) =>
              orders.filter(o => o.vehicleId === vehicle.id).forEach((order) => {
                spend += order.price
              })
            )
            return {
              user,
              spend,
            }
          }).sort((a, b) => b.spend - a.spend).slice(0, args.top))
        })
      })
    },
  },
  Mutation: {
    deleteUser: Resolvers.Mutation.delete(Model),
  },
  User: {
    vehicles: (obj, args, context) => {
      return db.get('Vehicle').filter(vehicle => vehicle.userId === obj.id)
    },
    displayName: obj => `${obj.firstName} ${obj.lastName.charAt(0)}.`,
  },
}
