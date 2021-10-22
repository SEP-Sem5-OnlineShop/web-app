import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import english from "../../assets/languages/english";
import DriverProductComponent from './driverProductComponent';

const mockStore = configureMockStore([thunk]);

describe('DriverProductComponent', () => {
    const store = mockStore({
        language: { languageFile: english },
        user:{ useData: {

        }}
    });

    const stockproduct = {
        _id:'1',
        productId: '61667166add8a03478529e91',
        stock: 50,
        price: 987456321,
        discount: 10,
    };
    const stockproduct1 = {};
    const stockproduct2 = {
        _id:'1',
        productId: '',
        stock: 50,
        price: '',
        discount: 10,
    };

    it('should render a driverproductcomponent', () => {
        render(<Provider store={store}><Router><DriverProductComponent stockproduct={stockproduct} vendor_id={''} customer_id={''}/></Router></Provider>);
        const productprice = screen.getByText(/987456321/i);
        expect(productprice).toBeInTheDocument();
    })

    it('should not render a driverproductcomponent for empty stockproductprop', () => {
        const { container } = render(<Provider store={store}><Router><DriverProductComponent stockproduct={stockproduct1} vendor_id={''} customer_id={''}/></Router></Provider>);
        const div = container.querySelector('div')
        expect(div).toBeEmptyDOMElement();
    })
    
    it('should not render a driverproductcomponent for stockproductprop without productId OR stock OR price', () => {
        const { container } = render(<Provider store={store}><Router><DriverProductComponent stockproduct={stockproduct2} vendor_id={''} customer_id={''}/></Router></Provider>);
        const div = container.querySelector('div')
        expect(div).toBeEmptyDOMElement();
    })
})