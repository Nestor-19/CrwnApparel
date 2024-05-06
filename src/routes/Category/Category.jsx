import './Category.styles.scss';
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/categoriesSelector';

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            {isLoading ?
                <Spinner />  
                :  
                 <>
                    <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
                    <div className='category-container'>
                        {products && products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div> 
                </>       
            }
        </Fragment>
    )
}

export default Category;