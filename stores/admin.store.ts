// stores/admin.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IAdmin, IClient, IDoctor } from '~/types/auth.type';

export const useAdminStore = defineStore('admin', () => {
  const users = ref<IClient[] | IDoctor[] | IAdmin[]>([]);
  const errorMessage = ref<string | null>(null);

  const searchUsers = async (query: String[]) => {
    const queryString = query.join('&');
    console.log('queryString ', queryString);
    
    try {
      const response = await fetch(`/api/admin/getUser?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.ok) {
        users.value = data.users;
      } else {
        errorMessage.value = data.message || 'Error data';
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


