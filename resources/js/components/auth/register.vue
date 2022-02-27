<template>
<div>
    <div class="container-login">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Register</h1>
                                    </div>
                                    <form class="user" @submit.prevent="signup">
                                        <div class="form-group">
                                            <label>User Name</label>
                                            <input type="text" v-model="form.name" class="form-control" id="exampleInputFirstName" placeholder="Enter user name">
                                            <small class="text-danger" v-if="errors.name">{{errors.name[0]}}</small>
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                                                   placeholder="Enter Email Address">
                                            <small v-if="errors.email" class="text-danger">{{errors.email[0]}}</small>
                                        </div>
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword" placeholder="Password">
                                            <small class="text-danger" v-if="errors.password">{{errors.password[0]}}</small>
                                        </div>
                                        <div class="form-group">
                                            <label>Repeat Password</label>
                                            <input v-model="form.password_confirmation" type="password" class="form-control" id="exampleInputPasswordRepeat"
                                                   placeholder="Repeat Password">
                                            <small class="text-danger" v-if="errors.password_confirmation">{{errors.password_confirmation[0]}}</small>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                                        </div>
<!--                                        <hr>-->
<!--                                        <a href="index.html" class="btn btn-google btn-block">-->
<!--                                            <i class="fab fa-google fa-fw"></i> Register with Google-->
<!--                                        </a>-->
<!--                                        <a href="index.html" class="btn btn-facebook btn-block">-->
<!--                                            <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook-->
<!--                                        </a>-->
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <router-link class="font-weight-bold small" to="/login">Already have an account?</router-link>
                                    </div>
                                    <div class="text-center">
                                        <router-link class="font-weight-bold small" to="/forget">Forget password?</router-link>
                                    </div>
                                </div>
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
export default {

    data(){
        return{
            form :{
                name:null,
                email:null,
                password:null,
                password_confirmation:null
            },
            errors:{}
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
    },
    methods:{
        signup(){
            axios.post('/api/auth/signup',this.form)
            .then(res=> {
                    User.responseAfterLogin(res)
                    Toast.fire({
                        icon: 'success',
                        title: 'register successfully'
                    })
                    this.$router.push({name: 'home'})
                }
            )
            .catch(error=>this.errors=error.response.data.errors)
            .catch(
                Toast.fire({
                    icon:'warning',
                    title:'Invalid '
                })
            )
        }

    }

}
</script>

<style>
</style>
