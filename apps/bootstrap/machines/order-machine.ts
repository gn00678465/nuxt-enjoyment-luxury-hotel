import { assign, setup, fromPromise, emit } from "xstate"
import type { OrderReqBody, OrderResponse } from "~/types"
import { postOrder } from '~/api'
import { formatRFC3339 } from 'date-fns'

const submitLogic = fromPromise(async({ input }: { input: OrderReqBody }) => {
  const authStore = useAuthStore()
  return await postOrder({
    headers: {
      Authorization: `Bearer ${authStore.token}`
    },
    body: input
  })
})

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
{ type: 'ORDER'; data: Omit<OrderReqBody, 'checkInDate' | 'checkOutDate' | 'peopleNum'> } |
{ type: 'NEXT' } |
{ type: 'PREV' }

type OrderMachineInput = {
  maxPeople?: number
}

type OrderMachineEmitted = { type: 'onSuccess', data: OrderResponse } |
{ type: 'onError', error: unknown }

export const orderMachine = setup({
  types: {
    context: {} as OrderMachineContext,
    events: {} as OrderMachineEvent,
    input: {} as OrderMachineInput,
    emitted: {} as OrderMachineEmitted
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
  },
  actors: {
    submitActor: submitLogic
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
        ORDER: {
          target: 'submit',
          actions: [
            {
              type: 'userDataUpdate', params: ({ event }) => event.data,
            }
          ]
        },
        PREV: {
          target: 'orderInfo'
        },
      }
    },
    submit: {
      type: 'final',
      invoke: {
        src: 'submitActor',
        input: ({ context }) => {
          const { maxPeople, minPeople, daysCount, checkInDate, checkOutDate, ...other } = context
          return {
            ...other,
            checkInDate: formatRFC3339(checkInDate as number),
            checkOutDate: formatRFC3339(checkOutDate as number) }
        },
        onDone: {
          actions: [
            emit(({ event }) => ({ type: 'onSuccess', data: event.output }))
          ]
        },
        onError: {
          actions: [
            emit(({ event }) => ({ type: 'onError', error: event.error }))
          ]
        }
      }
    }
  }
})