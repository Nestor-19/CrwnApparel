import { useContext } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import './shop.styles.scss';
import { Fragment } from "react/cjs/react.production.min";

const Shop = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    console.log(categoriesMap);

    return (
        <div className="products-container">
            {
                Object.keys(categoriesMap).map((title) => (
                    <Fragment key={title}>
                        {categoriesMap[title].map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </Fragment>
                ))
            }
        </div>
    )
}

export default Shop;
