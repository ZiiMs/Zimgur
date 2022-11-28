// src/pages/api/[name].ts
import { Deta } from "deta";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const deta = Deta(env.DETA_PROJECT_KEY);

  const photos = deta.Drive(env.DETA_DRIVE);
  const { name } = req.query;
  if (!name) {
    console.log("No Name!", name);
    res.status(404);

    return;
  }
  const img = await photos.get(name as string);
  if (!img) {
    console.warn("No Image!", img, name);
    res.status(404);
    return;
  }
  const buffer = await img.arrayBuffer();
  if (!buffer) {
    res.status(404).json({ err: "Buffer not available" });
    console.error("Buffer error", buffer);
    return;
  }
  console.log("Sending image");
  res.send(Buffer.from(buffer));
};

export default examples;

export const config = {
  api: {
    responseLimit: false,
  },
};
