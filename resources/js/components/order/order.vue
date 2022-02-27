<template>
    <div>

        <br>
        <input type="text" v-model="searchTerm" class="form-control" style="width: 300px" placeholder="Search Here">
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Simple Tables -->
                <div class="card">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Today Order</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Total Amount</th>
                                <th>Pay</th>
                                <th>Due</th>
                                <th>Pay by</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="order in filtersearch" :key="order.id">
                                <td>{{order.name}}</td>
                                <td>{{order.total}} $</td>
                                <td>{{order.pay}} $</td>
                                <td>{{order.due}} $</td>
                                <td>{{order.payby}}</td>

                                <td>
                                    <router-link :to="{name:'view-order', params:{id:order.id}}"   class="btn btn-sm btn-primary">View Detail</router-link>
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
            orders :[],
            errors:{},
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.orders.filter(order=>{
                return order.name.match(this.searchTerm)
            })
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.allOrder();
    },
    methods:{

        allOrder(){
            axios.get('/api/orders')
                .then(({data})=>(this.orders=data))
                .catch((error)=>(this.errors=error.response.data.errors))
        },
        deleteExpense(id){
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
                    axios.delete('/api/expense/'+id)
                        .then(()=>{
                            this.categories= this.categories.filter(expense=>{
                                return expense.id !== id
                            })
                        })
                        .catch(()=>{
                            this.$router.push({name:'expense'})
                        })
                    Swal.fire(
                        'Deleted!',
                        'Expense has been deleted.',
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
