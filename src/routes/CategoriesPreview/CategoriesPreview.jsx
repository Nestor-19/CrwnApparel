import { Fragment } from "react";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categoriesSelector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    console.log(categoriesMap);

    return (
        <Fragment>
            {Object.keys(categoriesMap).map((key) => {
                const products = categoriesMap[key];
                return <CategoryPreview key={key} title={key} products={products} />;
            })}
        </Fragment>
    )
}

export default CategoriesPreview;
