// src/pages/api/[name].ts
import { Deta } from "deta";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";

const deta = Deta(env.DETA_PROJECT_KEY);

const photos = deta.Drive(env.DETA_DRIVE);

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  if (!name) {
    return;
  }
  const img = await photos.get(name as string);
  const buffer = await img?.arrayBuffer();
  console.log(img);
  if (!buffer) {
    res.status(404).json({ err: "Buffer not available" });
    return;
  }
  console.log("Sending image");
  res.send(Buffer.from(buffer));
};

export default examples;
