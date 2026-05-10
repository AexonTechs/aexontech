import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1'
});

async function testModel(modelName) {
  console.log(`\n🧪 Testing model: ${modelName}`);
  try {
    const completion = await Promise.race([
      client.chat.completions.create({
        model: modelName,
        messages: [{ role: 'user', content: 'Say hello' }],
        max_tokens: 50,
        stream: false
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]);
    
    console.log(`✅ ${modelName} works!`);
    console.log(`Response: ${completion.choices[0].message.content}`);
    return true;
  } catch (error) {
    console.log(`❌ ${modelName} failed: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🔍 Testing NVIDIA NIM models...\n');
  
  const modelsToTest = [
    'deepseek-ai/deepseek-v4-pro',
    'meta/llama-3.1-8b-instruct',
    'meta/llama-3.1-70b-instruct',
    'mistralai/mixtral-8x7b-instruct-v0.1',
    'google/gemma-2-9b-it'
  ];
  
  for (const model of modelsToTest) {
    await testModel(model);
  }
  
  console.log('\n✅ Test complete!');
  process.exit(0);
}

main();
