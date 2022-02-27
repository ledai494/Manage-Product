<template>
    <div>
        <div class="container-fluid" id="container-wrapper">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Pos</h1>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="./">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Pos</li>
                </ol>
            </div>

            <div class="row mb-3">
                <!-- Area Chart -->
                <div class="col-xl-8 col-lg-7">
                    <div class="card mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Monthly Recap Report</h6>
                            <a class="btn btn-sm btn-info" href=""><font color="#ffffff">add customer</font></a>
                        </div>
                        <div class="card-body">
                            <div class="chart-area">
                                <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Qty</th>
                                            <th>Unit</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="cart in carts" :key="cart.id" >
                                            <td>{{cart.pro_name}}</td>
                                            <td><input type="text" readonly="" :value="cart.pro_quantity" style="width:32px" >
                                            <button @click.prevent="increment(cart.id)" class="btn btn-sm btn-success">+</button>
                                            <button  @click.prevent="decrement(cart.id)" class="btn btn-sm btn-danger"  v-if="cart.pro_quantity >=2">-</button>
                                            <button  @click.prevent="decrement(cart.id)" class="btn btn-sm btn-danger"  v-else disabled="">-</button>

                                            </td>


                                            <td>{{cart.product_price}}</td>
                                            <td><span>{{cart.sub_total}}</span></td>
                                            <td><a @click="removeItem(cart.id)"  class="btn btn-sm btn-primary"><font style="color:#ffffff;">X</font></a></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div class="card-footer">
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    total quantity:
                                    <strong>{{ qty }}</strong>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    sub
                                    <strong>{{ subtotal }}</strong>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    vat
                                    <strong>{{ vats.vat }} %</strong>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    total:
                                    <strong>{{ subtotal*vats.vat/100 + subtotal}}$</strong>
                                </li>

                            </ul>
                            <br>
                            <form @submit.prevent="orderdone">
                                <label for="">customer name</label>
                                <select class="form-control" v-model="customer_id">
                                    <option :value="customer.id" v-for="customer in customers" :key="customer.id" >{{customer.name}}</option>

                                </select>
                                <label for="">Pay</label>
                                <input type="text" class="form-control" required="" v-model="pay">

                                <label for="">Due</label>
                                <input type="text" class="form-control" required="" v-model="due">

                                <label for="">Pay by</label>
                                <select class="form-control" v-model="payby">
                                    <option value="HandCash">Hand Cash</option>
                                    <option value="HandCash">Cheaque</option>
                                    <option value="HandCash">Gift Card</option>

                                </select>
                                <br>
                                <button type="submit" class="btn-success btn">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Pie Chart -->
                <div class="col-xl-4 col-lg-5">
                    <div class="card mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Products Sold</h6>
                        </div>

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All Product</a>
                            </li>
                            <li class="nav-item" v-for="category in categories" :key="category.id">
                                <a class="nav-link" id="profile-tab"  data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" @click="subProduct(category.id)">{{ category.category_name }}</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="card-body">
                                    <input type="text" v-model="searchTerm" class="form-control" style="width: 300px" placeholder="Search Here">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="product in filtersearch" :key="product.id">
                                            <button class="btn btm-sm" @click.prevent="AddToCart(product.id)">
                                                <div class="card" style="width:8.5rem;">
                                                    <img :src="product.image" id="em_photo"  alt="" class="card-img-top">
                                                    <div class="card-body" style="width:8.5rem;margin-bottom:5px">
                                                        <h6 class="card-title">{{product.product_name}}</h6>
                                                        <td v-if="product.product_quantity >=1">
                                                            <span class="badge badge-success">Availble</span>
                                                        </td>
                                                        <td v-else>
                                                            <span class="badge badge-danger">Stock out</span>
                                                        </td>
                                                    </div>
                                                </div>

                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <input type="text" v-model="getsearchTerm" class="form-control" style="width: 300px" placeholder="Search Here">
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="getproduct in getfiltersearch" :key="getproduct.id">
                                        <a href="#">
                                            <div class="card" style="width:8.5rem;">
                                                <img :src="getproduct.image"   alt="" class="card-img-top">
                                                <div class="card-body" style="width:8.5rem;margin-bottom:5px">
                                                    <h6 class="card-title">{{getproduct.product_name}}</h6>
                                                    <td v-if="getproduct.product_quantity >=1">
                                                        <span class="badge badge-success">Availble</span>
                                                    </td>
                                                    <td v-else>
                                                        <span class="badge badge-danger">Stock out</span>
                                                    </td>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- Invoice Example -->
                <div class="col-xl-8 col-lg-7 mb-4">
                    <div class="card">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Invoice</h6>
                            <a class="m-0 float-right btn btn-danger btn-sm" href="#">View More <i
                                class="fas fa-chevron-right"></i></a>
                        </div>
                        <div class="table-responsive">
                            <table class="table align-items-center table-flush">
                                <thead class="thead-light">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Item</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><a href="#">RA0449</a></td>
                                    <td>Udin Wayang</td>
                                    <td>Nasi Padang</td>
                                    <td><span class="badge badge-success">Delivered</span></td>
                                    <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                                </tr>
                                <tr>
                                    <td><a href="#">RA5324</a></td>
                                    <td>Jaenab Bajigur</td>
                                    <td>Gundam 90' Edition</td>
                                    <td><span class="badge badge-warning">Shipping</span></td>
                                    <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                                </tr>
                                <tr>
                                    <td><a href="#">RA8568</a></td>
                                    <td>Rivat Mahesa</td>
                                    <td>Oblong T-Shirt</td>
                                    <td><span class="badge badge-danger">Pending</span></td>
                                    <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                                </tr>
                                <tr>
                                    <td><a href="#">RA1453</a></td>
                                    <td>Indri Junanda</td>
                                    <td>Hat Rounded</td>
                                    <td><span class="badge badge-info">Processing</span></td>
                                    <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                                </tr>
                                <tr>
                                    <td><a href="#">RA1998</a></td>
                                    <td>Udin Cilok</td>
                                    <td>Baby Powder</td>
                                    <td><span class="badge badge-success">Delivered</span></td>
                                    <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer"></div>
                    </div>
                </div>
                <!-- Message From Customer-->
                <div class="col-xl-4 col-lg-5 ">
                    <div class="card">
                        <div class="card-header py-4 bg-primary d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-light">Message From Customer</h6>
                        </div>
                        <div>
                            <div class="customer-message align-items-center">
                                <a class="font-weight-bold" href="#">
                                    <div class="text-truncate message-title">Hi there! I am wondering if you can help me with a
                                        problem I've been having.</div>
                                    <div class="small text-gray-500 message-time font-weight-bold">Udin Cilok · 58m</div>
                                </a>
                            </div>
                            <div class="customer-message align-items-center">
                                <a href="#">
                                    <div class="text-truncate message-title">But I must explain to you how all this mistaken idea
                                    </div>
                                    <div class="small text-gray-500 message-time">Nana Haminah · 58m</div>
                                </a>
                            </div>
                            <div class="customer-message align-items-center">
                                <a class="font-weight-bold" href="#">
                                    <div class="text-truncate message-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    </div>
                                    <div class="small text-gray-500 message-time font-weight-bold">Jajang Cincau · 25m</div>
                                </a>
                            </div>
                            <div class="customer-message align-items-center">
                                <a class="font-weight-bold" href="#">
                                    <div class="text-truncate message-title">At vero eos et accusamus et iusto odio dignissimos
                                        ducimus qui blanditiis
                                    </div>
                                    <div class="small text-gray-500 message-time font-weight-bold">Udin Wayang · 54m</div>
                                </a>
                            </div>
                            <div class="card-footer text-center">
                                <a class="m-0 small text-primary card-link" href="#">View More <i
                                    class="fas fa-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Row-->

            <div class="row">
                <div class="col-lg-12 text-center">
                    <p>Do you like this template ? you can download from <a href="https://github.com/indrijunanda/RuangAdmin"
                                                                            class="btn btn-primary btn-sm" target="_blank"><i class="fab fa-fw fa-github"></i>&nbsp;GitHub</a></p>
                </div>
            </div>

            <!-- Modal Logout -->
<!--            <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelLogout"-->
<!--                 aria-hidden="true">-->
<!--                <div class="modal-dialog" role="document">-->
<!--                    <div class="modal-content">-->
<!--                        <div class="modal-header">-->
<!--                            <h5 class="modal-title" id="exampleModalLabelLogout">Ohh No!</h5>-->
<!--                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--                                <span aria-hidden="true">&times;</span>-->
<!--                            </button>-->
<!--                        </div>-->
<!--                        <div class="modal-body">-->
<!--                            <p>Are you sure you want to logout?</p>-->
<!--                        </div>-->
<!--                        <div class="modal-footer">-->
<!--                            <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>-->
<!--                            <a href="login.html" class="btn btn-primary">Logout</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

        </div>



    </div>
</template>
<script>
import Notification from "../../Helpers/Notification";

export default {

    data(){
        return{
            customer_id:'',
            pay:'',
            due:'',
            payby:'',

            products :[],
            categories:'',
            getproducts:[],
            errors:{},
            searchTerm:'',
            getsearchTerm:'',
            customers:'',
            carts:[],
            vats:''


        }
    },
    computed:{
        filtersearch(){
            return this.products.filter(product=>{
                return product.product_name.match(this.searchTerm)
            })
        },
        getfiltersearch(){
            return this.getproducts.filter(getproduct=>{
                return getproduct.product_name.match(this.getsearchTerm)
            })
        },
        qty(){
            let sum = 0;
            for(let i =0;i<this.carts.length;i++){
                sum +=(parseFloat(this.carts[i].pro_quantity))
            }
            return sum;
        },
        subtotal(){
            let sum = 0;
            for(let i =0;i<this.carts.length;i++){
                sum +=(parseFloat(this.carts[i].pro_quantity))*parseFloat(this.carts[i].product_price)
            }
            return sum;
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.allProduct();
        this.allCategory();
        this.allCustomer();
        this.cartProduct();
        Reload.$on('AfterAdd',()=>{
            this.cartProduct();
        })
        this.vat();
    },
    methods:{
        vat(){
          axios.get('/api/vats/')
            .then(({data})=>(this.vats=data))
        },
        removeItem(id){
            axios.get('/api/remove/cart/'+id)
                .then(()=>{
                    Reload.$emit('AfterAdd');
                    alert('remove')
                })
        },
        increment(id){
            console.log(id)
            axios.get('/api/increment/'+id)
          .then(()=>{
              Reload.$emit('AfterAdd');
              // Notification.success();
          })
        },
        decrement(id){
            console.log(id)
            axios.get('/api/decrement/'+id)
                .then(()=>{
                    Reload.$emit('AfterAdd');
                    // Notification.success();
                })

        },
        cartProduct(){
          axios.get('/api/cart/product')
            .then(({data})=>
                (this.carts=data )
            )
        },
        AddToCart(id){
            axios.get('/api/addToCart/'+id)
            .then(()=>{
                Reload.$emit('AfterAdd');
                alert('add')
            })
        },
        allProduct(){
            axios.get('/api/product/')
                .then(({data})=>(this.products=data))
                .catch((error)=>(this.errors=error.response.data.errors))
        },
        allCategory(){
            axios.get('/api/category/')
                .then(({data})=>(this.categories=data))
                .catch((error)=>(this.errors=error.response.data.errors))
        },
        allCustomer(){
            axios.get('/api/customer/')
                .then(({data})=>(this.customers=data))
                .catch((error)=>(this.errors=error.response.data.errors))
        },
        subProduct(id){
            axios.get('/api/getting/product/'+id)
                .then(({data})=>(this.getproducts=data))
                // .then(({data})=>(console.log(data)))

                .catch((error)=>(this.errors=error.response.data.errors))
        },
        subProduct1(test){
            console.log(test)
        },
        deleteProduct(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios.delete('/api/product/'+id)
                        .then(()=>{
                            this.products= this.products.filter(product=>{
                                return product.id !== id
                            })
                        })
                        .catch(()=>{
                            this.$router.push({name:'product'})
                        })
                    Swal.fire(
                        'Deleted!',
                        'Product has been deleted.',
                        'success'
                    )
                }
            })


        },
        orderdone(){
            let total = this.subtotal*this.vats.vat/100 + this.subtotal;
            var data = {qty:this.qty, subtotal:this.subtotal,customer_id:this.customer_id,payby:this.payby,pay:this.pay,vat:this.vats.vat,total:total,due:this.due}
            axios.post('/api/orderdone',data)
                .then(()=>{
                    alert('orderdone')
                    // this.$router.push({name:'home'})
                })
                .catch(error=>
                    this.errors=error.response.data.errors
                )
        }
    }

}
</script>

<style type="text/css" scoped>
#em_photo{
    width: 100px;
    height: 135px;
}
</style>
