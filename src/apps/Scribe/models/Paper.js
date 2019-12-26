import { observable } from 'mobx';
import moment from 'moment';
export class Paper {
    constructor(props) {
        Object.assign(this, { ...props });
        /*
        * Custom fields initialization *Optional*
        * NOTE: Can be made @computed
        */
        this.status = this.status || 'in-progress';
        this.slug = this.slug || this.title.replace('[\s?@^!#*]', '-').trim();
        // FIXME: These dates are being implicitly converted from DateTime to string, which is bad practice because it may throw a TypeError
        this.date_modified = this.humanize(this.date_modified);
        this.date_uploaded = this.humanize(this.date_uploaded);
    }
    @observable
    status = 'in-progress';
    humanize = (dateTime) => moment.duration(moment(dateTime.toDate()).diff(moment())).humanize(true);
}
