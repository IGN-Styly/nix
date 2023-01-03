import { createHash } from "crypto";
import { stringify } from "querystring";
import Big from 'big.js';
import { create_wallet, get_db, get_bal, get_edb } from "./db"
import { ethers } from "ethers";

function hash(input: string): string {
  const hash = createHash("sha256")
  const hex = hash.update(input).digest('hex')
  return hex
}

async function verify(message: string, signature: string, key: string):Promise<Boolean> {
  const signerAddr = await ethers.utils.verifyMessage(message, signature);
  if (await signerAddr == key) {
    return true
  }
  return false
}

function getBlock(): Object {
  return get_edb()
}


async function mine(prev_block: number, block: number, trx: string, signature: string): Promise<number> {
  var nonce = 0
  const uuid = trx.split("-")[0]
  
  // Checks if the user provided signature is valid
  if (await verify(trx, signature, uuid) == false) { throw "Invalid Signature" }
  while (true) {
    // Data object to maintain acurate hashing and easy time on the JSON DB
    var data = {
      "prev_block": prev_block,
      "block": block,
      "trx": trx,
      "signature": signature,
      "nonce": nonce
    }
    // if the object data when hashed has the first 4 digits 0 its considered mined and valid
    if (hash(stringify(data)).substring(0, 4) == "0000") {
      return nonce
    }
    nonce = nonce + 1

  }
}

function get_wallet_data(wallet: string): object {
  // uses the get_db() method to get data of a wallet like
  // bal and key
  var data = get_db(wallet)
  return data
}

async function create_block(trx: string, signature: string): Promise<Number> {
  // Creates a block and mines it after verifing its valitidy
  // then creates a transaction and with Big.js 
  // it peforms acurate math up to 18 digits.
  let blocks = get_edb()
  let block = Object.keys(blocks).length
  let prev_block = block - 1
  const val = trx.split("-")[2]
  const from = trx.split("-")[0]
  const to = trx.split("-")[1]

  const nonce = await mine(prev_block, block, trx, signature)
  if (nonce == 1) { return 1 }
  var data = {
    "prev_block": prev_block,
    "block": block,
    "trx": trx,
    "signature": signature,
    "nonce": nonce
  }
  if(send(from, to, val)==false){
    return 1
  }
  
  return 0
}

function send(from: string, to: string, val: string): Boolean {
  var x = new Big(val).toPrecision(18)
  var from_VAL = new Big(get_bal(from))
  var to_VAL = new Big(get_bal(to))
  var debug = from_VAL.gte(x)
  return from_VAL.gte(x)
}
export { hash, mine, get_wallet_data, getBlock, create_block }
