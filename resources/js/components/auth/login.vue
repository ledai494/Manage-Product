<template>
    <div>
        <div class="container-login">
            <div class="row justify-content-center">
                <div class="col-xl-6 col-lg-12 col-md-9">
                    <div class="card shadow-sm my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="login-form">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Login</h1>
                                        </div>
                                        <form @submit.prevent="login" class="user">
                                            <div class="form-group">
                                                <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                                                       placeholder="Enter Email Address">
                                                <small class="text-danger" v-if="errors.email">{{errors.email[0]}}</small>
                                            </div>
                                            <div class="form-group">
                                                <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword" placeholder="Password">
                                                <small class="text-danger" v-if="errors.password">{{errors.password[0]}}</small>
                                            </div>
<!--                                            <div class="form-group">-->
<!--                                                <div class="custom-control custom-checkbox small" style="line-height: 1.5rem;">-->
<!--                                                    <input type="checkbox" class="custom-control-input" id="customCheck">-->
<!--                                                    <label class="custom-control-label" for="customCheck">Remember-->
<!--                                                        Me</label>-->
<!--                                                </div>-->
<!--                                            </div>-->
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-primary btn-block">Login</button>
                                            </div>
<!--                                            <hr>-->
<!--                                            <a href="index.html" class="btn btn-google btn-block">-->
<!--                                                <i class="fab fa-google fa-fw"></i> Login with Google-->
<!--                                            </a>-->
<!--                                            <a href="index.html" class="btn btn-facebook btn-block">-->
<!--                                                <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook-->
<!--                                            </a>-->
                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            <router-link class="font-weight-bold small" to="/register">Create an Account!</router-link>
<!--                                            <a class="font-weight-bold small" href="register.html">Create an Account!</a>-->
                                        </div>
                                        <div class="text-center">
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
    created(){
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
    },
    data(){
        return{
            form:{
                email:null,
                password:null,
            },
            errors: {}
        }
    },
    methods:{
        login(){
            // alert('test')
            //axios tra ve 1 promise mà 1 promise thì nhận vào 2 tham số callback là resolve và reject.nếu resolve đc gọi thì sao nếu reject được gọi thì sao
            axios.post('/api/auth/login',this.form)
            .then(res=>{
                User.responseAfterLogin(res)
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
                this.$router.push({name:'home'})

            })
            .catch(error=>this.errors=error.response.data.errors)
            .catch(
                Toast.fire({
                    icon:'warning',
                    title:'Invalid Email or password'
                })
            )
            // axios.post('/api/auth/login',this.form)
            //     .then(function res(){
            //         return console.log(res.data)
            //     })
            //     .catch(error=>console.log(error.response.data))
        }
    }
}
</script>
<!--<style>-->

<!--</style>-->
