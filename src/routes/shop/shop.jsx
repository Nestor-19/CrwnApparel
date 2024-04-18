import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import './shop.styles.scss';

const Shop = () => {
    const {products} = useContext(ProductContext);
    console.log(products);

    return (
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop;
