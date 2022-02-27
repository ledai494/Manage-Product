<template>
    <div>
        <div class="row">
            <router-link to="/store-employee" class="btn btn-primary">Add Employee</router-link>
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
                                <th>Phone</th>
                                <th>Sallery</th>
                                <th>Joining Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="employee in filtersearch" :key="employee.id">
                                <td><a href="#">{{employee.name}}</a></td>
                                <td><img :src="employee.photo" alt="" id="em_photo"></td>
                                <td>{{employee.phone}}</td>
                                <td>{{employee.sallery}}</td>
                                <td>{{employee.joining_date}}</td>
                                <td>
                                    <router-link :to="{name:'pay-salary', params:{id:employee.id}}"  href="#" class="btn btn-sm btn-primary">Pay salary</router-link>
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
export default {

    data(){
        return{
            employees :[],
            errors:{},
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.employees.filter(employee=>{
                return employee.name.match(this.searchTerm)
            })
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.allEmployee();
    },
    methods:{
        allEmployee(){
            axios.get('/api/employee/')
                .then(({data})=>(this.employees=data))
                .catch((error)=>(this.errors=error.response.data.errors))
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
