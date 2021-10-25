import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import english from "../../assets/languages/english";
import ReviewComponent from './reviewComponent';

const mockStore = configureMockStore([thunk]);

describe('ReviewComponent', () => {
    const store = mockStore({
        language: { languageFile: english },
        user:{ useData: {

        }}
    });
    const review = {
        _id: "1",
        customer: "1",
        rating: 3,
        review: "good product. 100% satisfied. fresh and tasty. can recommend this vendor. looking forward to buy more products.",
        createdAt: "2021-10-14T08:14:20.920Z",
        updatedAt: "2021-10-14T08:14:20.920Z"
    };
    const review1 = {};
    const review2 = {
        _id: "6167e6dc338f9b37c8c3f436",
        customer: "",
        rating: 3,
        review: "good product. 100% satisfied. fresh and tasty. can recommend this vendor. looking forward to buy more products.",
        createdAt: "2021-10-14T08:14:20.920Z",
        updatedAt: "2021-10-14T08:14:20.920Z"
    };

    it('should render a reviewcomponent', () => {
        render(<Provider store={store}><Router><ReviewComponent review={review} width={''} /></Router></Provider>);
        const reviewelement = screen.getByText(/good product. 100% satisfied./i);
        expect(reviewelement).toBeInTheDocument();
    })

    it('should not render a reviewcomponent for empty reviewprop', () => {
        const { container } = render(<Provider store={store}><Router><ReviewComponent review={review1} width={''} /></Router></Provider>);
        const div = container.querySelector('div')
        expect(div).toBeEmptyDOMElement();
    })
    
    it('should not render a reviewcomponent for reviewprop without customer OR rating OR review OR createdAt', () => {
        const { container } = render(<Provider store={store}><Router><ReviewComponent review={review2} width={''} /></Router></Provider>);
        const div = container.querySelector('div')
        expect(div).toBeEmptyDOMElement();
    })
})