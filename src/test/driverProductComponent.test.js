import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import english from "../assets/languages/english"
import DriverProductComponent from '../components/customer/driverProductComponent';

const mockStore = configureMockStore([thunk]);

describe('DriverProductComponent', () => {
    const store = mockStore({
        language: { languageFile: english },
        user:{ useData: {

        }}
    });

    const product = {
        _id:'1',
        product_name:'product 1',
        imageUrl:'ada',
        stock:'123',
        price:'321'
    };
    const product1 = {};
    const product2 = {
        _id:'1',
        product_name:'',
        imageUrl:'ada',
        stock:'123',
        price:'321'
    };

    // it('should render a product component', () => {
    //     render(<Provider store={store}><Router><DriverProductComponent stockproduct={product} vendor_id={''} customer_id={''}/></Router></Provider>);
    //     const product_name = screen.getByText(/product 1/i);
    //     expect(product_name).toBeInTheDocument();
    // })

    // it('should not render a product component for empty productprop', () => {
    //     const { container } = render(<Provider store={store}><Router><DriverProductComponent product={product1} vendor_id={''} customer_id={''}/></Router></Provider>);
    //     const div = container.querySelector('div')
    //     expect(div).toBeEmptyDOMElement();
    // })
    
    // it('should not render a product component for uncomplete productprop', () => {
    //     const { container } = render(<Provider store={store}><Router><DriverProductComponent product={product2} vendor_id={''} customer_id={''}/></Router></Provider>);
    //     const div = container.querySelector('div')
    //     expect(div).toBeEmptyDOMElement();
    // })
})