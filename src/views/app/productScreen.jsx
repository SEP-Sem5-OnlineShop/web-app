import { useParams } from "react-router-dom";

const ProductScreen = () => {
    const { id: vendor_id } = useParams();
    const { pid: product_id } = useParams();

    return (
        <div>
            Product Screen <br />
            Vendor:{vendor_id} Product:{product_id}
        </div>
    );
};
 
export default ProductScreen;