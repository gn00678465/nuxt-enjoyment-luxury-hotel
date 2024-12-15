import { assign, setup, fromPromise, emit } from "xstate"
import { formatRFC3339 } from "date-fns"

type OrderMachineContext = {
  peopleNum: number
  daysCount: number
  checkInDate: number | null
  checkOutDate: number | null
  maxPeople: number
  minPeople: number
}

type OrderMachineEvent = { type: 'INCREMENT' } |
{ type: 'DECREMENT' } |
{ type: 'DATE_CHANGE', dates: { start: number , end: number }, daysCount: number }

type OrderMachineInput = {
  maxPeople?: number
}

export const orderMachine = setup({
  types: {
    context: {} as OrderMachineContext,
    events: {} as OrderMachineEvent,
    input: {} as OrderMachineInput
  },
  actions: {
    increment: assign(({ context }) => {
      if (context.peopleNum < context.maxPeople ) {
        return { peopleNum: context.peopleNum + 1 }
      }
      return { peopleNum: context.peopleNum }
    }),
    decrement: assign(({ context }) => {
      if (context.peopleNum <= context.minPeople ) {
        return { peopleNum: context.minPeople }
      }
      return { peopleNum: context.peopleNum - 1 }
    }),
  }
}).createMachine({
  id: 'order-machine',
  initial: 'order',
  context: ({ input }) => ({
    peopleNum: 1,
    daysCount: 0,
    checkInDate: new Date().getTime(),
    checkOutDate: null,
    maxPeople: input.maxPeople || Infinity,
    minPeople: 1
  }),
  states: {
    order: {
      on: {
        INCREMENT: {
          actions: 'increment'
        },
        DECREMENT: {
          actions: 'decrement'
        },
        DATE_CHANGE: {
          actions: assign(({ event }) => ({
            checkInDate: event.dates.start,
            checkOutDate: event.dates.end,
            daysCount: event.daysCount
          }))
        }
      }
    },
    basicInfo: {},
    submit: {}
  }
})