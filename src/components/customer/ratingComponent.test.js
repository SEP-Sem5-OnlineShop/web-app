import { render, screen } from '@testing-library/react';
import RatingComponent from './ratingComponent';

describe('RatingComponent', () => {

    it('should render rating component with 5 stars and 0 filled', () => {
        render(<RatingComponent rating={0} size={20}/>);
        const ratingStar1 = screen.getByTestId('ratingstar-1');
        const ratingStar2 = screen.getByTestId('ratingstar-2');
        const ratingStar3 = screen.getByTestId('ratingstar-3');
        const ratingStar4 = screen.getByTestId('ratingstar-4');
        const ratingStar5 = screen.getByTestId('ratingstar-5');
        expect(ratingStar1).toHaveStyle(`color:rgb(228, 229, 233)`);
        expect(ratingStar2).toHaveStyle(`color:rgb(228, 229, 233)`);
        expect(ratingStar3).toHaveStyle(`color:rgb(228, 229, 233)`);
        expect(ratingStar4).toHaveStyle(`color:rgb(228, 229, 233)`);
        expect(ratingStar5).toHaveStyle(`color:rgb(228, 229, 233)`);
    })
    
    it('should render rating component with 5 stars 3 filled', () => {
        render(<RatingComponent rating={3} size={20}/>);
        const ratingStar1 = screen.getByTestId('ratingstar-1');
        const ratingStar2 = screen.getByTestId('ratingstar-2');
        const ratingStar3 = screen.getByTestId('ratingstar-3');
        const ratingStar4 = screen.getByTestId('ratingstar-4');
        const ratingStar5 = screen.getByTestId('ratingstar-5');
        expect(ratingStar1).toHaveStyle(`color:rgb(255, 193, 7)`);
        expect(ratingStar2).toHaveStyle(`color:rgb(255, 193, 7)`);
        expect(ratingStar3).toHaveStyle(`color:rgb(255, 193, 7)`);
        expect(ratingStar4).toHaveStyle(`color:rgb(228, 229, 233)`);
        expect(ratingStar5).toHaveStyle(`color:rgb(228, 229, 233)`);
    })
    
    it('should render rating component with 5 stars 5 filled', () => {
        render(<RatingComponent rating={5} size={20}/>);
        const ratingStar1 = screen.getByTestId('ratingstar-1');
        const ratingStar2 = screen.getByTestId('ratingstar-2');
        const ratingStar3 = screen.getByTestId('ratingstar-3');
        const ratingStar4 = screen.getByTestId('ratingstar-4');
        const ratingStar5 = screen.getByTestId('ratingstar-5');
        expect(ratingStar1).toHaveStyle(`color:rgb(255, 193, 7)`);
        expect(ratingStar2).toHaveStyle(`color:rgb(255, 193, 7)`);
        expect(ratingStar3).toHaveStyle(`color:rgb(255, 193, 7)`);
        expect(ratingStar4).toHaveStyle(`color:rgb(255, 193, 7)`);
        expect(ratingStar5).toHaveStyle(`color:rgb(255, 193, 7)`);
    })
})