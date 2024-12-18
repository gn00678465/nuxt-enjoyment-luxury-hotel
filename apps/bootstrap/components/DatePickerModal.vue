<script setup lang="ts">
import IcBaselineMinus from '~icons/ic/baseline-minus';
import IcBaselinePlus from '~icons/ic/baseline-plus';
import type { Modal } from "bootstrap";
import type { Ref } from 'vue';
import { format, addYears, differenceInDays } from 'date-fns';

const modalRef = ref<HTMLDivElement>()
const { $bootstrap } = useNuxtApp();
const modal = ref<Modal|null>(null);

const open = () => {
  modal.value?.show()
}

const close = () => {
  modal.value?.hide()
}

const toggle = () => {
  modal.value?.toggle()
};

const emit = defineEmits<{
  handleDateChange: [DateChangeOptions]
}>();

const props = defineProps({
  maxPeople: {
    type: Number,
    default: 0
  },
  checkInDate: {
    type: Number,
    default: () => new Date().getTime()
  },
  checkOutDate: {
    type: Number,
    default: undefined
  }
})

const tempDate = reactive({
  date: {
    start: props.checkInDate,
    end: props.checkOutDate || null,
  },
  minDate: new Date(),
  maxDate: addYears(new Date(), 1),
  key: 0
});

const masks = {
  title: 'YYYY 年 MM 月',
  modelValue: 'YYYY-MM-DD'
};

const rows = useViewportMap({ md: 1}, 2)
const columns = useViewportMap({ md: 2}, 1);
const expanded = useViewportMap({ md: false}, true);
const titlePosition = useViewportMap({ md: 'center'}, 'left');

// const formatDateTitle = (date: string) => date?.replaceAll('-', ' / ');

const daysCount = computed(() => {
  if (tempDate.date.start && tempDate.date.end) {
    return differenceInDays(tempDate.date.end, tempDate.date.start)
  }
  return 0
})

const bookingPeopleMobile = ref(1);


const isConfirmDateOnMobile = ref(false);

const confirmDateOnMobile = () => {
  isConfirmDateOnMobile.value = true;
}

const confirmDate = () => {
  if (!tempDate.date.start || !tempDate.date.end) return

  const isMobile = useViewportMap({md: false}, true);

  if (isMobile.value) {
    emit('handleDateChange', {
      date: tempDate.date as { start: number; end: number},
      people: bookingPeopleMobile.value,
      daysCount: daysCount.value
    });
  } else {
    emit('handleDateChange', {
      date: tempDate.date as { start: number; end: number},
      daysCount: daysCount.value
    });
  }

  close();
}

const clearDate = () => {
  tempDate.date.start = new Date().getTime();
  tempDate.date.end = null;
  tempDate.key++;
}

defineExpose<DatePickerModalInst>({
  open,
  close,
  toggle
})

onMounted(() => {
  if (modalRef.value) {
    modal.value = new $bootstrap.Modal(modalRef.value);
  }
})

onBeforeUnmount(() => {
  modal.value?.dispose()
})
</script>

<script lang="ts">
export interface DatePickerModalInst {
  open: () => void
  close: () => void
  toggle: () => void
}

export type BreakpointKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export function useViewportMap<T extends Record<BreakpointKeys, unknown>>(
  mapping: Partial<T>, 
  defaultValue: T[BreakpointKeys]
): Ref<T[BreakpointKeys]> {
  const viewport = useViewport()

  // 斷點順序（從大到小）
  const breakpointOrder: BreakpointKeys[] = [
    'xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'
  ]

  return computed(() => {
    // 遍歷斷點，找出第一個符合的值
    for (const bp of breakpointOrder) {
      if (viewport.isGreaterOrEquals(bp) && mapping[bp] !== undefined) {
        return mapping[bp] as T[BreakpointKeys]
      }
    }

    // 若無對應，返回預設值
    return defaultValue
  })
}

export type DateChangeOptions = {
    date: { start: number, end: number }
    people: number
    daysCount: number
  } | {
    date: { start: number, end: number }
    daysCount: number
  }
  
</script>

<template>
  <div
    id="dateModal"
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered m-0 mt-9 mx-md-auto">
      <div
        :class="{'mt-auto': isConfirmDateOnMobile}"
        class="modal-content gap-6 gap-md-10 rounded-3xl"
      >
        <div class="d-md-none modal-header px-6 py-4 bg-neutral-40">
          <div class="d-flex flex-column gap-4">
            <button
              type="button"
              class="btn-close"
              style="margin-left: -8px !important;"
              @click="close"
            />
            <h3
              v-if="tempDate.date.end === null"
              class="text-neutral-100 fs-6 fw-bold"
            >
              選擇入住與退房日期
            </h3>
            <div
              v-else
              class="d-flex align-items-center gap-4"
            >
              <h3
                class="modal-title mb-0 text-neutral-100 fs-6 fw-bold"
              >
                {{ daysCount }} 晚
              </h3>
              <div class="d-flex gap-2 text-neutral-80 fs-8 fw-medium">
                <span>{{ format(tempDate.date.start, 'yyyy-MM-dd') }}</span>
                -
                <span>{{ tempDate.date.end && format(tempDate.date.end, 'yyyy-MM-dd') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="d-none d-md-flex modal-header gap-15 p-8 pb-0 border-0">
          <div>
            <h3
              class="modal-title mb-2 text-neutral-100 fs-5 fw-bold"
            >
              {{ daysCount }} 晚
            </h3>
            <div class="d-flex gap-2 text-neutral-80 fw-medium">
              <span>{{ format(tempDate.date.start, 'yyyy-MM-dd') }}</span>
              -
              <span>{{ tempDate.date.end && format(tempDate.date.end, 'yyyy-MM-dd') }}</span>
            </div>
          </div>

          <div class="d-flex flex-wrap gap-2 w-50 ms-auto">
            <div class="form-floating flex-grow-1">
              <input
                id="checkInDate"
                readonly
                type="date"
                :value="tempDate.date.start && format(tempDate.date.start, 'yyyy-MM-dd')"
                class="form-control p-4 pt-9 text-neutral-100 fw-medium border-neutral-100 rounded-3"
                style="min-height: 74px;"
                placeholder="yyyy-mm-dd"
              >
              <label
                class="text-neutral-80 fw-medium"
                style="top: 8px;left: 8px;"
                for="checkInDate"
              >入住
              </label>
            </div>

            <div class="form-floating flex-grow-1">
              <input
                id="checkoutDate"
                type="date"
                readonly
                :value="tempDate.date.end && format(tempDate.date.end, 'yyyy-MM-dd')"
                class="form-control p-4 pt-9 text-neutral-100 fw-medium border-neutral-100 rounded-3"
                style="min-height: 74px;"
                placeholder="yyyy-mm-dd"
              >
              <label
                class="text-neutral-80 fw-medium"
                style="top: 8px;left: 8px;"
                for="checkoutDate"
              >退房
              </label>
            </div>
          </div>
        </div>
        <div class="modal-body px-6 px-md-8 py-0">
          <div
            v-if="!isConfirmDateOnMobile"
            class="date-picker"
          >
          <VDatePicker
            :key="tempDate.key"
            v-model.range.number="tempDate.date"
            color="primary"
            :masks="masks"
            :first-day-of-week="1"
            :min-date="tempDate.minDate"
            :max-date="tempDate.maxDate"
            :rows="rows"
            :columns="columns"
            :expanded="expanded"
            :title-position="titlePosition"
            class="border-0"
          />
          </div>

          <div v-else>
            <h6 class="mb-1 text-neutral-100 fw-bold">
              選擇人數
            </h6>
            <p className="mb-4 text-neutral-80 fs-8 fw-medium">
              此房型最多供 4 人居住，不接受寵物入住。
            </p>

            <div class="d-flex align-items-center gap-4">
              <button
                :class="{'disabled bg-neutral-40': bookingPeopleMobile === 1}"
                class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle"
                type="button"
                @click="bookingPeopleMobile--"
              >
                <IcBaselineMinus
                  class="fs-5 text-neutral-100"
                />
              </button>

              <h6
                id="people"
                class="d-flex justify-content-center align-items-center mb-0 fw-bold text-neutral-100"
                style="width: 24px;"
                name="people"
              >
                {{ bookingPeopleMobile }}
              </h6>

              <button
                :class="{
                  'disabled bg-neutral-40': bookingPeopleMobile === props.maxPeople
                }"
                class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle"
                type="button"
                @click="bookingPeopleMobile++"
              >
                <IcBaselinePlus
                  class="fs-5 text-neutral-100"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          class="d-none d-md-flex modal-footer p-3 p-md-8 pt-0 border-0"
        >
          <button
            type="button"
            class="btn btn-outline-neutral-80 flex-grow-1 flex-md-grow-0 p-4 fw-bold border-0 rounded-3"
            @click="clearDate"
          >
            清除日期
          </button>
          <button
            type="button"
            class="btn btn-primary-100 flex-grow-1 flex-md-grow-0 px-8 py-4 text-neutral-0 fw-bold rounded-3"
            @click="confirmDate"
          >
            確定日期
          </button>
        </div>
        
        <div
          class="d-md-none modal-footer p-3 p-md-8 pt-0 border-0"
        >
          <template v-if="isConfirmDateOnMobile">
            <button
              type="button"
              class="btn btn-outline-neutral-80 flex-grow-1 flex-md-grow-0 p-4 fw-bold border-0 rounded-3"
              @click="isConfirmDateOnMobile = false"
            >
              重新選擇日期
            </button>
            <button
              type="button"
              class="btn btn-primary-100 flex-grow-1 flex-md-grow-0 px-8 py-4 text-neutral-0 fw-bold rounded-3"
              @click="confirmDate"
            >
              儲存
            </button>
          </template>
          <template v-else>
            <button
              type="button"
              class="btn btn-outline-neutral-80 flex-grow-1 flex-md-grow-0 p-4 fw-bold border-0 rounded-3"
              @click="clearDate"
            >
              清除日期
            </button>
            <button
              type="button"
              class="btn btn-primary-100 flex-grow-1 flex-md-grow-0 px-8 py-4 text-neutral-0 fw-bold rounded-3"
              @click="confirmDateOnMobile"
            >
              確定日期
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.modal {
  backdrop-filter: blur(10px);
}

.modal-dialog {
  max-width: 740px;
}


.date-picker :deep(.vc-primary) {
  --vc-accent-50: #f0f9ff;
  --vc-accent-100: #e0f2fe;
  --vc-accent-200: #F9F9F9;
  --vc-accent-300: #7dd3fc;
  --vc-accent-400: #38bdf8;
  --vc-accent-500: #0ea5e9;
  --vc-accent-600: #000000;
  --vc-accent-700: #FFFFFF;
  --vc-accent-800: #F9F9F9;
  --vc-accent-900: #000000;
}


.date-picker :deep(.vc-container) {
  --vc-font-family: : "Noto Serif TC", serif;
}

.date-picker :deep(.vc-pane-layout) {
  gap: 60px;
}

.date-picker :deep(.vc-header) {
  margin-bottom: 4px;
}



.date-picker :deep(.vc-title) {
  background-color: transparent;
  color: #000000;
  font-size: 1.25rem;
  font-weight: bold;
}

.date-picker :deep(.vc-arrow) {
  width: 24px;
  height: 24px;
  background-color: transparent;
}

.date-picker :deep(.vc-base-icon) {
  width: 12px;
  stroke: #000;
}

.date-picker :deep(.vc-weeks) {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-picker :deep(.vc-weeks) {
  padding: 0;
}

.date-picker :deep(.vc-weekday) {
  --vc-weekday-color: #4B4B4B;
  font-size: var(--vc-text-base);
  font-weight: 500;
  padding: 12px 14px 8px 14px;
  line-height: unset;
}

.date-picker :deep(.vc-day-content) {
  font-size: var(--vc-text-base);
  width: 44px;
  height: 44px;
}

.date-picker :deep(.vc-highlight) {
  width: 44px;
  height: 44px;
}

.date-picker :deep(.vc-attr) {
  --vc-highlight-outline-bg: #000000;
}
</style>