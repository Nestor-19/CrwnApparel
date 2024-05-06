import { Fragment } from "react";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectIsLoading } from "../../store/categories/categoriesSelector";
import Spinner from "../../components/Spinner/Spinner";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);

    return (
        <Fragment>
            {isLoading ?
                <Spinner />
                :
                <>
                    {Object.keys(categoriesMap).map((key) => {
                        const products = categoriesMap[key];
                        return <CategoryPreview key={key} title={key} products={products} />;
                    })}
                </>
            }
        </Fragment>
    )
}

export default CategoriesPreview;
