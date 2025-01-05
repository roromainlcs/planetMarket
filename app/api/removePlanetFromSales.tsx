import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PlanetType } from "@/components/Planet/planetComponent";

type ResponseData = {
  message: string;
};

export default async function removePlanetFromSales(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  //console.log(prisma.nft.findUnique({where:{NFTokenID: req.body.NFTokenID}}));
  if (req.method == "POST") {
    if (!req.body.NFTokenID) {
      res.status(500).json({ message: "error, no nft token ID given" });
      return;
    } else if (await prisma.nft.findUnique({where:{NFTokenID: req.body.NFTokenID}}) === null) {
      res.status(201).json({ message: `no such nft: ${req.body.NFTokenID}` });
      return;
    }
    prisma.nft.delete({
      where: {
        NFTokenID: req.body.NFTokenID,
      },
    }).then(() => {
      res.status(200).json({ message: "success" });
    }).catch((error) => {
      console.log("error:", error);
      res.status(500).json({ message: "couldn't remove nft from market, it might just not exist on market" });
    });
  } else {
    //bloquer les autres méthodes
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
