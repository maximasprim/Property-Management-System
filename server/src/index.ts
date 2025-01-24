import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from './Users/user.router'
import { vehiclesRouter} from './Vehicles/vehicles.router'
import { locationRouter } from './Location and branches/location.router'
import { bookingsRouter } from './Bookings/Bookings.router'
import { paymentsRouter } from './Payments/payments.router'
import { houseRouter } from './Houses/houses.router'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

app.route('/',userRouter)
app.route('/',vehiclesRouter)
app.route('/',locationRouter)
app.route('/',bookingsRouter)
app.route('/',paymentsRouter)
app.route('/',houseRouter)
