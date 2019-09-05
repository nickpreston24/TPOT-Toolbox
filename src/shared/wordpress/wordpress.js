import WPAPI from 'wpapi'
import { wordpressConfig } from '../keys'

export const wp = new WPAPI({
    endpoint: wordpressConfig.default.endpoint,
},(error)=> {
//    console.log('Bad!:', error)
});