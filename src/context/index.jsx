import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState('')
    const [loading, setLoading] = useState(false)
    const [recipeList, setRecipeList] = useState([])
    const [recipeDetailData, setRecipeDetailData] = useState(null)
    const [favoritesList, setFavoritesList] = useState([])
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await response.json();
            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes)
                setSearchParam('')
                setLoading(false)
                navigate('/')
            }
            console.log(data)
        } catch (e) {
            console.log(e)
            setLoading(false)
            setSearchParam('')
        }
    }
    console.log(loading, recipeList)

    function handleAddToFavorite(getCurrentItem){
        console.log(getCurrentItem);
        let cpyFavoritesList = [...favoritesList];
        const index = cpyFavoritesList.findIndex(item=> item.id === getCurrentItem.id)
    
        if(index === -1) {
          cpyFavoritesList.push(getCurrentItem)
        } else {
          cpyFavoritesList.splice(index, 1)
        }
    
        setFavoritesList(cpyFavoritesList)
      }
      

    return <GlobalContext.Provider
        value={{
            searchParam,
            setSearchParam,
            loading,
            recipeList,
            recipeDetailData,
            setRecipeDetailData,
            favoritesList,
            setFavoritesList,
            handleSubmit,
            handleAddToFavorite
        }}>
        {children}
    </GlobalContext.Provider>
}