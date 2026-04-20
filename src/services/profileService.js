const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export const profileService = {
  updateCustomer: async (id, data) => {
    console.log(data,id);
    const response = await fetch(`${API_URL}/api/customer/update-customer?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch((err) => console.log(err));
      throw new Error(
        (errorData?.errors ? Object.values(errorData.errors).join(", ") : undefined) ||
        errorData?.message ||
        'Failed to update customer'
      );
    }

    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  },

  updateVendor: async (id, data) => {
    const response = await fetch(`${API_URL}/api/vendor/edit?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch((err) => console.log(err));
      throw new Error(
        (errorData?.errors ? Object.values(errorData.errors).join(", ") : undefined) ||
        errorData?.message ||
        'Failed to update vendor'
      );
    }

    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  },

  updateManufacturer: async (id, data) => {
    const response = await fetch(`${API_URL}/api/admin/update-manufacture?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch((err) => console.log(err));
      throw new Error(
        (errorData?.errors ? Object.values(errorData.errors).join(", ") : undefined) ||
        errorData?.message ||
        'Failed to update manufacturer'
      );
    }

    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  },
  getManufacturerProfile: async (id) => {
    const response = await fetch(`${API_URL}/api/admin/manufacturer?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || 'Failed to fetch manufacturer profile');
    }

    return response.json();
  },

  getVendorProfile: async (id) => {
    const response = await fetch(`${API_URL}/api/vendor/get?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || 'Failed to fetch vendor profile');
    }

    return response.json();
  },

  getCustomerProfile: async (id) => {
    const response = await fetch(`${API_URL}/api/customer/view-customer?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || 'Failed to fetch customer profile');
    }

    return response.json();
  }
};
