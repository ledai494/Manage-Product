<template>
    <div>
        <div class="row">
            <router-link to="/store-category" class="btn btn-primary">Add category</router-link>
        </div>
        <br>
        <input type="text" v-model="searchTerm" class="form-control" style="width: 300px" placeholder="Search Here">
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Simple Tables -->
                <div class="card">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Category list</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="category in filtersearch" :key="category.id">
                                <td><a href="#">{{category.category_name}}</a></td>
                                <td>
                                    <router-link :to="{name:'edit-category', params:{id:category.id}}"   class="btn btn-sm btn-primary">Edit</router-link>
                                    <a @click="deleteCategory(category.id)" href="#" class="btn btn-sm btn-danger">
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
            return this.categories.filter(category=>{
                return category.category_name.match(this.searchTerm)
            })
        }
    },
    created() {
        if (!User.loggedIn()){
            this.$router.push({name:'login'})
        }
        this.allCategory();
    },
    methods:{

        allCategory(){
            axios.get('/api/category')
                .then(({data})=>(this.categories=data))
                .catch((error)=>(this.errors=error.response.data.errors))
        },
        deleteCategory(id){
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
                    axios.delete('/api/category/'+id)
                        .then(()=>{
                            this.categories= this.categories.filter(category=>{
                                return category.id !== id
                            })
                        })
                        .catch(()=>{
                            this.$router.push({name:'category'})
                        })
                    Swal.fire(
                        'Deleted!',
                        'category has been deleted.',
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
