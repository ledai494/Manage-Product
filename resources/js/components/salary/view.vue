<template>
    <div>
        <div class="row">
            <router-link to="/pay-salary" class="btn btn-primary">go back</router-link>
        </div>
        <br>
        <input type="text" v-model="searchTerm" class="form-control" style="width: 300px" placeholder="Search Here">
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Simple Tables -->
                <div class="card">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Employee Salary Details</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Month</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="salary in filtersearch" :key="salary.id">
                                <td><a href="#">{{salary.name}}</a></td>
                                <td>{{salary.salary_month}}</td>
                                <td>{{salary.amount}}</td>
                                <td>{{salary.salary_date}}</td>
                                <td>
                                    <router-link :to="{name:'edit-salary', params:{id:salary.id}}"  href="#" class="btn btn-sm btn-primary">Pay salary</router-link>
                                    <!--                                    <a @click="deleteEmployee(employee.id)" href="#" class="btn btn-sm btn-danger">-->
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
import Notification from "../../Helpers/Notification";

export default {

    data(){
        return{
            salaries :[],
            errors:{},
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.salaries.filter(salary=>{
                return salary.name.match(this.searchTerm)
            })
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.viewSalary();
    },
    methods:{
        viewSalary(){
            let id = this.$route.params.id
            axios.get('/api/salary/view/'+id)
                .then(({data})=>(this.salaries=data))
                .catch(error=>this.errors=error.response.data.errors)
        },
        deleteEmployee(id){
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
                    axios.delete('/api/employee/'+id)
                        .then(()=>{
                            this.employees= this.employees.filter(employee=>{
                                return employee.id !== id
                            })
                        })
                        .catch(()=>{
                            this.$router.push({name:'employee'})
                        })
                    Swal.fire(
                        'Deleted!',
                        'Employee has been deleted.',
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
