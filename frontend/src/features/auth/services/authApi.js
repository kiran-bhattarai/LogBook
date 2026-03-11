const API_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password })
  });

  return res.json();
};

export const refreshRequest = async () => {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include"
  });

  if (!res.ok) throw new Error("Refresh failed");

  return res.json();
};

export const logoutRequest = async (protectedFetch) => {
  const res = await protectedFetch(`${API_URL}/auth/logout`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Logout failed");
};

export const signupRequest = async ({ name, email, password, passwordRetype }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, passwordRetype })
  })

  const data = await res.json()
  return { res, data }
}

export const checkEmailRequest = async (email) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })

  const data = await res.json()
  return { res, data }
}

export const checkResetCodeRequest = async ({ email, code }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check-reset-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code })
  })
  const data = await res.json()
  return { res, data }
}

export const changePasswordMainRequest = async ({ email, code, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password-main`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code, password })
  })
  const data = await res.json()
  return { res, data }
}

export const getEmailRequest = async ({ protectedFetch }) => {
  const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/auth/get-email`)
  const data = await res.json()
  return { res, data }
}

export const verifyEmailRequest = async ({ protectedFetch, code }) => {
  const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  })
  const data = await res.json()
  return { res, data }
}

export const sendCodeRequest = async ({ protectedFetch, code }) => {
  const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/auth/send-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  })
  const data = await res.json()
  return { res, data }
}
