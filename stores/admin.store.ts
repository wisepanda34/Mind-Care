// stores/admin.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdminStore = defineStore('admin', () => {
  const users = ref([]);
  const errorMessage = ref<string | null>(null);

  const searchUsers = async (query: String[]) => {
    const queryString = query.join('&');
    try {
      const response = await fetch(`/api/admin/getUser?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
      if (response.ok) {

        users.value = data.users;
      } else {
        errorMessage.value = data.message || 'Error fetching users';
      }
    } catch (error) {
      errorMessage.value = 'Error fetching users';
    }
  };

  return {
    users,
    errorMessage,
    searchUsers
  };
});


