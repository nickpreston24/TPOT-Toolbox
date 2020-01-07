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
        this.slug = this.slug || this.title
            .replace(/\s/g, '-') //Spaces first,
            .replace(/[,?*#!:;_]/g, '-') // then specials
            .replace('.docx', '')
            .trim();

        // FIXME: These dates are being implicitly converted from DateTime to string, which is bad practice because it may throw a TypeError
        this.date_modified = this.date_modified;
        this.date_uploaded = this.date_uploaded;
    }

    @observable status = 'in-progress';

    // humanize = (dateTime) => moment.duration(moment(dateTime.toDate()).diff(moment())).humanize(true);

    // toString = () => `{this.status} {this.slug}`
}

