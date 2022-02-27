<template>
    <div>
        <div class="row">
            <router-link to="/store-customer" class="btn btn-primary">Add customer</router-link>
        </div>
        <br>
        <input type="text" v-model="searchTerm" class="form-control" style="width: 300px" placeholder="Search Here">
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Simple Tables -->
                <div class="card">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Supplier list</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Photo</th>
                                <th>email</th>
                                <th>phone</th>
                                <th>address</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="customer in filtersearch" :key="customer.id">
                                <td><a href="#">{{customer.name}}</a></td>
                                <td><img :src="customer.photo" alt="" id="em_photo"></td>
                                <td>{{customer.email}}</td>
                                <td>{{customer.phone}}</td>
                                <td>{{customer.address}}</td>
                                <td>
                                    <router-link :to="{name:'edit-customer', params:{id:customer.id}}"  href="#" class="btn btn-sm btn-primary">Edit</router-link>
                                    <a @click="deletecustomer(customer.id)" href="#" class="btn btn-sm btn-danger">
                                        <font color="#ffffff">Delete</font>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer"></div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
export default {

    data(){
        return{
            customers :[],
            errors:{},
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.customers.filter(customer=>{
                return customer.name.match(this.searchTerm)
            })
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.allcustomer();
    },
    methods:{
        allcustomer(){
            axios.get('/api/customer/')
                .then(({data})=>(this.customers=data))
                .catch((error)=>(this.errors=error.response.data.errors))
        },
        deletecustomer(id){
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
                    axios.delete('/api/customer/'+id)
                        .then(()=>{
                            this.customers= this.customers.filter(customer=>{
                                return customer.id !== id
                            })
                        })
                        .catch(()=>{
                            this.$router.push({name:'customer'})
                        })
                    Swal.fire(
                        'Deleted!',
                        'customer has been deleted.',
                        'success'
                    )
                }
            })


        }
    }

}
</script>

<style>
#em_photo{
    width: 40px;
    height: 40px;
}
</style>
