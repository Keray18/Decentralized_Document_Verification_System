import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../utils/contract';
import { generateHash } from '../../utils/hash';

export async function POST(req) {
    try {
        const body = await req.json();
        const { fileContent } = body;

        if (!fileContent) {
            return NextResponse.json({ message: 'File content is missing.' }, { status: 400 });
        }

        const fileBuffer = Buffer.from(fileContent, 'base64');
        const hash = await generateHash(fileBuffer);

        const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL || 'http://localhost:8545');
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '0x0', provider);
        const contract = new ethers.Contract(CONTRACT_ADDRESS || '0x0', CONTRACT_ABI, wallet);

        const tx = await contract.storeDocument(hash);
        await tx.wait();

        return NextResponse.json({ message: 'Document uploaded and hashed successfully.', Hash: hash }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Internal server error.', Error: err.message }, { status: 500 });
    }
}