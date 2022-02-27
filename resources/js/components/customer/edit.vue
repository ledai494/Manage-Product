<template>
    <div>
        <div class="row">
            <router-link to="/customer" class="btn btn-primary">All customer</router-link>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4"> customer update </h1>
                                    </div>
                                    <form class="user" @submit.prevent="customerUpdate" enctype="multipart/form-data">
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
                                                    <input type="text" v-model="form.address" class="form-control"  placeholder="Enter Your Address">
                                                    <small class="text-danger" v-if="errors.address">{{errors.address[0]}}</small>
                                                </div>
                                                <div class="col-md-6">
                                                    <input v-model="form.phone" type="number" class="form-control"  aria-describedby="emailHelp"
                                                           placeholder="Enter Salary">
                                                    <small v-if="errors.phone" class="text-danger">{{errors.phone[0]}}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="file" @change="onFileSelected" class="custom-file-input" id="customFile"  >
                                                    <label for="customFile" class="custom-file-label" >Choose file</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <img :src="form.photo" style="height: 40px;width: 40px" alt="">
                                                </div>
                                            </div>
                                        </div>
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
                name:'',
                email:'',
                phone:'',
                address:'',
                photo:'',
                newphoto:'',
            },
            errors:{}
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        let id = this.$route.params.id
        axios.get('/api/customer/'+id)
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
        customerUpdate(){
            let id = this.$route.params.id
            axios.patch('/api/customer/'+id,this.form)
                .then(()=>{
                    this.$router.push({name:'customer'})
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
