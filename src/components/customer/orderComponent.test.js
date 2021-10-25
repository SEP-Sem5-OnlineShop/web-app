import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import english from "../../assets/languages/english";
import OrderComponent from './orderComponent';

const mockStore = configureMockStore([thunk]);

describe('OrderComponent', () => {
    const store = mockStore({
        language: { languageFile: english },
        user:{ useData: {

        }}
    });
    const order = {
        _id: "6167a9b1197dbe1e944b6272",
        customer_id: "613eba8b94acbe3710fed690",
        vendor_id: "613eb365af0d5b2c142fa326",
        totalItems: 1,
        totalCost: 123987,
        products: [{
            _id: "6167a9b1197dbe1e944b6273",
            product_id: "61667166add8a03478529e91",
            items: 1,
            price: 123987,
        }],
        createdAt: "2021-10-14T03:53:21.811Z",
    };
    const order1 = {};
    const order2 = {
        _id: "6167a9b1197dbe1e944b6272",
        customer_id: "613eba8b94acbe3710fed690",
        vendor_id: "",
        totalItems: 1,
        totalCost: 123987,
        products: [{
            _id: "6167a9b1197dbe1e944b6273",
            product_id: "61667166add8a03478529e91",
            items: 1,
            price: 123987,
        }],
        createdAt: "2021-10-14T03:53:21.811Z",
    };

    it('should render a ordercomponent', () => {
        render(<Provider store={store}><Router><OrderComponent order={order} /></Router></Provider>);
        const reviewelement = screen.getByText(/Thu, 14 Oct 2021 03:53:21/i);
        expect(reviewelement).toBeInTheDocument();
    })

    it('should not render a ordercomponent for empty orderprop', () => {
        const { container } = render(<Provider store={store}><Router><OrderComponent order={order1} /></Router></Provider>);
        const div = container.querySelector('div')
        expect(div).toBeEmptyDOMElement();
    })
    
    it('should not render a ordercomponent for orderprop without vendor_id OR totalItems OR totalCost OR createdAt OR products', () => {
        const { container } = render(<Provider store={store}><Router><OrderComponent order={order2} /></Router></Provider>);
        const div = container.querySelector('div')
        expect(div).toBeEmptyDOMElement();
    })
})