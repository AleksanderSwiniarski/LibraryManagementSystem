import useFetch from "./useFetch";

const useBookFetch = () => {
    
    let isPending = true;
    let {data, isPending:initialPending, error} = useFetch('http://localhost:5000/books');
    
    let listGotUpdated = false;
    const currentDate = new Date();
    const currentDay = currentDate.getUTCDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getUTCFullYear();
    const user = '';
    const reserved = '';
    const patch = { user, reserved };

    data.forEach((book) => {
        if(book.reserved !== ''){
            const dateYear = parseInt(book.reserved.substring(0,4));            
            const dateMonth = parseInt(book.reserved.substring(5,7));
            const dateDay = parseInt(book.reserved.substring(8,10));
            if((currentDay > dateDay && currentMonth === dateMonth) || (currentMonth > dateMonth && currentYear === dateYear) || currentYear > dateYear) {
                console.log("Detected");
                listGotUpdated = true;
                fetch('http://localhost:5000/books/' + book.id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patch)
            })
            }
        }            
    })

    if(listGotUpdated){
        window.location.reload(false);
    } else {
        isPending = false;
    }

    return { data, isPending, error }
}
 
export default useBookFetch;