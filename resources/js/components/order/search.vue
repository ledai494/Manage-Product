<template>
    <div>
        <div class="row">
            <router-link to="/category" class="btn btn-primary">All Category</router-link>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Add Category</h1>
                                    </div>
                                    <form class="user" @submit.prevent="searchDate" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <label ><b>search by date</b></label>
                                                    <input type="date" class="form-control" required="" v-model="date" placeholder="01/01/2021">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Submit</button>
                                        </div>

                                    </form>
                                    <hr>

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 mb-4">
                                <!-- Simple Tables -->
                                <div class="card">
                                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">Simple Tables</h6>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table align-items-center table-flush">
                                            <thead class="thead-light">
                                            <tr>
                                                <th>Product Name</th>
                                                <th>qty</th>
                                                <th>subtotal</th>
                                                <th>vat</th>
                                                <th>total</th>
                                                <th>pay</th>
                                                <th>due</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="order in orders">
                                                <td>{{ order.name}}</td>
                                                <td>{{ order.qty }}</td>
                                                <td>{{ order.sub_total}}</td>
                                                <td>{{ order.vat }}</td>
                                                <td>{{ order.total }}</td>
                                                <td>{{ order.pay }}</td>
                                                <td>{{ order.due }}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="card-footer"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Notification from "../../Helpers/Notification";

export default {

    data(){
        return{
            date:'',
            errors:{},
            orders:''
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
    },
    methods:{

        searchDate(){
            var data={date:this.date }
            axios.post('/api/search/order/',data)
                .then(({data})=>(this.orders=data))
                .catch((error)=>
                        console.log(error)
                    // (this.errors=error.response.data.errors)
                )
        }

    }

}
</script>

<style>
</style>
