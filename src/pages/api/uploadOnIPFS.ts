import { NextApiRequest, NextApiResponse } from "next";
import { create } from 'ipfs-http-client';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

    try {
        if (req.method === 'POST') {
            const file = req.body;
            const response = await ipfs.add(file);
            response && response !== null && res.status(200).json({ hash: response.cid, size: response.size });
        } else {
            console.log("Method not allowed from uploadOnIPFS");
            res.status(405).end();
        }
    } catch (error) {
        console.log("error from uploadOnIPFS:", error);
        res.status(405).end();
    }
}