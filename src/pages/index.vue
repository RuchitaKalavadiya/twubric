<script setup>
import { computed, ref } from "vue";
import { useAppStore } from "@/stores/app";
import { VIEW_TYPE } from "@/utils/const.js";
import { responseData } from "@/utils/data";
import { formateDate } from "@/utils/helper.js";

const { GRID_VIEW, LIST_VIEW } = VIEW_TYPE;
const mainData = ref([...responseData]);

const loading = ref(false);

const appStore = computed(() => useAppStore());

const viewType = computed({
  get() {
    return appStore.value.viewType;
  },
  set(newView) {
    appStore.value.changeView(newView);
  },
});

const getTimeFromDate = (date) => {
  return new Date(formateDate(date, "YYYY-MM-DD")).getTime() / 1000;
};

const filteredData = computed(() => {
  const { sortBy, isDesc, date } = appStore.value.filters;
  let data = [...mainData.value];

  if (date?.length === 2) {
    const startDate = getTimeFromDate(date[0]);
    const endDate = getTimeFromDate(date[1]);

    console.log(`startDate`, startDate);
    console.log(`endDate`, endDate);

    data = data.filter((item) => {
      const joinDate = item.join_date;
      return joinDate >= startDate && joinDate <= endDate;
    });
  }
  data.sort((a, b) => {
    let firstData = a.twubric[sortBy];
    let secondData = b.twubric[sortBy];

    if (!isDesc) {
      return firstData - secondData;
    } else {
      return secondData - firstData;
    }
  });

  return data;
});

const handleRemove = (itemId) => {
  mainData.value = mainData.value.filter((data) => data.uid !== itemId);
};
</script>
<template>
  <div>
    <div class="text-end">
      <v-btn-toggle
        v-model="viewType"
        color="primary"
        mandatory
        border
        density="comfortable"
      >
        <v-btn :value="GRID_VIEW">Grid View</v-btn>
        <v-btn :value="LIST_VIEW">List View</v-btn>
      </v-btn-toggle>
    </div>
    <h4 class="mb-4">Active Accounts ({{ filteredData.length }})</h4>
    <h4>Filters</h4>
    <Filters />
    <div v-if="viewType === GRID_VIEW">
      <v-row>
        <v-col
          v-for="item in filteredData"
          :key="item.uid"
          cols="12"
          mg="6"
          lg="4"
        >
          <grid-view-card :data="item" @onRemove="handleRemove(item.uid)" />
        </v-col>
      </v-row>
      <v-card v-if="!filteredData.length" class="mt-3">
        <v-card-text class="text-center py-4">
          Nothing to show here!
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <ListView :items="filteredData" @onRemove="handleRemove" />
    </div>
  </div>
</template>
