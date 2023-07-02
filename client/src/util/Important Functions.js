function convertDate(dateString){
    const d = new Date(dateString);     
    const date = (d.toLocaleString("en-IN"))
    return date;
}

module.exports = {convertDate}