import { NextApiRequest, NextApiResponse } from "next";
import { create } from 'ipfs-http-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

    try {
        if (req.method === 'POST') {
            const hash = req.body;
            const stream = ipfs.cat(hash);
            let fileData = '';
            
            for await (const chunk of stream) {
                fileData += chunk.toString();
            }

            fileData && fileData !== null && res.status(200).json({ data: fileData });
        } else {
            console.log("Method not allowed from retreiveFromIPFS");
            res.status(405).end();
        }
    } catch (error) {
        console.log("error from retreiveFromIPFS:", error);
        res.status(405).end();
    }
}