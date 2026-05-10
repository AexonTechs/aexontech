import { Embeddings } from '@langchain/core/embeddings';
import OpenAI from 'openai';

/**
 * Custom NVIDIA Embeddings class that properly handles input_type parameter
 */
export class NVIDIAEmbeddings extends Embeddings {
  constructor(config) {
    super(config);
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1'
    });
    this.model = config.model || 'nvidia/nv-embedqa-e5-v5';
  }

  /**
   * Embed documents (for storing in vector DB)
   */
  async embedDocuments(texts) {
    const embeddings = [];
    
    for (const text of texts) {
      const response = await this.client.embeddings.create({
        model: this.model,
        input: text,
        encoding_format: 'float',
        input_type: 'passage',
        truncate: 'END'
      });
      
      embeddings.push(response.data[0].embedding);
    }
    
    return embeddings;
  }

  /**
   * Embed a single query (for searching)
   */
  async embedQuery(text) {
    const response = await this.client.embeddings.create({
      model: this.model,
      input: text,
      encoding_format: 'float',
      input_type: 'query',
      truncate: 'END'
    });
    
    return response.data[0].embedding;
  }
}
