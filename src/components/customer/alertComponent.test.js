import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import english from "../../assets/languages/english";
import AlertComponent from './alertComponent';

const mockStore = configureMockStore([thunk]);

describe('AlertComponent', () => {
    const store = mockStore({
        language: { languageFile: english }
    });
    const alert = {
        product_id: "1",
        user_id: "1",
    };
    const alert1 = {};
    const alert2 = {
        product_id: "",
        user_id: "1",
    };

    it('should render a alertcomponent', () => {
        render(<Provider store={store}><Router><AlertComponent alert={alert} /></Router></Provider>);
        const alertelement = screen.getByText(/Rs/i);
        expect(alertelement).toBeInTheDocument();
    })

    it('should not render a alertcomponent for empty alertprop', () => {
        const { container } = render(<Provider store={store}><Router><AlertComponent alert={alert1} /></Router></Provider>);
        const div = container.querySelector('div')
        expect(div).toBeEmptyDOMElement();
    })
    
    it('should not render a alertcomponent for alertprop without product_id OR user_id', () => {
        const { container } = render(<Provider store={store}><Router><AlertComponent alert={alert2} /></Router></Provider>);
        const div = container.querySelector('div')
        expect(div).toBeEmptyDOMElement();
    })
})