<template>
    <div>
        <div class="row">
            <router-link to="/salary" class="btn btn-primary">update Salary </router-link>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4"> Go Back</h1>
                                    </div>
                                    <form class="user" @submit.prevent="SalaryUpdate" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.name" class="form-control"  placeholder="Enter Your Full Name">
                                                    <small class="text-danger" v-if="errors.name">{{errors.name[0]}}</small>
                                                </div>
                                                <div class="col-md-6">
                                                    <input v-model="form.email" type="email" class="form-control"  aria-describedby="emailHelp"
                                                           placeholder="Enter Your Email">
                                                    <small v-if="errors.email" class="text-danger">{{errors.email[0]}}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <label for="exampleFormControlSelect1">Months</label>
                                                    <select v-model="form.salary_month" class="form-control" id="exampleFormControlSelect1">
                                                        <option value="January">1</option>
                                                        <option value="February">2</option>
                                                        <option value="March">3</option>
                                                        <option value="April">4</option>
                                                        <option value="May">5</option>
                                                        <option value="June">6</option>
                                                        <option value="July">7</option>
                                                        <option value="August">8</option>
                                                        <option value="September">9</option>
                                                        <option value="October">10</option>
                                                        <option value="November">11</option>
                                                        <option value="December">12</option>
                                                    </select>
                                                </div>
                                                <input type="hidden" v-model="form.employee_id">
                                                <div class="col-md-6">
                                                    <input v-model="form.amount" type="number" class="form-control"  aria-describedby="emailHelp"
                                                           placeholder="Enter Salary">
                                                    <small v-if="errors.amount" class="text-danger">{{errors.amount[0]}}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">update</button>
                                        </div>

                                    </form>
                                    <hr>
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
            form :{
                name:'',
                email:'',
                salary_month:'',
                sallery:'',
                employee_id:''
            },
            errors:{}
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        let id = this.$route.params.id
        axios.get('/api/edit/salary/'+id)
            .then(({data})=>(this.form = data))
            .catch((error)=>(console.log(error)))
    },
    methods:{
        SalaryUpdate(){
            let id = this.$route.params.id
            axios.post('/api/salary/update/'+id,this.form)
                .then(()=>{
                    this.$router.push({name:'salary'})
                    Notification.success()
                })
                .catch(error=>this.errors=error.response.data.errors)
        }

    }

}
</script>

<style>
</style>
