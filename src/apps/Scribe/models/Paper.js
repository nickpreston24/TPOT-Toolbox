import { observable } from 'mobx';
import moment from 'moment';
// import { cleanFunctionProps } from '../../../shared/utilities/debug'
export class Paper {
    constructor(props) {
        Object.assign(this, { ...props });
        /*
        * Custom fields initialization *Optional*
        * NOTE: Can be made @computed
        */
        this.status = this.status || 'in-progress';
        this.slug = (this.slug || this.title)
            .replace(/\s/g, '-') //Spaces first,
            .replace(/[,?*#!:;_]/g, '-') // then specials
            .replace('.docx', '')
            .trim();
    }
}

/* Includes humanized dates */
export class PaperDetails extends Paper {
    constructor(props) {
        super(props)        
        this.date_modified = this.humanize(this.date_modified)
        this.date_uploaded = this.humanize(this.date_uploaded)
    }

    humanize = (dateTime) => moment.duration(moment(dateTime.toDate()).diff(moment())).humanize(true);
    @observable status = 'in-progress';
}

