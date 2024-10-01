import type { APIKeyServiceI, GenerateAPIKeyProps, KeyType } from '@monorepo/types';

const sFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = 'http://localhost:3000';
  const url = new URL(endpoint, baseUrl).toString();
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json() as Promise<T>;
}

export class APIKeyService implements APIKeyServiceI {
  generateAPIKey(props: GenerateAPIKeyProps) {
    return sFetch<KeyType>('/keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    });
  }

  validateAPIKey(key: string) {
    return sFetch<{ valid: boolean }>(`/validate?key=${key}`).then((res) => res.valid);
  }

  getAPIKey(key: string) {
    return sFetch<KeyType>(`/keys/${key}`);
  }

  getAPIKeys(ownerId?: string) {
    return sFetch<KeyType[]>(`/keys?ownerId=${ownerId}`);
  }

  deleteAPIKey(key: string) {
    return sFetch<boolean>(`/keys/${key}`, {
      method: 'DELETE'
    });
  }
}
