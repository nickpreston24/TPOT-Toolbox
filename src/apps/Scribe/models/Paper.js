import { observable } from 'mobx';
import moment from 'moment';

/* 
 * Goal: Use in databases, controllers, middleware, etc. 
   Prevents having to re-map all prop values over and over through each layer we touch
 */
export class Paper {
    constructor(props) {
        Object.assign(this, { ...props });        
        this.status = this.status || 'in-progress';
        this.slug = (this.slug || this.title)
            .replace(/\s/g, '-') //Spaces first,
            .replace(/[,?*#!:;_]/g, '-') // then specials
            .replace('.docx', '')
            .trim();
    }
}

/* 
    Goal: Use this in CheckoutPage or other views w/o having to re-map all prop values over and over
    Includes humanized dates 
*/
export class PaperDetails extends Paper {
    constructor(props) {
        super(props)        
        console.log('dt:', this.date_modified);

        //My Attempt:
        // this.date_modified = this.humanize(this.date_modified)
        // this.date_uploaded = this.humanize(this.date_uploaded)

        //Original:
        // this.date_modified = this.date_modified.toDate()
        // this.date_modified = moment.duration(moment(this.date_modified).diff(moment())).humanize(true)
        // this.date_uploaded = this.date_uploaded.toDate()
        // this.date_uploaded = moment.duration(moment(this.date_uploaded).diff(moment())).humanize(true)
    }

    //My Attempt:
    // humanize = (dateTime) => moment.duration(moment(dateTime.toDate()).diff(moment())).humanize(true);
    // humanize = dateTime => {    
    //     return moment.duration(moment(dateTime.toDate().diff(moment())).humanize(true);
    // };

    @observable status = 'in-progress';
}

