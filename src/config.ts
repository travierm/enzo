export const CONFIG = {
  redis: {
    url: "redis://localhost:6379/1",
  },
  session: {
    cookieName: "auth_session_id",
    sessionExpiresAfterHours: 24,
    alertMessageExpiresAfterMinutes: 5,
  },
};
