import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categoriesPreview/categoriesPreview';
import Category from '../category/category';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories, setIsLoading } from '../../store/categories/categoriesSlice';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
          dispatch(setIsLoading(true));
          const categoriesArray = await getCategoriesAndDocuments('categories');
          dispatch(setCategories(categoriesArray));
          dispatch(setIsLoading(false));
        };
    
        getCategoriesMap();
      }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=':category' element={<Category />}/>
        </Routes>
    )
}

export default Shop;
