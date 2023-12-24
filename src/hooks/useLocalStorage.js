const useLocalStorage = (key)=> {
    const setItem = (value)=>{
        localStorage.setItem(key, value)
    }

    const getItem = ()=>{
        localStorage.getItem(key)
    }

    const deleteItem = ()=>{
        localStorage.deleteItem(key)
    }
    return{setItem, getItem, deleteItem}
}

export default useLocalStorage