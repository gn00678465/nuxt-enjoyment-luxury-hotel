import { assign, setup, fromPromise, emit } from "xstate"
import type { OrderReqBody } from "~/types"

type OrderMachineContext = {
  peopleNum: number
  daysCount: number
  checkInDate: number | null
  checkOutDate: number | null
  maxPeople: number
  minPeople: number
} & Omit<OrderReqBody, 'checkInDate' | 'checkOutDate' | 'peopleNum'>

type OrderMachineEvent = { type: 'INCREMENT' } |
{ type: 'DECREMENT' } |
{ type: 'DATE_CHANGE', dates: { start: number , end: number }, daysCount: number } |
{ type: 'USER_INFO_UPDATE'; data: Omit<OrderReqBody, 'checkInDate' | 'checkOutDate' | 'peopleNum'> } |
{ type: 'NEXT' } |
{ type: 'PREV' }

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
    userDataUpdate: assign(({ context }, params: Omit<OrderReqBody, 'checkInDate' | 'checkOutDate' | 'peopleNum'>) => ({
      ...context,
      ...params
    }))
  }
}).createMachine({
  id: 'order-machine',
  initial: 'orderInfo',
  context: ({ input }) => ({
    peopleNum: 1,
    daysCount: 0,
    checkInDate: new Date().getTime(),
    checkOutDate: null,
    maxPeople: input.maxPeople || Infinity,
    minPeople: 1,
    name: '',
    email: '',
    phone: '',
    address: {
      city: '',
      county: '',
      detail: '',
      zipcode: 0
    }
  }),
  states: {
    orderInfo: {
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
        },
        NEXT: {
          target: 'useInfo'
        }
      }
    },
    useInfo: {
      on: {
        USER_INFO_UPDATE: {
          actions: [
            {
              type: 'userDataUpdate', params: ({ event }) => event.data,
            }
          ]
        },
        NEXT: {
          target: 'useInfo'
        },
        PREV: {
          target: 'orderInfo'
        },
      }
    },
    submit: {}
  }
})