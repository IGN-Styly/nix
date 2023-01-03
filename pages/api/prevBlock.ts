import type { NextApiRequest, NextApiResponse } from 'next'
import {get_db, get_edb} from '../../services/db';
import {hash, mine, getBlock, create_block} from "../../services/token";
type Data = {
  prevBlock: number,
}
const blocks = get_edb()
const block = Object.keys(blocks).length -1

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({  
    prevBlock: block
})
}
