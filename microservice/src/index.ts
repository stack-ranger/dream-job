// use dotfile of parent directory
import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

// console.log(process.env.DATABASE_URL)