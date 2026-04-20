const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.2.183:8081';

export const authService = {
  registerManufacturer: async (data) => {
    console.log("manufacutreer details : ");
    console.log(data);
    const response = await fetch(`${API_URL}/api/admin/register-manufacturer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch((err) => console.log(err));
      throw new Error(errorData?.message || Object.values(errorData?.errors).join(", ") || 'Failed to register manufacturer');
    }

    // Sometimes response might be just text or json
    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  },

  registerVendor: async (data) => {
    console.log("vendor details : ");
    console.log(data);

    const response = await fetch(`${API_URL}/api/vendor/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch((err) => console.log(err));
      console.log("error data " + errorData);
      throw new Error(errorData?.message || Object.values(errorData?.errors).join(", ") || 'Failed to register vendor');
    }


    try {
      const data = await response.json();
      return data;
    } catch {
      return { success: true };
    }
  },

  registerCustomer: async (data) => {
    console.log("customer details : ");
    console.log(data);

    const response = await fetch(`${API_URL}/api/customer/register-customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch((err) => console.log(err));
      throw new Error(errorData?.message || Object.values(errorData?.errors).join(", ") || 'Failed tqo register customer');
    }

    try {
      return await response.json();
    } catch {
      return { success: true }; // Fallback for 200 OK without JSON body
    }
  },

  loginUser: async (data, role) => {
  console.log(`login attempt for ${role}:`, data);

  const response = await fetch(`${API_URL}/api/login`, {   // ✅ FIXED
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || 
      (errorData?.errors && Object.values(errorData.errors).join(", ")) || 
      'Failed to log in'
    );
  }

  try {
    return await response.json();
  } catch {
    return { success: true };
  }
}

};
