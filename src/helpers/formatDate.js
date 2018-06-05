export const formatDate=date=> {
    if(date===undefined) return
    const f=new Date(date   *1000)
    var dd = f.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = f.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = f.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}