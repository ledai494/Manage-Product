<template>
    <div>
        <div class="row">
            <router-link to="/expense" class="btn btn-primary">All expense</router-link>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4"> expense update </h1>
                                    </div>
                                    <form class="user" @submit.prevent="employeeUpdate" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <input type="text" v-model="form.amount" class="form-control"  placeholder="Enter Your Full Name">
                                                    <small class="text-danger" v-if="errors.amount">{{errors.amount[0]}}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <label for="exampleFormControlTextarea1">Example textarea</label>
                                                    <textarea class="form-control"  v-model="form.details" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                    <small class="text-danger" v-if="errors.details">{{errors.details[0]}}</small>
                                                </div>
                                            </div>
                                        </div>
<!--                                        <div class="form-group">-->
<!--                                            <div class="form-row">-->
<!--                                                <div class="col-md-12">-->
<!--                                                    <input type="date" v-model="form.expense_date" class="form-control"  placeholder="Enter Your Full Name">-->
<!--                                                    <small class="text-danger" v-if="errors.expense_date">{{errors.expense_date[0]}}</small>-->
<!--                                                </div>-->
<!--                                            </div>-->
<!--                                        </div>-->

                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Update</button>
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
                amount:'',
                details:'',
                expense_date:''
            },
            errors:{}
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        let id = this.$route.params.id
        axios.get('/api/expense/'+id)
            .then(({data})=>(this.form = data)

            )
            .catch((error)=>(console.log(error)))
        console.log(this.form)
    },
    methods:{
        onFileSelected(event){
            let file = event.target.files[0];
            if(file.size>1048770){
                Notification.image_validation()
            }else{
                let reader = new FileReader();
                reader.onload = event=>{
                    this.form.newphoto = event.target.result
                    console.log(event.target.result)
                }
                reader.readAsDataURL(file);

            }
        },
        employeeUpdate(){
            let id = this.$route.params.id
            axios.patch('/api/expense/'+id,this.form)
                .then(()=>{
                    this.$router.push({name:'expense'})
                    Notification.success()
                })
                .catch(error=>
                    this.errors=error.response.data.errors
                )
        }

    }

}
</script>

<style>
</style>
