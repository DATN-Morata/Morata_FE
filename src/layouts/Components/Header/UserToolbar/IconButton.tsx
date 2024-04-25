import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

interface IIconButtonProps {
    icon: 'HeartOutlined' | 'ShoppingCartOutlined' | 'UserOutlined';
    name: string;
    subName: string;
}

const iconMap = {
    HeartOutlined: HeartOutlined,
    ShoppingCartOutlined: ShoppingCartOutlined,
    UserOutlined: UserOutlined,
};

const IconButton: React.FC<IIconButtonProps> = ({ icon, name, subName }) => {
    const Comp = iconMap[icon];
    const isShoppingCartOutlined = icon === 'ShoppingCartOutlined';
    const containerClass = isShoppingCartOutlined
        ? 'justify-between gap-2 lg:flex'
        : 'hidden justify-between gap-2 lg:flex';
    const hiddenShoppingCartOutlined = isShoppingCartOutlined ? 'hidden lg:block' : '';
    return (
        <div className={containerClass}>
            <Comp style={{ color: '#ffffff', fontSize: '40px' }} />
                <div className={hiddenShoppingCartOutlined}>
                    <span className='block font-medium capitalize text-gray-400'>{subName}</span>
                    <span className='block capitalize text-white'>{name}</span>
                </div>
        </div>
    );
};

export default IconButton;
