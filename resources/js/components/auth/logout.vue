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
                                            <h1 class="h4 text-gray-900 mb-4">Forget Password</h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                                                       placeholder="Enter Email Address">
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small" style="line-height: 1.5rem;">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck">
                                                    <label class="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <a href="index.html" class="btn btn-primary btn-block">Forget Password</a>
                                            </div>

                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            <router-link class="font-weight-bold small" to="/register">Forget Password</router-link>
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
import AppStorage from "../../Helpers/AppStorage";

export default {
    created() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        Toast.fire({
            icon:'success',
            title:'logout in successfully'
        })
        this.$router.push({
            name: 'login'
        });
    },
    methods:{

    }
}

</script>
<style>

</style>
