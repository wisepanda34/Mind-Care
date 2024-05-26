// stores/admin.store.ts
import { IAdmin, IClient, IDoctor } from '~/types/auth.type';

export const useAdminStore = defineStore('admin', () => {
  const users = ref<IClient[] | IDoctor[] | IAdmin[]>([]);
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

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON parse error: ', jsonError);
        errorMessage.value = 'Error parsing response';
        return;
      }

      if (response.ok) {
        users.value = data.users;
      } else {
        errorMessage.value = data.message || 'Error data';
      }
    } catch (error) {
      console.error('Error fetching users: ', error);
      errorMessage.value = 'Error fetching users';
    }
  };

  return {
    users,
    errorMessage,
    searchUsers,
  };
});


