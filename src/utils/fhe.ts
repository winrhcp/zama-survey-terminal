import init, { TfheClientKey, TfhePublicKey, TfheCompressedPublicKey, TfheCompactPublicKey, TfheConfigBuilder, CompressedFheUint8 } from 'tfhe';

export interface FheTfheInstance {
  clientKey: TfheClientKey;
  publicKey: TfhePublicKey;
  compressedPublicKey: TfheCompressedPublicKey;
  compactPublicKey: TfheCompactPublicKey;
}

export interface EncryptedAnswer {
  ciphertext: Uint8Array;
  proof: Uint8Array;
}

let fheInstance: FheTfheInstance | null = null;

export const initializeFHE = async (): Promise<FheTfheInstance> => {
  if (fheInstance) return fheInstance;
  
  try {
    // Initialize the WASM module first
    await init();
    
    // Create default configuration
    const config = TfheConfigBuilder.default().build();
    
    // Generate FHE keys
    const clientKey = TfheClientKey.generate(config);
    const publicKey = TfhePublicKey.new(clientKey);
    const compressedPublicKey = TfheCompressedPublicKey.new(clientKey);
    const compactPublicKey = TfheCompactPublicKey.new(clientKey);
    
    fheInstance = {
      clientKey,
      publicKey,
      compressedPublicKey,
      compactPublicKey
    };
    
    return fheInstance;
  } catch (error) {
    console.error('Failed to initialize FHE:', error);
    throw new Error('FHE initialization failed');
  }
};

export const encryptAnswer = async (answer: number): Promise<EncryptedAnswer> => {
  if (!fheInstance) {
    throw new Error('FHE not initialized. Call initializeFHE() first.');
  }
  
  try {
    // Encrypt the answer using the client key (for now we'll use compressed encryption)
    const compressed = CompressedFheUint8.encrypt_with_client_key(answer, fheInstance.clientKey);
    
    // Generate a proof for the encrypted value
    // Note: In a real implementation, you would generate a proper zero-knowledge proof
    // For now, we'll use a simple proof structure
    const proof = new Uint8Array(32); // Placeholder proof
    crypto.getRandomValues(proof);
    
    return {
      ciphertext: compressed.serialize(),
      proof
    };
  } catch (error) {
    console.error('Failed to encrypt answer:', error);
    throw new Error('Answer encryption failed');
  }
};

export const encryptAnswers = async (answers: number[]): Promise<EncryptedAnswer[]> => {
  if (!fheInstance) {
    throw new Error('FHE not initialized. Call initializeFHE() first.');
  }
  
  try {
    const encryptedAnswers = await Promise.all(
      answers.map(async (answer) => {
        return await encryptAnswer(answer);
      })
    );
    
    return encryptedAnswers;
  } catch (error) {
    console.error('Failed to encrypt answers:', error);
    throw new Error('Answers encryption failed');
  }
};

export const getFheInstance = (): FheTfheInstance | null => {
  return fheInstance;
};