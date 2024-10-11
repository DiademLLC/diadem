import AdminSidenav from '../../components/admin/AdminSidenav';
import AddMenu from '../../components/admin/AddMenu';

function Menu() {

    return (
        <div className='flex justify-between'>
            <AdminSidenav />

            <div className='lg:ml-[25%] w-full max-w-[1440px] mx-auto'>
                <AddMenu />
            </div>
            
        </div>
    );
}

export default Menu