import React from "react";
import prisma from "../../lib/db";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ulyc from "../public/img/ulyc.jpeg";

async function getBoat() {
  "use server";
  const boats = await prisma.boat.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      description: false,
      imageUrl: true,
      ownerId: true,
      owner: true,
    },
  });

  return boats;
}

export default async function Home() {
  const boats = await getBoat();
  console.log(boats);

  return (
    <div>
      <div className="flex justify-center gap-5">
        {boats.map((boat) => (
          <Card className="w-64" key={boat.id}>
            <CardHeader>
              <CardTitle>{boat.name}</CardTitle>
              <CardDescription>{boat.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={ulyc}
                alt={boat.name}
                width={300}
                height={200}
              />
            </CardContent>
            <CardFooter>
                <CardDescription>{boat.owner.username}</CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}