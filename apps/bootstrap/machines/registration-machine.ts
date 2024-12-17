import { assign, setup, fromPromise, emit } from "xstate"
import type { RegistrationReqBody, AuthResponse } from "~/types"
import { postSignup } from "~/api/auth"

type AuthForm = Pick<RegistrationReqBody, 'email' | 'password'>
type BasicForm = Omit<RegistrationReqBody, 'email' | 'password'>

export type RegistrationMachineContext = {
  form: RegistrationReqBody | Partial<RegistrationReqBody>
  step: number
  loading: boolean
}

export type RegistrationMachineEvents = { type: 'NEXT', data: AuthForm | BasicForm } |
{type: 'PREV' }

export type RegistrationMachineEmitted = { type: 'onSuccess', data: AuthResponse } |
{ type: 'onError', error: unknown }

export type RegistrationMachineStates = 'emailAndPassword' | 'basicInformation'

export const registrationMachine = setup({
  types: {
    events: {} as RegistrationMachineEvents,
    tags: {} as RegistrationMachineStates,
    context: {} as RegistrationMachineContext,
    emitted: {} as RegistrationMachineEmitted
  },
  actors: {
    postSignupLogic: fromPromise(async ({ input }: { input: RegistrationReqBody }) => {
      return await postSignup({ body: input })
    })
  },
  actions: {
    updateForm: assign(({ context }, params: AuthForm | BasicForm) => ({
      form: { ...context.form, ...params }
    })),
    nextStep: assign(({ context }) => ({ step: context.step + 1 })),
    prevStep: assign(({ context }) => ({ step: context.step + -1 })),
    toggleLoading: assign(({ context }) => ({ loading: !context.loading }))
  }
}).createMachine({
  id: 'registration-machine',
  initial: 'emailAndPassword',
  context: {
    form: {},
    step: 1,
    loading: false,
  },
  states: {
    emailAndPassword: {
      tags: ['emailAndPassword'],
      on: {
        NEXT: {
          actions: [
            { type: 'updateForm', params: ({ event }) => ({ ...event.data })},
            { type: 'nextStep' }
          ],
          target: 'basicInformation'
        }
      }
    },
    basicInformation: {
      tags: ['basicInformation'],
      on: {
        NEXT: {
          actions: [
            { type: 'updateForm', params: ({ event }) => ({ ...event.data })},
          ],
          target: 'signup'
        },
        PREV: {
          target: 'emailAndPassword',
          actions: [{ type: 'prevStep' }]
        }
      }
    },
    signup: {
      initial: 'loading',
      states: {
        loading: {
          entry: [{ type: 'toggleLoading' }],
          invoke: {
            src: 'postSignupLogic',
            input: ({ context }) => {
              const form = context.form as Required<RegistrationReqBody>
              return form
            },
            onDone: {
              target: 'success',
              actions: [
                { type: 'toggleLoading' },
                emit(({ event }) => ({ type: 'onSuccess', data: event.output }))
              ]
            },
            onError: {
              target: 'error',
              actions: [
                { type: 'toggleLoading' },
                emit(({ event }) => ({ type: 'onError', error: event.error }))
              ]
            }
          },
        },
        success: {
          type: 'final'
        },
        error: {
          type: 'final'
        },
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