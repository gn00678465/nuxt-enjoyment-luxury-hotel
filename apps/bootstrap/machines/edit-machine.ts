import { assign, setup, fromPromise, emit } from "xstate"

type EditMachineEvents = { type: 'EDIT' } |
{ type: 'SUBMIT' } |
{ type: 'CANCEL' }

type EditMachineContext = {
  isEdit: boolean
}

export const editMachine = setup({
  types: {
    events: {} as EditMachineEvents,
    tags: {} as 'idle' | 'edit',
    context: {} as EditMachineContext
  },
  actions: {
    toggleEdit: assign(({ context }) => ({ isEdit: !context.isEdit }))
  }
}).createMachine({
  id: 'edit-machine',
  context: {
    isEdit: false
  },
  initial: 'idle',
  states: {
    idle: {
      tags: ['idle'],
      on: {
        EDIT: {
          target: 'edit',
          actions: ['toggleEdit']
        }
      }
    },
    edit: {
      tags: ['edit'],
      on: {
        SUBMIT: {
          target: 'idle',
          actions: ['toggleEdit']
        },
        CANCEL: {
          target: 'idle',
          actions: ['toggleEdit']
        }
      }
    }
  }
})