<template>
    <div>
        <div class="row">
            <router-link to="/store-expense" class="btn btn-primary">Add expense</router-link>
        </div>
        <br>
        <input type="text" v-model="searchTerm" class="form-control" style="width: 300px" placeholder="Search Here">
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Simple Tables -->
                <div class="card">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">expense list</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th>Detail</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="expense in filtersearch" :key="expense.id">
                                <td><a href="#">{{expense.details}}</a></td>
                                <td>{{expense.amount}}</td>
                                <td>{{expense.expense_date}}</td>

                                <td>
                                    <router-link :to="{name:'edit-expense', params:{id:expense.id}}"   class="btn btn-sm btn-primary">Edit</router-link>
                                    <a @click="deleteExpense(expense.id)" href="#" class="btn btn-sm btn-danger">
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
            categories :[],
            errors:{},
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.categories.filter(expense=>{
                return expense.amount.match(this.searchTerm)
            })
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.allExpense();
    },
    methods:{

        allExpense(){
            axios.get('/api/expense')
                .then(({data})=>(this.categories=data))
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
