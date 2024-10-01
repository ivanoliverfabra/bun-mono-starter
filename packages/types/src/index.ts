export type KeyEnvironmentType = 'development' | 'production';
export type KeyPermissionType = 'read' | 'write' | 'read+write' | 'admin';

export type KeyType = {
  id: string;                   // Unique identifier for the API key
  name?: string;                // Optional name for the API key
  key: string;                  // The actual API key value
  env: KeyEnvironmentType; // Environment in which the API key is valid (e.g., 'development' or 'production')
  createdAt: Date;              // Date when the API key was created
  updatedAt: Date;              // Date when the API key was last updated
  expiresAt?: Date;             // Optional expiration date for the API key
  ownerId: string;              // ID of the user or service that owns this API key
  permissions: KeyPermissionType; // Permissions granted to the API key
  active: boolean;              // Status of the API key, whether it's active or inactive
  usageLimit?: number;          // Optional limit on the number of times the key can be used
  usageCount?: number;          // Number of times the API key has been used
};

export type GenerateAPIKeyProps = {
  name?: string;
  ownerId: string;
  permissions?: KeyPermissionType;
  env?: KeyEnvironmentType;
};

export interface APIKeyServiceI {
  generateAPIKey(props: GenerateAPIKeyProps): Promise<KeyType>;
  validateAPIKey(key: string): Promise<boolean>;
  getAPIKey(key: string): Promise<KeyType | null>;
  getAPIKeys(ownerId: string): Promise<KeyType[]>;
  deleteAPIKey(key: string): Promise<boolean>;
}