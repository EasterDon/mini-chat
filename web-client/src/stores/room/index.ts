import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([]);

  const init_rooms = (init_rooms_value) => {
    rooms.value = [...init_rooms_value];
  };

  return { rooms, init_rooms };
});
