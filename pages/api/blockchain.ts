import type { NextApiRequest, NextApiResponse } from 'next'
import {getRaw, get_db, get_edb} from '../../services/db';
import {hash, mine, getBlock, create_block} from "../../services/token";
type Data = {
  user:any
}

// TODO: Add Api Routes
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({  
    user: getRaw()
})
}
