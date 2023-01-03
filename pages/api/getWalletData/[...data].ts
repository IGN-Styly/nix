import type { NextApiRequest, NextApiResponse } from 'next'
import {get_db, get_edb} from '../../../services/db';
import {hash, mine, getBlock, create_block} from "../../../services/token";
type Data = {
    wallet : Object,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  res.status(200).json({  
    // @ts-ignore
   wallet : await get_db(req.query['data'])
})
}
