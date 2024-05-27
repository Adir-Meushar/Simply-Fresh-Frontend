import React, { useContext, useState } from "react";
import ProductsManagement from "./tables/ProductManagement";
import UsersManagement from "./tables/UsersManagement";
import AdminData from "./tables/AdminData";
import './tables/table-styles/dashboard-tables.css'
import './tables/table-styles/dashboard-responsive.css'
import { GeneralContext } from "../../App";

function Dashboard() {
  const [display, setDisplay] = useState('prodcuts')
  const { isDarkMode, setSearch } = useContext(GeneralContext);

  return (
    <>
      <div className={`container-table ${isDarkMode ? 'dark' : ''}`}>
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="display">
            <button className="dashboard-btn slide" onClick={() => { setDisplay('users'); setSearch(''); }} > Users </button>
            <button className="dashboard-btn slide" onClick={() => setDisplay('prodcuts')}>Prodcuts </button>
            <button className="dashboard-btn slide" onClick={() => { setDisplay('admin-data'); setSearch(''); }} > Summery </button>
          </div>
        </div>

        {
          (() => {
            switch (display) {
              case 'users': return <UsersManagement />
              case 'prodcuts': return <ProductsManagement />
              case 'admin-data': return <AdminData />
            }
          })()
        }
      </div>
    </>
  )
}

export default Dashboard;
