<script setup>
import { formateDate } from "@/utils/helper";

const emit = defineEmits(["onRemove"]);
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between text-subtitle-1">
      <span>{{ data.fullname }}</span>
      <span>{{ data.twubric.total }}</span>
    </v-card-title>
    <v-divider />
    <v-card-item class="pa-0">
      <v-row class="py-2 px-2">
        <v-col cols="4" class="text-center border">
          {{ data.twubric.friends }}
          <div class="text-subtitle-1">friends</div>
        </v-col>
        <v-col cols="4" class="text-center border">
          {{ data.twubric.influence }}
          <div class="text-subtitle-1">influence</div>
        </v-col>
        <v-col cols="4" class="text-center border">
          {{ data.twubric.chirpiness }}
          <div class="text-subtitle-1">chirpiness</div>
        </v-col>
        <v-col cols="4" class="border font-weight-medium text-center">
          {{ formateDate(data.join_date, { isStamp: true }) }}
        </v-col>
        <v-col class="border text-end">
          <v-btn
            variant="text"
            color="primary"
            density="comfortable"
            @click="emit('onRemove')"
          >
            Remove
          </v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
