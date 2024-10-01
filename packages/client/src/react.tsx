import type { GenerateAPIKeyProps, KeyType } from "@monorepo/types";
import { useCallback, useEffect, useState } from "react";
import { APIKeyService } from ".";

export const useAPIKeyService = () => {
  const apiKeyService = new APIKeyService();
  const [keys, setKeys] = useState<KeyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const generateAPIKey = useCallback(
    async (props: GenerateAPIKeyProps) => {
      setLoading(true);
      try {
        const newKey = await apiKeyService.generateAPIKey(props);
        setKeys((keys) => [...keys, newKey]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKeyService.generateAPIKey]
  );

  const validateAPIKey = useCallback(
    async (key: string) => {
      try {
        const isValid = await apiKeyService.validateAPIKey(key);
        return isValid;
      } catch {
        return false;
      }
    },
    [apiKeyService.validateAPIKey]
  );

  const getAPIKey = useCallback(
    async (keyId: string) => {
      setLoading(true);
      try {
        const key = await apiKeyService.getAPIKey(keyId);
        setKeys((keys) => [...keys, key]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKeyService.getAPIKey]
  );

  const refreshAPIKeys = useCallback(
    async (ownerId?: string) => {
      setLoading(true);
      try {
        const keys = await apiKeyService.getAPIKeys(ownerId);
        setKeys(keys);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKeyService.getAPIKeys]
  );

  const deleteAPIKey = useCallback(
    async (keyId: string) => {
      setLoading(true);
      try {
        await apiKeyService.deleteAPIKey(keyId);
        setKeys((keys) => keys.filter((key) => key.id !== keyId));
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKeyService.deleteAPIKey]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    refreshAPIKeys();
  }, []);

  return {
    keys,
    loading,
    error,
    generateAPIKey,
    validateAPIKey,
    getAPIKey,
    refreshAPIKeys,
    deleteAPIKey,
  };
};
