import { NextApiRequest, NextApiResponse } from "next";
import { CID, create } from 'ipfs-http-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

    try {
        if (req.method === 'POST') {
            const hash = req.body;
            console.log("hash form req.body:", hash['/']);
            const cid = CID.parse(hash);
            const response = await ipfs.pin.add(cid);
            response && response !== null && res.status(200).json({ pinned: true });
        } else {
            console.log("Method not allowed from pinOnIPFS");
            res.status(405).end();
        }
    } catch (error) {
        console.log("error from pinOnIPFS:", error);
        res.status(405).end();
    }
}