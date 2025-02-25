import axios, { AxiosError } from "axios";

const API_BASE_URL = "/api";

interface ApiNavItem {
  id: number;
  title: string;
  target?: string;
  children?: ApiNavItem[];
  visible?: boolean;
}

interface TrackMovementPayload {
  id: number;
  from: number;
  to: number;
}

interface RetryConfig {
  maxRetries: number;
  delayMs: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  delayMs: 1000,
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      console.error(`Attempt ${attempt}/${config.maxRetries} failed:`, error);

      if (attempt < config.maxRetries) {
        console.log(`Retrying in ${config.delayMs}ms...`);
        await delay(config.delayMs);
      }
    }
  }

  throw new Error(
    `Failed after ${config.maxRetries} attempts. Last error: ${lastError?.message}`
  );
}

export const navService = {
  // Get navigation items
  getNavItems: async (): Promise<ApiNavItem[]> => {
    return withRetry(async () => {
      try {
        const response = await api.get<ApiNavItem[]>("/nav");
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 500) {
          throw new Error("Server error - retrying...");
        }
        throw error;
      }
    });
  },

  // Save navigation items
  saveNavItems: async (items: ApiNavItem[]): Promise<void> => {
    return withRetry(async () => {
      try {
        await api.post("/nav", items);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 500) {
          throw new Error("Server error - retrying...");
        }
        throw error;
      }
    });
  },

  // Track item movement
  trackMovement: async ({
    id,
    from,
    to,
  }: TrackMovementPayload): Promise<void> => {
    return withRetry(
      async () => {
        try {
          await api.post("/track", { id, from, to });
        } catch (error) {
          if (error instanceof AxiosError && error.response?.status === 500) {
            throw new Error("Server error - retrying...");
          }
          if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error("Invalid movement data");
          }
          throw error;
        }
      },
      {
        maxRetries: 2,
        delayMs: 500,
      }
    );
  },
};

export type { ApiNavItem, TrackMovementPayload };
