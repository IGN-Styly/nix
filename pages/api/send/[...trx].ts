import type { NextApiRequest, NextApiResponse } from 'next'
import {get_db, get_edb} from '../../../services/db';
import {hash, mine, getBlock, create_block} from "../../../services/token";
type Data = {
  op: any,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  res.status(200).json({  
    // @ts-ignore
   op : await create_block(req.query['trx'][0],req.query['trx'][1])
})
}
