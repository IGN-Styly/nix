const fs = require("fs")
var data = JSON.parse(fs.readFileSync("db.json", "utf-8"))
import { v4 as uuidv4 } from 'uuid'

// gets Database data of a specific wallet
function get_db(uuid: string):Object {
  return data["users"][uuid]
};


function getRaw(){
  return data
}

// Gets data of the Database of the blockchain
function get_edb(): Object {
  return data["blockchain"]
};

// Creates a wallet, requires a key
// in key meaning a public key using the eth standard
function create_wallet(key: string): boolean {
  fs.writeFile("db.json", JSON.stringify(data["users"][String(key)]={bal:0}), (err: any) => {
    if (err) throw err;
  });
  return true
}
// @ts-ignore
function get_bal(uuid: string): number {
  return data["users"][uuid]["bal"];
}
export { create_wallet, get_db, get_bal, get_edb, getRaw}
