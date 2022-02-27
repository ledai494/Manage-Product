<template>
    <div>
        <div class="row">
            <router-link to="/store-supplier" class="btn btn-primary">Add supplier</router-link>
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
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Photo</th>
                                <th>Shop name</th>
                                <th>Action </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="supplier in filterSearch" :key="supplier.id">
                                <td><a href="#">{{supplier.name}}</a></td>
                                <td>{{supplier.email}}</td>
                                <td>{{supplier.phone}}</td>
                                <td>{{supplier.address}}</td>
                                <td><img :src="supplier.photo" alt="" id="em_photo"></td>
                                <td>{{supplier.shopname}}</td>
                                <td>
                                    <router-link :to="{name:'edit-supplier', params:{id:supplier.id}}"  href="#" class="btn btn-sm btn-primary">Edit</router-link>
                                    <a @click="deleteSupplier(supplier.id)" href="#" class="btn btn-sm btn-danger">
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
            suppliers :[],
            errors:{},
            searchTerm:''
        }
    },
    computed:{
        filterSearch(){
            return this.suppliers.filter(supplier=>{
                return supplier.name.match(this.searchTerm)
            })
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.allSupplier();
    },
    methods:{

        allSupplier(){
            axios.get('/api/supplier')
            .then(({data})=>(this.suppliers=data))
            .catch((error)=>(this.errors=error.response.data.errors))
        },
        deleteSupplier(id){
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
                    axios.delete('/api/supplier/'+id)
                        .then(()=>{
                            this.suppliers= this.suppliers.filter(supplier=>{
                                return supplier.id !== id
                            })
                        })
                        .catch(()=>{
                            this.$router.push({name:'supplier'})
                        })
                    Swal.fire(
                        'Deleted!',
                        'supplier has been deleted.',
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
