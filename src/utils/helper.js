import moment from 'moment'

export const formateDate = (data, options) => {
    const { formate = 'MMM DD YYYY', isStamp = false } = options || {}
    if (isStamp) {
        const date = moment.unix(data)
        return date.format(formate)
    } else {
        return moment(data).format(formate)
    }
}