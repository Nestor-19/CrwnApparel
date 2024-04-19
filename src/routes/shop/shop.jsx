import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import './shop.styles.scss';

const Shop = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    console.log(categoriesMap);

    return (
        <div className='shop-container'>
            {Object.keys(categoriesMap).map((key) => {
                const products = categoriesMap[key];
                return <CategoryPreview key={key} title={key} products={products} />;
            })}
        </div>
    )
}

export default Shop;
