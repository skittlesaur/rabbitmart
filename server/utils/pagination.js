const Pagination = (page, JSON) => {
    try {
        var array = [];
        for(var i in JSON){
            array.push(JSON[i]);
        }

        const arraySize = array.length;
        const itemsPerPage = 2;
        var desiredPage=0;
        if(page & page != 0){
            desiredPage = parseInt(page) - 1;}

        const firstElement = (desiredPage * itemsPerPage);
        const lastElement = desiredPage * itemsPerPage + itemsPerPage;
        if(desiredPage === 0 || firstElement >= arraySize){

            if(arraySize <= itemsPerPage)
                return(array);
            
            else
                return(array.slice(0, itemsPerPage));
        }
        
        return((array.slice(firstElement,lastElement)));
    } catch (error) {
        throw error;
    }
}

export default Pagination;