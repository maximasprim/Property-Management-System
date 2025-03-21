import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from './Users/user.router'
import { vehiclesRouter} from './Vehicles/vehicles.router'
import { locationRouter } from './Location and branches/location.router'
import { bookingsRouter } from './Bookings/Bookings.router'
import { paymentsRouter } from './Payments/payments.router'
import { houseRouter } from './Houses/houses.router'
import { houseHistoryRouter } from './Houses_History/houseHistory.router'
import { landRouter } from './Lands/lands.router'
import { authRouter } from './Authentication/auth.router'
import { landHistoryRouter } from './Land_History/landHistory.router'
import { vehiclesHistoryRouter } from './vehicleHistory/vehiclesHistory.router'
import { reviewRouter } from './Reviews/review.router'
import paymentRouter from './mpesa payment/payment.router'
import {cors} from 'hono/cors'

const app = new Hono()

//enable cors
app.use(cors());
app.use('*', cors());

app.use(cors({
  origin: '*',
  allowMethods : ['GET','POST','PUT','DELETE','OPTIONS'],
  allowHeaders : ['Content-Type','Authorization'],
}));

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
app.route('/',houseHistoryRouter)
app.route('/',landRouter)
app.route('/',authRouter)
app.route('/',landHistoryRouter)
app.route('/',vehiclesHistoryRouter)
app.route('/',reviewRouter)
app.route('/',paymentRouter)
