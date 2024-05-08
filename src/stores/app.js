// Utilities
import { defineStore } from 'pinia'
import { VIEW_TYPE } from '@/utils/const.js'
import { SORT_BY } from "@/utils/const.js";

const { GRID_VIEW } = VIEW_TYPE
const { TOTAL } = SORT_BY;

export const useAppStore = defineStore('app', {
  state: () => ({
    viewType: GRID_VIEW,
    filters: {
      sortBy: TOTAL,
      isDesc: true,
      date: null
    }
  }),
  actions: {
    setFilters(newFilters) {
      this.filters = newFilters
    },
    changeView(newViewType) {
      this.viewType = newViewType
    }
  }
})
