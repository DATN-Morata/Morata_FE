import { Steps } from 'antd';
import { OrderStatus } from '~/types/enum';
import { renderSteps } from '../../_helper';

const StepsOrder = ({ orderStatus }: { orderStatus: OrderStatus }) => {
    const { items, steps } = renderSteps({ currentStep: orderStatus });
    return (
        <Steps
            status={orderStatus === OrderStatus.canceled ? 'error' : 'finish'}
            className='my-10 capitalize'
            current={steps.indexOf(orderStatus)}
            items={items}
        />
    );
};

export default StepsOrder;
