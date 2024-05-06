import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoriesRequest } from '../../store/categories/categoriesAction';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesRequest());
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=':category' element={<Category />}/>
        </Routes>
    )
}

export default Shop;
