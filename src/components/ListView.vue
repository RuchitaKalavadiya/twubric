<script setup>
import { formateDate } from "@/utils/helper";

const headerItems = [
  { key: "image", title: "Profile" },
  { key: "username", title: "Username" },
  { key: "fullname", title: "Full Name" },
  { key: "twubric", title: "Twubric" },
  { key: "join_date", title: "Join Date" },
  { key: "action", title: "Action" },
];

const emit = defineEmits(["onRemove"]);

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <v-card>
    <v-card-text>
      <table class="w-100">
        <tr class="header">
          <th v-for="header in headerItems" :key="header.key">
            {{ header.title }}
          </th>
        </tr>

        <tr v-for="data in items" :key="data.uid">
          <td v-for="header in headerItems" :key="header.key">
            <div v-if="header.key === 'image'" class="list-item-img">
              <img :src="data[header.key]" class="h-100 w-100" />
            </div>
            <div v-else-if="header.key === 'join_date'">
              {{ formateDate(data[header.key], { isStamp: true }) }}
            </div>
            <div v-else-if="header.key === 'action'">
              <v-btn
                color="primary"
                variant="flat"
                density="comfortable"
                @click="emit('onRemove', data.uid)"
              >
                Remove
              </v-btn>
            </div>
            <div v-else-if="header.key === 'twubric'">
              <v-row>
                <v-col class="d-flex ga-2 right-border" cols="auto">
                  <h4>Friends:</h4>
                  <div>{{ data[header.key].friends }}</div>
                </v-col>
                <v-col class="d-flex ga-2" cols="auto">
                  <h4>Influence:</h4>
                  <div>{{ data[header.key].influence }}</div>
                </v-col>
                <v-col class="d-flex ga-2" cols="auto">
                  <h4>Chirpiness</h4>
                  <div>{{ data[header.key].chirpiness }}</div>
                </v-col>
                <v-col class="d-flex ga-2" cols="auto">
                  <h4>Total:</h4>
                  <div>{{ data[header.key].total }}</div>
                </v-col>
              </v-row>
            </div>
            <span v-else> {{ data[header.key] }} </span>
          </td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.list-item-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: thin solid #a3a3a3;
  overflow: hidden;
  text-align: center;
}

th {
  text-align: left;
}

tr:not(.header):hover {
  cursor: pointer;
  background: #e7e3e3;
  border-radius: 4px;
}

td,
th {
  padding: 0 10px;
}
</style>
