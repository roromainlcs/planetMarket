import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PlanetType } from "@/components/Planet/planetComponent";

type ResponseData = {
  message: string;
};

export default async function sellPlanet(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method == "POST") {
    console.log(req.body);
    prisma.nft.create({
      data: {
        NFTokenID: req.body.NFTokenID,
        offerID: req.body.offerID,
        URI: req.body.URI,
        Owner: req.body.Owner,
        Name: req.body.Name,
        discovery_date: req.body.discovery_date,
        right_ascension: req.body.right_ascension,
        declination: req.body.declination,
        price: req.body.price,
      },
    }).then(() => {
      res.status(200).json({ message: "success" });
    }).catch((error) => {
      console.log("error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
  } else {
    //bloquer les autres méthodes
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
