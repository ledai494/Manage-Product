<template>
    <div>
        <div class="row">
            <router-link to="/store-salary" class="btn btn-primary">Add salary</router-link>
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
                                <th>Month Name</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="salary in filtersearch" :key="salary.id">
                                <td>{{salary.salary_month}}</td>
                                <td>
                                    <router-link :to="{name:'view-salary', params:{id:salary.salary_month}}"  href="#" class="btn btn-sm btn-primary">View salary</router-link>
                                    <!--                                    <a @click="deleteSalary(salary.id)" href="#" class="btn btn-sm btn-danger">-->
                                    <!--                                        <font color="#ffffff">Delete</font>-->
                                    <!--                                    </a>-->
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
            salarys :[],
            errors:{},
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.salarys.filter(salary=>{
                return salary.salary_month.match(this.searchTerm)
            })
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.allSalary();
    },
    methods:{
        allSalary(){
            axios.get('/api/salary/')
                .then(({data})=>(this.salarys=data))
                .catch((error)=>(this.errors=error.response.data.errors))
        },
        deleteSalary(id){
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
                    axios.delete('/api/salary/'+id)
                        .then(()=>{
                            this.salarys= this.salarys.filter(salary=>{
                                return salary.id !== id
                            })
                        })
                        .catch(()=>{
                            this.$router.push({name:'salary'})
                        })
                    Swal.fire(
                        'Deleted!',
                        'salary has been deleted.',
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
