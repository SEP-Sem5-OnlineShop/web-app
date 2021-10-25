import { render, screen } from '@testing-library/react';
import LoadingBox from './loadingBox';

test('should render LoadingBox', () => {
    render(<LoadingBox/>);
    const loading = screen.getByText(/Loading/i);
    expect(loading).toBeInTheDocument();
});