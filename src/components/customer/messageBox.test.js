import { render } from '@testing-library/react';
import MessageBox from './messageBox';

test('should render LoadingBox', () => {
    const { container } = render(<MessageBox/>);
    const div = container.querySelector('div')
    expect(div).toHaveClass('bg-white text-danger');
});