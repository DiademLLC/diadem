import AdminSidenav from '../../components/admin/AdminSidenav';
import GetOrders from '../../components/admin/Orders';

function Orders() {

    return (
        <div className='flex justify-between'>
            <AdminSidenav />

            <div className='lg:ml-[25%] w-full max-w-[1440px] mx-auto'>
                <GetOrders />
            </div>
            
        </div>
    );
}

export default Orders