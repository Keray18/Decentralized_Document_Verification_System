import { createHash } from 'crypto';

export function generateHash(buffer) {
    const hash = createHash('sha256');
    hash.update(buffer);
    return '0x' + hash.digest('hex');
}