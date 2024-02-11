export const CONFIG = {
  redis: {
    url: process.env.REDIS_URL,
  },
  session: {
    cookieName: "auth_session_id",
    sessionExpiresAfterHours: 24,
    alertMessageExpiresAfterMinutes: 5,
  },
};
