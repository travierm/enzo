export const CONFIG = {
  redis: {
    url: "redis://localhost:6379/1",
  },
  sesssion: {
    cookieName: "auth_session_id",
    sessionExpiresAfterHours: 24,
    garbageCollectEveryMinutes: 10,
  },
};
