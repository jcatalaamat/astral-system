import { createClient } from '@sanity/client';

interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion?: string;
  useCdn?: boolean;
}

export function createSanityClient(config: SanityConfig) {
  return createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion || '2024-01-01',
    useCdn: config.useCdn ?? true,
  });
}
