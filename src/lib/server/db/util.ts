import { db } from ".";
import { tokens } from "./schema";

export const getToken = (): string | null => {
  const token = db.select().from(tokens).all()?.[0] || null;
  return token?.token || null;
}

export const clearTokens = (): void => {
  db.delete(tokens).returning().get();
}

export const setToken = (token: string): typeof tokens.$inferInsert => {
  clearTokens();
  return db.insert(tokens).values({ token }).returning().get();
}
