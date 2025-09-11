export const useBookingStore = defineStore('booking', () => {
  const selectedDate = ref<string | null>(null)
  const selectedTime = ref<string | null>(null)

  const setDate = (date: string) => {
    selectedDate.value = date
  }
  const setTime = (time: string) => {
    selectedTime.value = time
  }
  const reset = () => {
    selectedDate.value = null
    selectedTime.value = null
  }

  return { selectedDate, selectedTime, setDate, setTime, reset }
})
