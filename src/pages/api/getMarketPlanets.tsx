import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/../lib/prisma';
import { PlanetType } from '@/components/Planet/planetComponent';

type ResponseData = {
  message: string,
  marketPlanets: PlanetType[]
}

export default async function getMarketPlanets(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    try {
    const pulled = await prisma.nft.findMany();
    const marketPlanets: PlanetType[] = pulled.map((planet) => {
    return ({
        NFTokenID: planet.NFTokenID,
        URI: planet.URI,
        Owner: planet.Owner,
        Name: planet.Name,
        discovery_date: planet.discovery_date,
        createdAt: planet.createdAt.toString(),
        updatedAt: planet.updatedAt.toString(),
        right_ascension: planet.right_ascension,
        declination: planet.declination,
        price: planet.price
    });
    });
    //console.log(marketPlanets);
    res.status(200).json({ message: "success", marketPlanets: marketPlanets });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "Internal server error", marketPlanets: []});
  }
}