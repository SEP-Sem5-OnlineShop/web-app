// import { useHistory } from 'react-router-dom';
import ProductComponent from '../../../components/customer/productComponent';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingComponent from '../../../components/ratingComponent';
import LoadingBox from '../../../components/LoadingBox';
import MessageBox from '../../../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../../actions/productActions';
import { detailsVendor } from '../../../actions/vendorActions';


const VendorScreen = () => {
    const { id: vendor_id } = useParams();

    const dispatch = useDispatch();
    const vendorDetails = useSelector(state => state.vendorDetails);
    const { loading, error, vendor } = vendorDetails;
    const productList = useSelector(state => state.productList);
    const { loading1, error1, products } = productList;
    useEffect(() => {
        if (vendor_id) {
            dispatch(detailsVendor(vendor_id));
        };
        if (loading & !error) {
            dispatch(listProducts(vendor_id));
        }
      }, [dispatch, vendor_id, loading, error]);

    return (
        <div>
        {(loading | loading1) ? (
            <LoadingBox></LoadingBox>
        ) : (error | error1) ? (
            <MessageBox variant="danger">{error}{error1}</MessageBox>
        ) : (
            <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                <div style={{ backgroundImage: `url("/img/vendor.jpg")` }} className="rounded-t-3xl lg:rounded-t-6xl opacity-100 w-full h-full absolute top-0 left-0 z-0"/>
                <Link to={`/app/vendor_${vendor_id}`}>
                <div className="h-52 w-full flex px-10 items-end relative z-10">
                    <span className="ml-8 my-6 text-3xl sm:text-5xl text-black font-semibold absolute">{vendor.vendor_name}</span>
                    <span className="ml-7 my-6 text-3xl sm:text-5xl text-white font-semibold relative z-10">{vendor.vendor_name}</span>
                </div>
                </Link>

                <div className="w-full bg-white relative z-10" style={{minHeight: 'calc(100vh - 11rem)'}}>
                    <div className="pl-4 pr-4 pt-2 sm:pl-20 sm:pt-6">
                        <RatingComponent rating={vendor.rating} />
                        {vendor.rating} ({vendor.ratingCount}+)
                        <p className="mt-2">{vendor.vendor_description}</p>
                    </div>

                    <div className="px-2 py-4 sm:px-12 sm:py-8">
                        <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10">
                            {products && <>
                                {products.map((product) => (
                                    <ProductComponent product={product} vendor_id={vendor_id} key={product._id} />
                                ))}
                            </>}
                        </div>
                    </div>

                </div>
            </div>
        )}
        </div>
    );
}
 
export default VendorScreen;