import AdminSidenav from '../../components/admin/AdminSidenav'

const AdminHome = () => {
  return (
    <div className='flex justify-between'>
        <AdminSidenav />
        <div className='lg:ml-[25%] w-full max-w-[1440px] mx-auto p-4 mt-3'>
            <h2 className='text-xl uppercase '>welcome back admin. use sidenav to navigate to pages</h2>
        </div>
    </div> 
  )
}

export default AdminHome