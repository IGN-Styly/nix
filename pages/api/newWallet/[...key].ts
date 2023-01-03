import type { NextApiRequest, NextApiResponse } from 'next'
import {get_db, get_edb, create_wallet} from '../../../services/db';
import {hash, mine, getBlock, create_block} from "../../../services/token";
type Data = {
    wallet : String,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  res.status(200).json({  
    // @ts-ignore
   wallet : create_wallet(req.query["key"])
})
}
