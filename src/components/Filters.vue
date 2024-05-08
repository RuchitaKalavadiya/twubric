<script setup>
import { computed, ref } from "vue";
import { useAppStore } from "@/stores/app";
import { SORT_BY } from "@/utils/const.js";
import { formateDate } from "@/utils/helper";

const { CHIRPINESS, FRIENDS, INFLUENCE, TOTAL } = SORT_BY;
const appStore = computed(() => useAppStore());

const isVisible = ref(false);
const selectedDate = ref(null);
const parsedDate = computed(() => {
  if (selectedDate.value?.length > 1) {
    const startDate = selectedDate.value[0];
    const endDate = selectedDate.value[selectedDate.value.length - 1];

    appStore.value.setFilters({
      ...appStore.value.filters,
      date: [startDate, endDate],
    });
    return `${formateDate(startDate)} to ${formateDate(endDate)}`;
  }

  return null;
});

const sortBy = computed(() => appStore.value.filters.sortBy);
const isDesc = computed(() => appStore.value.filters.isDesc);

const sortByOptions = [
  { text: "Chirpiness", value: CHIRPINESS },
  { text: "Friends", value: FRIENDS },
  { text: "Influence", value: INFLUENCE },
  { text: "Total", value: TOTAL },
];

const handleDateChange = () => {
  if (selectedDate.value?.length > 1) {
    isVisible.value = false;
  }
};

const handleClearDate = () => {
  appStore.value.setFilters({
    ...appStore.value.filters,
    date: null,
  });

  selectedDate.value = null;
};

const handleSortByClick = (newSortBy) => {
  if (newSortBy === sortBy.value) {
    appStore.value.setFilters({
      ...appStore.value.filters,
      isDesc: !isDesc.value,
    });
  } else {
    appStore.value.setFilters({
      ...appStore.value.filters,
      sortBy: newSortBy,
      isDesc: true,
    });
  }
};
</script>
<template>
  <v-card class="my-4">
    <v-card-text>
      <v-row>
        <v-col>
          <h4 class="pb-2">Sort By:</h4>
          <div class="d-flex ga-2">
            <v-chip
              v-for="option in sortByOptions"
              :key="option.value"
              color="primary"
              :variant="sortBy === option.value ? 'flat' : 'outlined'"
              @click="handleSortByClick(option.value)"
            >
              {{ option.text }}
              {{
                sortBy === option.value ? `(${isDesc ? "Desc" : "Asc"})` : ""
              }}
            </v-chip>
          </div>
        </v-col>
        <v-col>
          <h4 class="pb-2">Select Date Range:</h4>
          <div>
            <v-menu v-model="isVisible" :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="parsedDate"
                  v-bind="props"
                  readonly
                  placeholder="Select Date Range"
                  variant="outlined"
                  density="compact"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="selectedDate"
                hide-header
                color="primary"
                :multiple="'range'"
                @update:model-value="handleDateChange"
              >
                <template #actions>
                  <v-btn @click="handleClearDate"> Clear </v-btn>
                </template>
              </v-date-picker>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
