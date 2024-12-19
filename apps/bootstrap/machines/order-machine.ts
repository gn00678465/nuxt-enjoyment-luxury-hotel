import { assign, setup, fromPromise, emit } from "xstate"
import type { OrderReqBody, OrderResponse } from "~/types"
import { format } from 'date-fns'

const submitLogic = fromPromise(async({ input }: { input: OrderReqBody }) => {
  const { $api } = useNuxtApp()
  return await $api<OrderResponse>('/api/v1/orders/', {
    method: 'post',
    body: input
  })
})

type OrderMachineContext = {
  roomId: string
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
  roomId?: string
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
    roomId: input.roomId || '',
    peopleNum: 1,
    daysCount: 0,
    checkInDate: new Date().getTime(),
    checkOutDate: null,
    maxPeople: input.maxPeople || Infinity,
    minPeople: 1,
    userInfo: {
      name: '',
      email: '',
      phone: '',
      address: {
        city: '',
        county: '',
        detail: '',
        zipcode: 0
      }
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
      initial: 'idle',
      states: {
        idle: {
          invoke: {
            src: 'submitActor',
            input: ({ context }) => {
              const { maxPeople, minPeople, daysCount, checkInDate, checkOutDate, ...other } = context
              return {
                ...other,
                checkInDate: format(checkInDate as number, 'yyyy/MM/dd'),
                checkOutDate: format(checkOutDate as number, 'yyyy/MM/dd') }
            },
            onDone: {
              target: 'success',
              actions: [
                emit(({ event }) => ({ type: 'onSuccess', data: event.output }))
              ]
            },
            onError: {
              target: 'failure',
              actions: [
                emit(({ event }) => ({ type: 'onError', error: event.error }))
              ]
            }
          }
        },
        success: {
          type: 'final'
        },
        failure: {
          type: 'final'
        }
      },
      onDone: {
        target: 'done'
      }
    },
    done: {
      type: 'final'
    }
  }
})