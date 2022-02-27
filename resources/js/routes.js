// let login =require('./components/auth/login.vue').default;
// let register =require('./components/auth/register.vue').default;
// console.log(register)
import login from './components/auth/login'
import register from './components/auth/register'
import forget from './components/auth/forget'
import logout from './components/auth/logout'
// end authencation
import home from './components/Home'
import storeemployee from './components/employee/create'
import employee from './components/employee/index'
import editemployee from './components/employee/edit'
// end of employee
import storesupplier from './components/supplier/create'
import supplier from './components/supplier/index'
import editsupplier from './components/supplier/edit'
// end of supplier
import category from './components/category/index'
import storecategory from './components/category/create'
import editcategory from './components/category/edit'
// end of category
import product from './components/product/index'
import storeproduct from './components/product/create'
import editproduct from './components/product/edit'
// end of product
import expense from './components/expense/index.vue'
import storeexpense from './components/expense/create'
import editexpense from './components/expense/edit'
// end of expense
import salary from './components/salary/all_employee'
import paysalary from './components/salary/create'
import allsalary from './components/salary/index'
import viewsalary from './components/salary/view'
import editsalary from './components/salary/edit'
// end of salary
import stock from './components/product/stock'
import editstock from './components/product/edit-stock'
// end of stock
import storecustomer from './components/customer/create'
import customer from './components/customer/index'
import editcustomer from './components/customer/edit'
//end of customer
import pos from './components/pos/pointosale'
// end of pos
import order from './components/order/order.vue'
import vieworder from './components/order/vieworder'
import search from './components/order/search'

export const routes=[
    {path:'/register',component:register,name:'register'},
    {path:'/login',component:login,name:'login'},
    {path:'/forget',component:forget,name:'forget'},
    {path: '/logout',component:logout,name:'logout'},
    {path:'/home',component:home,name:'home'},

    {path:'/store-employee',name:'store-employee',component: storeemployee,},
    {path:'/employee',name:'employee',component: employee,},
    {path:'/edit-employee/:id',name:'edit-employee',component: editemployee},

    {name:'edit-supplier',component:editsupplier,path: '/edit-supplier/:id'},
    {name:'supplier',component: supplier,path: '/supplier'},
    {name:'store-supplier',component: storesupplier,path: '/store-supplier'},

    {name:'category',component: category,path: '/category'},
    {name:'store-category',component:storecategory,path:'/store-category'},
    {name:'edit-category',component: editcategory,path:'/edit-category/:id'},

    {path:'/product',component: product,name:'product'},
    {path:'/store-product',component: storeproduct,name:'store-product'},
    {path:'/edit-product/:id',component: editproduct,name:'edit-product'},

    {path:'/expense',name:'expense',component:expense},
    {path:'/store-expense',name:'store-expense',component: storeexpense},
    {path:'/edit-expense/:id',name:'edit-expense',component: editexpense},

    {path:'/given-salary',name:'salary',component: salary},
    {path:'/pay-salary/:id',name:'pay-salary',component: paysalary},
    {path:'/pay-salary',name:'all-salary',component:allsalary},
    {path:'/view-salary/:id',component:viewsalary,name:'view-salary'},
    {path:'/edit-salary/:id',component:editsalary,name:'edit-salary'},

    {path:'/stock',name:'stock',component: stock},
    {path:'/edit-stock/:id',component:editstock,name:'edit-stock'},

    {path:'/store-customer',name:'store-customer',component: storecustomer,},
    {path:'/customer',name:'customer',component: customer,},
    {path:'/edit-customer/:id',name:'edit-customer',component: editcustomer},

    {path:'/pos',name:'pos',component: pos,},
    {path:'/order',name:'order',component:order},
    {path:'/order/:id',name:'view-order',component:vieworder},
    {path:'/search-order',name:'search-order',component:search}

]
