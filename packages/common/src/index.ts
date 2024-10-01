import type { GenerateAPIKeyProps, KeyType } from '@monorepo/types';
import * as crypto from 'node:crypto';

export const generateAPIKey = async ({ name, ownerId, permissions = 'read', env: environment = 'development'}: GenerateAPIKeyProps): Promise<KeyType> => {
  // Generate a random API key
  const key = crypto.randomBytes(12).toString('hex');

  return {
    id: crypto.randomUUID(),
    name,
    key: `${key.slice(0, 4)}-${key.slice(4, 8)}-${key.slice(8, 12)}`,
    env: environment,
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId,
    permissions,
    active: true
  };
}